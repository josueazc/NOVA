import React, { useEffect, useMemo, useState } from 'react';
import { MessagesSquare, Sparkles, UserCheck, Clock, RefreshCw, Filter, X } from 'lucide-react';
import { Avatar, Button, Card, EmptyState, SkeletonCard } from '@/components/ui';
import useComunidad from './useComunidad';
import Composer from './Composer';
import PostCard from './PostCard';
import TrendingSidebar from './TrendingSidebar';
import ProfilePanel from './ProfilePanel';

const TOPICS = ['Ambiente', 'Seguridad', 'Economía', 'Educación', 'Salud', 'Nacional', 'Política'];

const FEED_TABS = [
  ['fyp', 'Para ti', Sparkles],
  ['following', 'Siguiendo', UserCheck],
  ['recent', 'Recientes', Clock],
];

// Shuffle determinístico para el feed "Para ti"
const pseudoRandom = (seed, str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  const x = Math.sin(h + seed) * 10000;
  return x - Math.floor(x);
};

const ComunidadView = ({ userName, user, defaultView = 'feed' }) => {
  const {
    posts, loading, error, following, saved, reactions, trending,
    publish, react, repost, save, follow, removePost, report,
  } = useComunidad(user);

  const [view, setView] = useState({ type: defaultView, userId: defaultView === 'profile' ? user?.id : null });
  const [profileTab, setProfileTab] = useState('posts');
  const [feedTab, setFeedTab] = useState('fyp');
  const [fypSeed, setFypSeed] = useState(0);
  const [topicFilter, setTopicFilter] = useState('');
  const [tagFilter, setTagFilter] = useState(null);

  useEffect(() => {
    setView({ type: defaultView, userId: defaultView === 'profile' ? user?.id : null });
  }, [defaultView, user?.id]);

  const openProfile = (userId) => {
    setProfileTab('posts');
    setView({ type: 'profile', userId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uniqueProfiles = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      if (!map[p.authorId]) {
        map[p.authorId] = {
          id: p.authorId,
          name: p.authorName,
          isPolitician: p.isPolitician,
          isVerified: p.isVerified,
        };
      }
    });
    return Object.values(map);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (view.type === 'profile') {
      if (profileTab === 'posts') {
        list = list.filter((p) => p.authorId === view.userId || p.repostedBy?.includes(view.userId));
      } else if (profileTab === 'saved') {
        list = list.filter((p) => saved.includes(p.id));
      } else if (profileTab === 'replies') {
        list = []; // las respuestas se listan dentro de cada post; sin índice global aún
      } else {
        list = [];
      }
      return list.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (tagFilter) {
      list = list.filter((p) => p.hashtags?.includes(tagFilter) || p.text.toLowerCase().includes(`#${tagFilter}`));
    }
    if (topicFilter) {
      list = list.filter((p) => p.topic === topicFilter);
    }

    if (feedTab === 'fyp') {
      list.sort((a, b) => pseudoRandom(fypSeed, String(a.id)) - pseudoRandom(fypSeed, String(b.id)));
    } else if (feedTab === 'following') {
      list = list.filter((p) => following.includes(p.authorId));
      list.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      list.sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [posts, view, profileTab, saved, feedTab, fypSeed, following, topicFilter, tagFilter]);

  const showFollowLists = view.type === 'profile' && (profileTab === 'followers' || profileTab === 'following');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Encabezado del módulo */}
      <header className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-danger-soft text-danger flex items-center justify-center">
            <MessagesSquare size={18} />
          </span>
          <div>
            <h1 className="font-black tracking-tight text-3xl text-ink tracking-tight leading-none">
              Debate<span className="text-danger">CR</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mt-1">
              Comunidad política ciudadana
            </p>
          </div>
        </div>
        {view.type !== 'profile' && user && (
          <Button variant="outline" size="sm" onClick={() => openProfile(user.id)}>
            <Avatar name={userName} size="xs" />
            Mi perfil
          </Button>
        )}
      </header>

      <div className="grid lg:grid-cols-[1fr_290px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          {/* Perfil */}
          {view.type === 'profile' && (
            <ProfilePanel
              user={user}
              userName={userName}
              viewUserId={view.userId}
              posts={posts}
              following={following}
              savedCount={saved.length}
              profileTab={profileTab}
              onTab={setProfileTab}
              onBack={() => setView({ type: 'feed', userId: null })}
            />
          )}

          {/* Controles del feed */}
          {view.type === 'feed' && (
            <>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1 bg-surface border border-line rounded-lg p-1">
                  {FEED_TABS.map(([key, label, Icon]) => (
                    <button
                      key={key}
                      onClick={() => setFeedTab(key)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors
                        ${feedTab === key ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'}`}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={13} className="text-faint" />
                  <select
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    aria-label="Filtrar por tema"
                    className="bg-transparent text-[13px] font-medium text-muted outline-none cursor-pointer hover:text-ink transition-colors"
                  >
                    <option value="">Todos los temas</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {feedTab === 'fyp' && (
                    <button
                      onClick={() => setFypSeed((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent hover:underline ml-2"
                    >
                      <RefreshCw size={12} />
                      Recargar
                    </button>
                  )}
                </div>
              </div>

              {tagFilter && (
                <div className="flex items-center gap-2 animate-fade-up">
                  <span className="text-sm text-muted">Filtrando por</span>
                  <button
                    onClick={() => setTagFilter(null)}
                    className="inline-flex items-center gap-1.5 bg-accent-soft text-accent-ink text-sm font-medium px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                  >
                    #{tagFilter}
                    <X size={12} />
                  </button>
                </div>
              )}

              <Composer user={user} userName={userName} onPublish={publish} />
            </>
          )}

          {/* Listas de seguidores/seguidos */}
          {showFollowLists && (
            <Card>
              <h3 className="text-base font-semibold text-ink mb-4">
                {profileTab === 'following' ? 'Usuarios a los que sigues' : 'Tus seguidores'}
              </h3>
              {profileTab === 'following' && uniqueProfiles.filter((u) => following.includes(u.id)).length > 0 ? (
                <ul className="space-y-2">
                  {uniqueProfiles
                    .filter((u) => following.includes(u.id))
                    .map((u) => (
                      <li key={u.id} className="flex items-center justify-between gap-3 bg-surface-2 rounded-lg px-4 py-3">
                        <button onClick={() => openProfile(u.id)} className="flex items-center gap-3 group min-w-0">
                          <Avatar name={u.name} size="sm" />
                          <span className="min-w-0 text-left">
                            <span className="block text-sm font-medium text-ink truncate group-hover:text-accent transition-colors">{u.name}</span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                              {u.isPolitician ? 'Político' : 'Ciudadano'}
                            </span>
                          </span>
                        </button>
                        <Button variant="danger" size="sm" onClick={() => follow(u.id)}>
                          Dejar de seguir
                        </Button>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm text-faint">
                  {profileTab === 'following' ? 'No sigues a nadie aún.' : 'Aún no tienes seguidores en la plataforma.'}
                </p>
              )}
            </Card>
          )}

          {/* Feed */}
          {!showFollowLists && (
            <div className="space-y-4">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : filteredPosts.length === 0 ? (
                <EmptyState
                  icon={<MessagesSquare size={22} />}
                  title="No hay publicaciones"
                  description={
                    feedTab === 'following'
                      ? 'Sigue a otros ciudadanos o políticos para llenar este feed.'
                      : tagFilter || topicFilter
                        ? 'Nada por aquí con ese filtro. Prueba con otro tema.'
                        : 'Sé la primera persona en publicar.'
                  }
                />
              ) : (
                filteredPosts.map((post, i) => (
                  <div key={post.id} className="stagger-item" style={{ '--index': Math.min(i, 6) }}>
                    <PostCard
                      post={post}
                      currentUserId={user?.id}
                      userName={userName}
                      reaction={reactions[post.id]}
                      isSaved={saved.includes(post.id)}
                      isFollowing={following.includes(post.authorId)}
                      isOwn={post.authorId === user?.id}
                      onReact={react}
                      onRepost={repost}
                      onSave={save}
                      onFollow={follow}
                      onDelete={removePost}
                      onReport={report}
                      onOpenProfile={openProfile}
                      onHashtag={(tag) => {
                        setView({ type: 'feed', userId: null });
                        setTagFilter(tag);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                ))
              )}
              {error && <p className="text-center text-xs text-danger">{error}</p>}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <TrendingSidebar
            trending={trending}
            profiles={uniqueProfiles}
            following={following}
            activeTag={tagFilter}
            currentUserId={user?.id}
            onHashtag={setTagFilter}
            onFollow={follow}
            onOpenProfile={openProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default ComunidadView;
