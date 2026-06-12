import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Users2, MessagesSquare, MapPin, Download, Printer, Hash } from 'lucide-react';
import { Badge, Card, EmptyState, Skeleton } from '@/components/ui';
import { supabase } from '@/lib/supabaseClient';

const PROVINCES = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];

const StatCard = ({ icon: Icon, tone, label, value, hint }) => (
  <Card padding="p-5" className="flex items-start gap-3.5">
    <Badge tone={tone} className="!p-2 !rounded-lg mt-0.5" icon={<Icon size={14} />} />
    <div>
      <p className="text-2xl font-semibold text-ink tracking-tight tabular-nums">{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint mt-0.5">{label}</p>
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  </Card>
);

const ParticipacionView = ({ user }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setData({ provinces: [], totals: null, topics: [], mine: null });
        return;
      }
      try {
        const since = new Date(Date.now() - 7 * 86400000).toISOString();
        const [provRes, postsRes, weekRes, usersRes, topicRes, mineRes] = await Promise.all([
          supabase.rpc('participation_by_province'),
          supabase.from('posts').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }).gte('created_at', since),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('topic').not('topic', 'is', null).limit(500),
          user?.id
            ? supabase.from('posts').select('likes, comment_count').eq('author_id', user.id)
            : Promise.resolve({ data: null }),
        ]);

        const topicCounts = {};
        (topicRes.data || []).forEach(({ topic }) => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });

        const mine = mineRes.data
          ? {
              posts: mineRes.data.length,
              likes: mineRes.data.reduce((acc, p) => acc + (p.likes || 0), 0),
              comments: mineRes.data.reduce((acc, p) => acc + (p.comment_count || 0), 0),
            }
          : null;

        setData({
          provinces: provRes.data || [],
          totals: {
            users: usersRes.count || 0,
            posts: postsRes.count || 0,
            postsWeek: weekRes.count || 0,
          },
          topics: Object.entries(topicCounts)
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6),
          mine,
        });
      } catch (err) {
        console.warn('Participación:', err.message);
        setData({ provinces: [], totals: null, topics: [], mine: null });
      }
    };
    load();
  }, [user?.id]);

  const provinceRows = useMemo(() => {
    if (!data) return [];
    const byName = Object.fromEntries((data.provinces || []).map((p) => [p.province, p]));
    const max = Math.max(1, ...(data.provinces || []).map((p) => Number(p.users) || 0));
    return PROVINCES.map((name) => ({
      name,
      users: Number(byName[name]?.users || 0),
      posts: Number(byName[name]?.posts || 0),
      pct: (Number(byName[name]?.users || 0) / max) * 100,
    }));
  }, [data]);

  const exportCSV = () => {
    const rows = [
      ['provincia', 'usuarios', 'publicaciones'],
      ...provinceRows.map((r) => [r.name, r.users, r.posts]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-participacion-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <header className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-success-soft text-success flex items-center justify-center">
            <Activity size={18} />
          </span>
          <div>
            <h1 className="font-serif text-3xl text-ink tracking-tight leading-none">Participación ciudadana</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mt-1">
              Métricas abiertas de la comunidad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink border border-line rounded-md px-3 py-1.5 transition-colors"
          >
            <Download size={13} />
            CSV
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink border border-line rounded-md px-3 py-1.5 transition-colors"
          >
            <Printer size={13} />
            PDF
          </button>
        </div>
      </header>

      {!data ? (
        <div className="grid sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : !data.totals ? (
        <EmptyState
          icon={<Activity size={22} />}
          title="Sin datos disponibles"
          description="Conecta Supabase y ejecuta la migración para ver las métricas de participación."
        />
      ) : (
        <div className="space-y-6">
          {/* Totales */}
          <div className="grid sm:grid-cols-3 gap-4">
            <StatCard icon={Users2} tone="blue" label="Ciudadanos registrados" value={data.totals.users.toLocaleString('es-CR')} />
            <StatCard icon={MessagesSquare} tone="red" label="Publicaciones totales" value={data.totals.posts.toLocaleString('es-CR')} />
            <StatCard
              icon={Activity}
              tone="green"
              label="Publicaciones esta semana"
              value={data.totals.postsWeek.toLocaleString('es-CR')}
              hint={data.totals.posts ? `${Math.round((data.totals.postsWeek / data.totals.posts) * 100)} % del total` : undefined}
            />
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
            {/* Por provincia */}
            <Card padding="p-6">
              <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-5">
                <MapPin size={13} />
                Participación por provincia
              </h3>
              <div className="space-y-3">
                {provinceRows.map((row, i) => (
                  <div key={row.name} className="stagger-item" style={{ '--index': i }}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-ink">{row.name}</span>
                      <span className="font-mono text-[11px] text-muted tabular-nums">
                        {row.users} usuarios · {row.posts} posts
                      </span>
                    </div>
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent/70 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(2, row.pct)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              {/* Temas más discutidos */}
              <Card padding="p-6">
                <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
                  <Hash size={13} />
                  Temas más discutidos
                </h3>
                {data.topics.length === 0 ? (
                  <p className="text-sm text-faint">Aún no hay publicaciones con tema.</p>
                ) : (
                  <ul className="space-y-2">
                    {data.topics.map(({ topic, count }, i) => (
                      <li key={topic} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-faint w-3">{i + 1}</span>
                          <span className="font-medium text-ink">{topic}</span>
                        </span>
                        <span className="font-mono text-[11px] text-muted tabular-nums">{count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              {/* Mi actividad */}
              {data.mine && (
                <Card padding="p-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">Tu actividad</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      [data.mine.posts, 'Posts'],
                      [data.mine.likes, 'Me gusta'],
                      [data.mine.comments, 'Respuestas'],
                    ].map(([value, label]) => (
                      <div key={label} className="bg-surface-2 rounded-lg py-3">
                        <p className="text-xl font-semibold text-ink tabular-nums">{value}</p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">{label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipacionView;
