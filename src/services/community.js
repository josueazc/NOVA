// ============================================================================
// Servicio de comunidad — única puerta de acceso a Supabase para la red social.
// Los contadores (likes/reposts/comments/followers) los mantienen triggers en
// el servidor: aquí NUNCA se escriben contadores directamente.
// ============================================================================
import { supabase } from '@/lib/supabaseClient';
import { extractHashtags, sanitizeText, validateImageFile } from '@/utils/text';
import { moderateContent } from '@/services/ai';

const ensureClient = () => {
  if (!supabase) throw new Error('La base de datos no está configurada (.env).');
};

const mapPost = (p) => ({
  id: p.id,
  text: p.text,
  topic: p.topic || null,
  hashtags: p.hashtags || [],
  authorId: p.author_id,
  authorName: p.profiles?.full_name || 'Usuario',
  party: p.profiles?.party,
  isPolitician: p.profiles?.is_politician,
  isVerified: p.profiles?.is_verified,
  trustScore: p.profiles?.trust_score,
  cargo: p.profiles?.cargo,
  badges: p.profiles?.badges || [],
  avatarUrl: p.profiles?.avatar_url,
  followersCount: p.profiles?.followers_count || 0,
  followingCount: p.profiles?.following_count || 0,
  isBot: p.profiles?.is_bot || false,
  media: p.media,
  likes: p.likes || 0,
  dislikes: p.dislikes || 0,
  reposts: p.reposts || 0,
  commentCount: p.comment_count || 0,
  isHidden: p.is_hidden || false,
  moderationLabel: p.moderation_label || null,
  createdAt: new Date(p.created_at),
});

const PROFILE_COLS =
  'full_name, party, is_politician, cargo, badges, avatar_url, followers_count, following_count, is_bot, is_verified, trust_score';

