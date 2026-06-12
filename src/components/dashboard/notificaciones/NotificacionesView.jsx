import React, { useCallback, useEffect, useState } from 'react';
import {
  Bell, BellOff, MessageSquare, Heart, UserPlus, Repeat, AtSign,
  Megaphone, ShieldCheck, CheckCheck, BadgeCheck,
} from 'lucide-react';
import { Badge, Button, Card, EmptyState, Skeleton, useToast } from '@/components/ui';
import { fetchNotifications, markAllRead, markRead } from '@/services/notifications';
import { timeAgo } from '@/utils/text';

const KIND_META = {
  comment: { icon: MessageSquare, tone: 'blue', text: 'comentó tu publicación' },
  like: { icon: Heart, tone: 'red', text: 'le gustó tu publicación' },
  follow: { icon: UserPlus, tone: 'green', text: 'comenzó a seguirte' },
  repost: { icon: Repeat, tone: 'green', text: 'republicó tu contenido' },
  mention: { icon: AtSign, tone: 'blue', text: 'te mencionó' },
  report_resolved: { icon: ShieldCheck, tone: 'yellow', text: 'tu reporte fue revisado' },
  announcement: { icon: Megaphone, tone: 'yellow', text: 'anuncio de la plataforma' },
};

const FILTERS = [
  ['all', 'Todas'],
  ['unread', 'No leídas'],
  ['comment', 'Comentarios'],
  ['like', 'Me gusta'],
  ['follow', 'Seguidores'],
];

const NotificacionesView = ({ user, onCountChange }) => {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    if (!user?.id) {
      setItems([]);
      return;
    }
    try {
      setItems(await fetchNotifications(user.id));
    } catch (err) {
      console.warn('Notificaciones:', err.message);
      setItems([]);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = (items || []).filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.kind === filter;
  });

  const unread = (items || []).filter((n) => !n.read).length;

  const handleMarkAll = async () => {
    try {
      await markAllRead(user.id);
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      onCountChange?.(0);
      toast.success('Todas las notificaciones marcadas como leídas.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleOpen = async (n) => {
    if (!n.read) {
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      onCountChange?.(Math.max(0, unread - 1));
      markRead(n.id).catch(() => {});
    }
    if (n.postId) window.location.hash = '#/comunidad';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <header className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-warn-soft text-warn flex items-center justify-center">
            <Bell size={18} />
          </span>
          <div>
            <h1 className="font-black tracking-tight text-3xl text-ink tracking-tight leading-none">Notificaciones</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mt-1">
              {unread > 0 ? `${unread} sin leer` : 'Al día'}
            </p>
          </div>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll}>
            <CheckCheck size={14} />
            Marcar todas
          </Button>
        )}
      </header>

      <div className="flex gap-1.5 flex-wrap mb-6">
        {FILTERS.map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all
              ${filter === value ? 'bg-ink text-canvas border-ink' : 'bg-surface text-muted border-line hover:text-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {items === null ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<BellOff size={22} />}
          title="Nada por aquí"
          description={
            filter === 'all'
              ? 'Cuando alguien interactúe con tu contenido, lo verás aquí.'
              : 'No hay notificaciones con este filtro.'
          }
        />
      ) : (
        <ul className="space-y-2">
          {visible.map((n, i) => {
            const meta = KIND_META[n.kind] || KIND_META.announcement;
            const Icon = meta.icon;
            return (
              <li key={n.id} className="stagger-item" style={{ '--index': Math.min(i, 8) }}>
                <button
                  onClick={() => handleOpen(n)}
                  className={`w-full flex items-center gap-3.5 border rounded-xl px-4 py-3.5 text-left transition-all
                    hover:shadow-lift ${n.read ? 'bg-surface border-line' : 'bg-accent-soft/30 border-accent/20'}`}
                >
                  <Badge tone={meta.tone} className="!p-2 !rounded-lg" icon={<Icon size={13} />} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm text-ink truncate">
                      <strong className="font-semibold">{n.actorName}</strong>
                      {n.actorVerified && <BadgeCheck size={12} className="inline mx-1 text-accent" />}{' '}
                      {meta.text}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      {timeAgo(n.createdAt)}
                    </span>
                  </span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-label="No leída" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificacionesView;
