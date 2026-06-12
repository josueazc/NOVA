import React from 'react';
import { TrendingUp, Hash, UserPlus, UserCheck, BadgeCheck } from 'lucide-react';
import { Avatar, Card } from '@/components/ui';

const TrendingSidebar = ({ trending, profiles, following, activeTag, onHashtag, onFollow, onOpenProfile, currentUserId }) => {
  const suggestions = profiles
    .filter((p) => p.id !== currentUserId && !following.includes(p.id))
    .slice(0, 4);

  return (
    <aside className="space-y-4 lg:sticky lg:top-20 self-start">
      {/* Tendencias */}
      <Card padding="p-5">
        <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
          <TrendingUp size={13} />
          Tendencias
        </h3>
        {trending.length === 0 ? (
          <p className="text-xs text-faint">Aún no hay temas en tendencia esta semana.</p>
        ) : (
          <ul className="space-y-1">
            {trending.map(({ tag, uses }, i) => (
              <li key={tag}>
                <button
                  onClick={() => onHashtag(activeTag === tag ? null : tag)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-left transition-colors
                    ${activeTag === tag ? 'bg-accent-soft text-accent-ink' : 'hover:bg-surface-2'}`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] text-faint w-3">{i + 1}</span>
                    <Hash size={12} className="text-accent shrink-0" />
                    <span className="text-sm font-medium text-ink truncate">{tag}</span>
                  </span>
                  <span className="font-mono text-[10px] text-faint shrink-0">{uses}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* A quién seguir */}
      {suggestions.length > 0 && (
        <Card padding="p-5">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
            A quién seguir
          </h3>
          <ul className="space-y-3">
            {suggestions.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2">
                <button onClick={() => onOpenProfile(p.id)} className="flex items-center gap-2.5 min-w-0 group">
                  <Avatar name={p.name} size="sm" />
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">
                      {p.name}
                      {p.isVerified && <BadgeCheck size={12} className="inline ml-1 text-accent" />}
                    </span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                      {p.isPolitician ? 'Político' : 'Ciudadano'}
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => onFollow(p.id)}
                  aria-label={`Seguir a ${p.name}`}
                  className="p-1.5 rounded-md text-accent hover:bg-accent-soft transition-colors shrink-0"
                >
                  {following.includes(p.id) ? <UserCheck size={14} /> : <UserPlus size={14} />}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </aside>
  );
};

export default TrendingSidebar;
