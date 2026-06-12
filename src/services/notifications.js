// Servicio de notificaciones — las genera el servidor (triggers en
// comments/likes/follows); aquí solo se leen y marcan.
import { supabase } from '@/lib/supabaseClient';

const ensureClient = () => {
  if (!supabase) throw new Error('La base de datos no está configurada.');
};

export async function fetchNotifications(userId, { limit = 50 } = {}) {
  ensureClient();
  const { data, error } = await supabase
    .from('notifications')
    .select('*, actor:actor_id(full_name, is_politician, is_verified)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []).map((n) => ({
    id: n.id,
    kind: n.kind,
    read: n.read,
    postId: n.post_id,
    actorName: n.actor?.full_name || 'Alguien',
    actorVerified: n.actor?.is_verified,
    payload: n.payload || {},
    createdAt: new Date(n.created_at),
  }));
}

export async function unreadCount(userId) {
  ensureClient();
  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false);
  if (error) throw error;
  return count || 0;
}

export async function markRead(notificationId) {
  ensureClient();
  const { error } = await supabase.from('notifications').update({ read: true }).eq('id', notificationId);
  if (error) throw error;
}

export async function markAllRead(userId) {
  ensureClient();
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);
  if (error) throw error;
}