// ---------------------------------------------------------------------------
// Lectura
// ---------------------------------------------------------------------------
export async function fetchPosts({ limit = 100 } = {}) {
  ensureClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, profiles:author_id(${PROFILE_COLS})`)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []).map(mapPost);
}

export async function fetchUserRelations(userId) {
  ensureClient();
  const [followRes, savedRes, reactRes] = await Promise.all([
    supabase.from('followers').select('following_id').eq('follower_id', userId),
    supabase.from('saved_posts').select('post_id').eq('user_id', userId),
    supabase.from('post_reactions').select('post_id, reaction_type').eq('user_id', userId),
  ]);
  return {
    following: (followRes.data || []).map((f) => f.following_id),
    saved: (savedRes.data || []).map((s) => s.post_id),
    reactions: Object.fromEntries((reactRes.data || []).map((r) => [r.post_id, r.reaction_type])),
  };
}

export async function fetchComments(postId) {
  ensureClient();
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles:author_id(full_name, party, is_verified)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map((c) => ({
    id: c.id,
    text: c.text,
    authorId: c.author_id,
    authorName: c.profiles?.full_name || 'Usuario',
    party: c.profiles?.party,
    isVerified: c.profiles?.is_verified,
    createdAt: new Date(c.created_at),
  }));
}

/** Trending: RPC del servidor; si falla, se calcula sobre los posts en memoria. */
export async function fetchTrending(postsFallback = []) {
  try {
    ensureClient();
    const { data, error } = await supabase.rpc('trending_hashtags', { p_limit: 8 });
    if (error) throw error;
    if (data?.length) return data.map((d) => ({ tag: d.tag, uses: Number(d.uses) }));
  } catch {
    // fallback silencioso
  }
  const counts = {};
  postsFallback.forEach((p) =>
    (p.hashtags?.length ? p.hashtags : extractHashtags(p.text)).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    })
  );
  return Object.entries(counts)
    .map(([tag, uses]) => ({ tag, uses }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, 8);
}

// ---------------------------------------------------------------------------
// Escritura
// ---------------------------------------------------------------------------
export async function createPost({ userId, text, media = null, topic = null }) {
  ensureClient();
  const clean = sanitizeText(text, 2000);
  if (!clean) throw new Error('La publicación está vacía.');

  // Moderación IA previa a publicar (fail-open si no hay API key)
  const verdict = await moderateContent(clean);
  if (!verdict.allowed && verdict.severity >= 0.7) {
    const err = new Error(verdict.reason || 'El contenido infringe las normas de la comunidad.');
    err.code = 'MODERATION_BLOCKED';
    err.labels = verdict.labels;
    throw err;
  }

  const { error } = await supabase.from('posts').insert({
    author_id: userId,
    text: clean,
    media,
    topic,
    hashtags: extractHashtags(clean),
    moderation_label: verdict.labels?.[0] || null,
  });
  if (error) throw error;
  return { warned: !verdict.allowed, labels: verdict.labels };
}

export async function addComment({ postId, userId, text }) {
  ensureClient();
  const clean = sanitizeText(text, 1000);
  if (!clean) throw new Error('El comentario está vacío.');
  const { error } = await supabase.from('comments').insert({ post_id: postId, author_id: userId, text: clean });
  if (error) throw error;
}

/** Reacción like/dislike por usuario (tabla post_reactions; triggers actualizan contadores). */
export async function toggleReaction({ postId, userId, current, kind = 'like' }) {
  ensureClient();
  if (current === kind) {
    const { error } = await supabase.from('post_reactions').delete().match({ post_id: postId, user_id: userId });
    if (error) throw error;
    return null;
  }
  const { error } = await supabase
    .from('post_reactions')
    .upsert({ post_id: postId, user_id: userId, reaction_type: kind }, { onConflict: 'post_id,user_id' });
  if (error) throw error;
  return kind;
}

export async function toggleRepost({ postId, userId, reposted }) {
  ensureClient();
  if (reposted) {
    const { error } = await supabase.from('post_reposts').delete().match({ post_id: postId, user_id: userId });
    if (error) throw error;
    return false;
  }
  const { error } = await supabase.from('post_reposts').insert({ post_id: postId, user_id: userId });
  if (error) throw error;
  return true;
}

export async function toggleSave({ postId, userId, saved }) {
  ensureClient();
  if (saved) {
    const { error } = await supabase.from('saved_posts').delete().match({ post_id: postId, user_id: userId });
    if (error) throw error;
    return false;
  }
  const { error } = await supabase.from('saved_posts').insert({ post_id: postId, user_id: userId });
  if (error) throw error;
  return true;
}

export async function toggleFollow({ targetId, userId, following }) {
  ensureClient();
  if (following) {
    const { error } = await supabase
      .from('followers')
      .delete()
      .match({ follower_id: userId, following_id: targetId });
    if (error) throw error;
    return false;
  }
  const { error } = await supabase.from('followers').insert({ follower_id: userId, following_id: targetId });
  if (error) throw error;
  return true;
}

export async function deletePost(postId) {
  ensureClient();
  const { data, error } = await supabase.rpc('delete_post', { p_post_id: postId });
  if (error) throw error;
  if (data === false) throw new Error('No tienes permiso para eliminar esta publicación.');
}

export async function deleteComment(commentId) {
  ensureClient();
  const { data, error } = await supabase.rpc('delete_comment', { p_comment_id: commentId });
  if (error) throw error;
  if (data === false) throw new Error('No tienes permiso para eliminar este comentario.');
}

export async function uploadMedia({ userId, file }) {
  ensureClient();
  const check = validateImageFile(file);
  if (!check.ok) throw new Error(check.error);

  const ext = file.name.split('.').pop();
  const path = `posts/${userId}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('comunidad_media').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('comunidad_media').getPublicUrl(path);
  return data.publicUrl;
}

export async function updateProfile({ userId, fields }) {
  ensureClient();
  const { error: authError } = await supabase.auth.updateUser({ data: fields });
  if (authError) throw authError;

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fields.full_name,
      province: fields.province,
      dni: fields.dni,
      bio: fields.bio,
      party: fields.party,
      cargo: fields.cargo,
      cargo_info: fields.cargo_info,
    })
    .eq('id', userId);
  if (error) throw error;
}

export async function reportContent({ reporterId, postId = null, commentId = null, reason, details = '' }) {
  ensureClient();
  const { error } = await supabase.from('reports').insert({
    reporter_id: reporterId,
    post_id: postId,
    comment_id: commentId,
    reason,
    details: sanitizeText(details, 500),
  });
  if (error) throw error;
}
