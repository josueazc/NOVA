import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui';
import * as community from '@/services/community';
import { MOCK_BOTS_POSTS } from './mockData';

const isMock = (id) => String(id).startsWith('mock_') || String(id).includes('_mock');

// Hook contenedor de todo el estado y acciones de la red social.
export const useComunidad = (user) => {
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState([]);
  const [saved, setSaved] = useState([]);
  const [reactions, setReactions] = useState({});
  const [trending, setTrending] = useState([]);

  const loadPosts = useCallback(async () => {
    try {
      const dbPosts = await community.fetchPosts();
      const all = [...MOCK_BOTS_POSTS, ...dbPosts].sort((a, b) => b.createdAt - a.createdAt);
      setPosts(all);
      setError(null);
      community.fetchTrending(all).then(setTrending);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      setError('No se pudieron cargar las publicaciones.');
      setPosts([...MOCK_BOTS_POSTS]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRelations = useCallback(async () => {
    if (!user?.id) return;
    try {
      const rel = await community.fetchUserRelations(user.id);
      setFollowing(rel.following);
      setSaved(rel.saved);
      setReactions(rel.reactions);
    } catch (err) {
      console.warn('No se pudieron cargar relaciones:', err.message);
    }
  }, [user?.id]);

  useEffect(() => {
    loadPosts();
    loadRelations();
  }, [loadPosts, loadRelations]);

  const requireUser = () => {
    if (!user?.id) {
      toast.error('Debes iniciar sesión para hacer esto.');
      return false;
    }
    return true;
  };

  // ---------------- Acciones ----------------

  const publish = async ({ text, media, topic }) => {
    if (!requireUser()) return false;
    try {
      const result = await community.createPost({ userId: user.id, text, media, topic });
      if (result.warned) {
        toast.info('Tu publicación fue marcada para revisión por moderación.');
      } else {
        toast.success('Publicación creada.');
      }
      await loadPosts();
      return true;
    } catch (err) {
      if (err.code === 'MODERATION_BLOCKED') {
        toast.error(`Publicación bloqueada por moderación: ${err.message}`);
      } else {
        toast.error(`Error al publicar: ${err.message}`);
      }
      return false;
    }
  };

  const react = async (postId, kind = 'like') => {
    if (!requireUser()) return;
    const current = reactions[postId] || null;
    const next = current === kind ? null : kind;

    // Optimista
    setReactions((prev) => ({ ...prev, [postId]: next }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        let { likes = 0, dislikes = 0 } = p;
        if (current === 'like') likes -= 1;
        if (current === 'dislike') dislikes -= 1;
        if (next === 'like') likes += 1;
        if (next === 'dislike') dislikes += 1;
        return { ...p, likes: Math.max(0, likes), dislikes: Math.max(0, dislikes) };
      })
    );

    if (isMock(postId)) return;
    try {
      await community.toggleReaction({ postId, userId: user.id, current, kind });
    } catch (err) {
      toast.error(`No se pudo guardar tu reacción: ${err.message}`);
      setReactions((prev) => ({ ...prev, [postId]: current }));
    }
  };

  const repost = async (postId) => {
    if (!requireUser()) return;
    const post = posts.find((p) => p.id === postId);
    const had = post?.repostedBy?.includes(user.id);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              reposts: Math.max(0, (p.reposts || 0) + (had ? -1 : 1)),
              repostedBy: had ? (p.repostedBy || []).filter((id) => id !== user.id) : [...(p.repostedBy || []), user.id],
            }
          : p
      )
    );
    if (isMock(postId)) return;
    try {
      await community.toggleRepost({ postId, userId: user.id, reposted: had });
    } catch (err) {
      toast.error(`No se pudo republicar: ${err.message}`);
    }
  };

  const save = async (postId) => {
    if (!requireUser()) return;
    const had = saved.includes(postId);
    setSaved((prev) => (had ? prev.filter((id) => id !== postId) : [...prev, postId]));
    if (isMock(postId)) return;
    try {
      await community.toggleSave({ postId, userId: user.id, saved: had });
    } catch (err) {
      toast.error(`No se pudo guardar: ${err.message}`);
      setSaved((prev) => (had ? [...prev, postId] : prev.filter((id) => id !== postId)));
    }
  };

  const follow = async (targetId) => {
    if (!requireUser()) return;
    const had = following.includes(targetId);
    setFollowing((prev) => (had ? prev.filter((id) => id !== targetId) : [...prev, targetId]));
    if (isMock(targetId)) return;
    try {
      await community.toggleFollow({ targetId, userId: user.id, following: had });
    } catch (err) {
      toast.error(`No se pudo actualizar el seguimiento: ${err.message}`);
      setFollowing((prev) => (had ? [...prev, targetId] : prev.filter((id) => id !== targetId)));
    }
  };

  const removePost = async (postId) => {
    try {
      await community.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success('Publicación eliminada.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const report = async ({ postId, reason, details }) => {
    if (!requireUser()) return false;
    try {
      await community.reportContent({ reporterId: user.id, postId, reason, details });
      toast.success('Reporte enviado. Gracias por cuidar la comunidad.');
      return true;
    } catch (err) {
      const msg = err.message?.includes('duplicate') ? 'Ya reportaste esta publicación.' : err.message;
      toast.error(`No se pudo reportar: ${msg}`);
      return false;
    }
  };

  return {
    posts,
    setPosts,
    loading,
    error,
    following,
    saved,
    reactions,
    trending,
    loadPosts,
    publish,
    react,
    repost,
    save,
    follow,
    removePost,
    report,
  };
};

export default useComunidad;
