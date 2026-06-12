-- ============================================================================
-- VoteOn Costa Rica — Esquema consolidado
-- ----------------------------------------------------------------------------
-- Script idempotente: se puede ejecutar varias veces sin romper datos.
-- Ejecutar completo en Supabase SQL Editor (o `supabase db push`).
-- Reemplaza a los antiguos schema.sql / 01..03_*.sql / *_rpc.sql.
-- ============================================================================

-- ============================================================================
-- 1. PERFILES
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists province text,
  add column if not exists dni text,
  add column if not exists bio text,
  add column if not exists party text,
  add column if not exists is_politician boolean default false,
  add column if not exists cargo text,
  add column if not exists cargo_info text,
  add column if not exists badges text[] default '{}',
  add column if not exists points integer default 0,
  add column if not exists level integer default 1,
  add column if not exists is_bot boolean default false,
  add column if not exists bot_topic text,
  add column if not exists followers_count integer default 0,
  add column if not exists following_count integer default 0,
  -- Confianza y verificación
  add column if not exists trust_score numeric(5,2) not null default 50.00,
  add column if not exists is_verified boolean not null default false,
  add column if not exists verified_at timestamptz,
  add column if not exists avatar_url text,
  add column if not exists interests text[] default '{}';

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Crear perfil al registrarse (sincroniza metadata de auth)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, province, dni, bio, party, is_politician, cargo, cargo_info)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    new.raw_user_meta_data ->> 'province',
    new.raw_user_meta_data ->> 'dni',
    new.raw_user_meta_data ->> 'bio',
    new.raw_user_meta_data ->> 'party',
    coalesce((new.raw_user_meta_data ->> 'is_politician')::boolean, false),
    new.raw_user_meta_data ->> 'cargo',
    new.raw_user_meta_data ->> 'cargo_info'
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        province = coalesce(excluded.province, profiles.province),
        party = coalesce(excluded.party, profiles.party);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 2. RED SOCIAL: POSTS, COMENTARIOS, REACCIONES, REPOSTS, SEGUIDORES, GUARDADOS
-- ============================================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete cascade,
  text text not null,
  media text,
  likes integer default 0,
  dislikes integer default 0,
  reposts integer default 0,
  comment_count integer default 0,
  is_announcement boolean default false,
  created_at timestamptz default now()
);

alter table public.posts
  add column if not exists topic text,
  add column if not exists hashtags text[] default '{}',
  add column if not exists is_hidden boolean not null default false,
  add column if not exists moderation_label text,
  add column if not exists report_count integer not null default 0;

alter table public.posts enable row level security;
drop policy if exists "Public posts are viewable by everyone." on public.posts;
create policy "Public posts are viewable by everyone." on public.posts for select using (true);
drop policy if exists "Users can insert their own posts." on public.posts;
create policy "Users can insert their own posts." on public.posts for insert with check (auth.uid() = author_id);
drop policy if exists "Users can update their own posts." on public.posts;
create policy "Users can update their own posts." on public.posts for update using (auth.uid() = author_id);
drop policy if exists "Users can delete their own posts." on public.posts;
create policy "Users can delete their own posts." on public.posts for delete using (auth.uid() = author_id);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_author_idx on public.posts (author_id);
create index if not exists posts_topic_idx on public.posts (topic);
create index if not exists posts_hashtags_idx on public.posts using gin (hashtags);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;
drop policy if exists "Public comments are viewable by everyone." on public.comments;
create policy "Public comments are viewable by everyone." on public.comments for select using (true);
drop policy if exists "Users can insert their own comments." on public.comments;
create policy "Users can insert their own comments." on public.comments for insert with check (auth.uid() = author_id);
drop policy if exists "Users can update their own comments." on public.comments;
create policy "Users can update their own comments." on public.comments for update using (auth.uid() = author_id);
drop policy if exists "Users can delete their own comments." on public.comments;
create policy "Users can delete their own comments." on public.comments for delete using (auth.uid() = author_id);

create index if not exists comments_post_idx on public.comments (post_id, created_at);

create table if not exists public.post_reactions (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  reaction_type text check (reaction_type in ('like', 'dislike')),
  primary key (post_id, user_id)
);

alter table public.post_reactions enable row level security;
drop policy if exists "Public reactions viewable by everyone." on public.post_reactions;
create policy "Public reactions viewable by everyone." on public.post_reactions for select using (true);
drop policy if exists "Users can manage own reactions." on public.post_reactions;
create policy "Users can manage own reactions." on public.post_reactions for all using (auth.uid() = user_id);

create table if not exists public.post_reposts (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

alter table public.post_reposts enable row level security;
drop policy if exists "Public reposts viewable by everyone." on public.post_reposts;
create policy "Public reposts viewable by everyone." on public.post_reposts for select using (true);
drop policy if exists "Users can manage own reposts." on public.post_reposts;
create policy "Users can manage own reposts." on public.post_reposts for all using (auth.uid() = user_id);

create table if not exists public.followers (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

alter table public.followers enable row level security;
drop policy if exists "Public followers viewable by everyone." on public.followers;
create policy "Public followers viewable by everyone." on public.followers for select using (true);
drop policy if exists "Users can manage their follows." on public.followers;
create policy "Users can manage their follows." on public.followers for all using (auth.uid() = follower_id);

create table if not exists public.saved_posts (
  user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

alter table public.saved_posts enable row level security;
drop policy if exists "Users can see their own saved posts" on public.saved_posts;
create policy "Users can see their own saved posts" on public.saved_posts for select using (auth.uid() = user_id);
drop policy if exists "Users can manage their saved posts" on public.saved_posts;
create policy "Users can manage their saved posts" on public.saved_posts for all using (auth.uid() = user_id);

-- ============================================================================
-- 3. CONTADORES ATÓMICOS (los clientes ya no escriben contadores directamente)
-- ============================================================================
create or replace function public.sync_post_reaction_counts()
returns trigger language plpgsql security definer as $$
declare
  v_post_id uuid := coalesce(new.post_id, old.post_id);
begin
  update public.posts p set
    likes    = (select count(*) from public.post_reactions r where r.post_id = v_post_id and r.reaction_type = 'like'),
    dislikes = (select count(*) from public.post_reactions r where r.post_id = v_post_id and r.reaction_type = 'dislike')
  where p.id = v_post_id;
  return coalesce(new, old);
end; $$;

drop trigger if exists trg_sync_reaction_counts on public.post_reactions;
create trigger trg_sync_reaction_counts
  after insert or update or delete on public.post_reactions
  for each row execute function public.sync_post_reaction_counts();

create or replace function public.sync_post_repost_count()
returns trigger language plpgsql security definer as $$
declare
  v_post_id uuid := coalesce(new.post_id, old.post_id);
begin
  update public.posts p
    set reposts = (select count(*) from public.post_reposts r where r.post_id = v_post_id)
  where p.id = v_post_id;
  return coalesce(new, old);
end; $$;

drop trigger if exists trg_sync_repost_count on public.post_reposts;
create trigger trg_sync_repost_count
  after insert or delete on public.post_reposts
  for each row execute function public.sync_post_repost_count();

create or replace function public.sync_post_comment_count()
returns trigger language plpgsql security definer as $$
declare
  v_post_id uuid := coalesce(new.post_id, old.post_id);
begin
  update public.posts p
    set comment_count = (select count(*) from public.comments c where c.post_id = v_post_id)
  where p.id = v_post_id;
  return coalesce(new, old);
end; $$;

drop trigger if exists trg_sync_comment_count on public.comments;
create trigger trg_sync_comment_count
  after insert or delete on public.comments
  for each row execute function public.sync_post_comment_count();

create or replace function public.sync_follower_counts()
returns trigger language plpgsql security definer as $$
declare
  v_follower uuid := coalesce(new.follower_id, old.follower_id);
  v_following uuid := coalesce(new.following_id, old.following_id);
begin
  update public.profiles set following_count = (select count(*) from public.followers f where f.follower_id = v_follower) where id = v_follower;
  update public.profiles set followers_count = (select count(*) from public.followers f where f.following_id = v_following) where id = v_following;
  return coalesce(new, old);
end; $$;

drop trigger if exists trg_sync_follower_counts on public.followers;
create trigger trg_sync_follower_counts
  after insert or delete on public.followers
  for each row execute function public.sync_follower_counts();

-- ============================================================================
-- 4. POLÍTICA: PARTIDOS, POLÍTICOS, PROPUESTAS, PLANES DE GOBIERNO
-- Catálogos públicos administrados desde el panel (escritura solo service_role)
-- ============================================================================
create table if not exists public.parties (
  id text primary key,                 -- slug, ej: 'pln'
  name text not null,
  abbreviation text,
  ideology text,
  ideology_score numeric(4,2),         -- -10 (izq) .. +10 (der)
  founded_year integer,
  color text,
  logo_url text,
  description text,
  website text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.politicians (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  party_id text references public.parties(id) on delete set null,
  position text,                       -- candidato presidencial, diputado, etc.
  province text,
  bio text,
  photo_url text,
  profile_id uuid references public.profiles(id) on delete set null, -- enlace a cuenta verificada
  created_at timestamptz default now()
);

create table if not exists public.government_plans (
  id uuid primary key default gen_random_uuid(),
  party_id text references public.parties(id) on delete cascade,
  election_year integer not null default 2026,
  title text,
  source_url text,
  summary text,
  created_at timestamptz default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references public.government_plans(id) on delete cascade,
  party_id text references public.parties(id) on delete cascade,
  topic text not null,                 -- educacion, salud, economia, seguridad, ambiente, tecnologia, derechos
  title text not null,
  description text,
  stance_score numeric(4,2),           -- posición en el tema -10..+10
  source_url text,
  created_at timestamptz default now()
);

create index if not exists proposals_topic_idx on public.proposals (topic);
create index if not exists proposals_party_idx on public.proposals (party_id);

alter table public.parties enable row level security;
alter table public.politicians enable row level security;
alter table public.government_plans enable row level security;
alter table public.proposals enable row level security;

drop policy if exists "Parties are public" on public.parties;
create policy "Parties are public" on public.parties for select using (true);
drop policy if exists "Politicians are public" on public.politicians;
create policy "Politicians are public" on public.politicians for select using (true);
drop policy if exists "Plans are public" on public.government_plans;
create policy "Plans are public" on public.government_plans for select using (true);
drop policy if exists "Proposals are public" on public.proposals;
create policy "Proposals are public" on public.proposals for select using (true);

-- ============================================================================
-- 5. NOTIFICACIONES
-- ============================================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('comment','like','follow','repost','mention','report_resolved','announcement')),
  post_id uuid references public.posts(id) on delete cascade,
  payload jsonb default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, read, created_at desc);

alter table public.notifications enable row level security;
drop policy if exists "Users read own notifications" on public.notifications;
create policy "Users read own notifications" on public.notifications for select using (auth.uid() = user_id);
drop policy if exists "Users update own notifications" on public.notifications;
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = user_id);
drop policy if exists "Users delete own notifications" on public.notifications;
create policy "Users delete own notifications" on public.notifications for delete using (auth.uid() = user_id);

-- Generación automática de notificaciones
create or replace function public.notify_on_comment()
returns trigger language plpgsql security definer as $$
declare
  v_author uuid;
begin
  select author_id into v_author from public.posts where id = new.post_id;
  if v_author is not null and v_author <> new.author_id then
    insert into public.notifications (user_id, actor_id, kind, post_id)
    values (v_author, new.author_id, 'comment', new.post_id);
  end if;
  return new;
end; $$;

drop trigger if exists trg_notify_on_comment on public.comments;
create trigger trg_notify_on_comment
  after insert on public.comments
  for each row execute function public.notify_on_comment();

create or replace function public.notify_on_reaction()
returns trigger language plpgsql security definer as $$
declare
  v_author uuid;
begin
  if new.reaction_type = 'like' then
    select author_id into v_author from public.posts where id = new.post_id;
    if v_author is not null and v_author <> new.user_id then
      insert into public.notifications (user_id, actor_id, kind, post_id)
      values (v_author, new.user_id, 'like', new.post_id);
    end if;
  end if;
  return new;
end; $$;

drop trigger if exists trg_notify_on_reaction on public.post_reactions;
create trigger trg_notify_on_reaction
  after insert on public.post_reactions
  for each row execute function public.notify_on_reaction();

create or replace function public.notify_on_follow()
returns trigger language plpgsql security definer as $$
begin
  if new.following_id <> new.follower_id then
    insert into public.notifications (user_id, actor_id, kind)
    values (new.following_id, new.follower_id, 'follow');
  end if;
  return new;
end; $$;

drop trigger if exists trg_notify_on_follow on public.followers;
create trigger trg_notify_on_follow
  after insert on public.followers
  for each row execute function public.notify_on_follow();

-- ============================================================================
-- 6. MODERACIÓN: REPORTES Y CONFIANZA
-- ============================================================================
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reason text not null check (reason in ('toxicity','spam','misinformation','harassment','sensitive','other')),
  details text,
  status text not null default 'pending' check (status in ('pending','reviewed','dismissed','actioned')),
  ai_assessment jsonb,                 -- resultado de moderación IA
  created_at timestamptz default now(),
  resolved_at timestamptz,
  unique (reporter_id, post_id, comment_id, reason)
);

create index if not exists reports_status_idx on public.reports (status, created_at desc);

alter table public.reports enable row level security;
drop policy if exists "Users create reports" on public.reports;
create policy "Users create reports" on public.reports for insert with check (auth.uid() = reporter_id);
drop policy if exists "Users see own reports" on public.reports;
create policy "Users see own reports" on public.reports for select using (auth.uid() = reporter_id);

-- Contador de reportes en el post + ocultar automáticamente al llegar al umbral
create or replace function public.sync_post_report_count()
returns trigger language plpgsql security definer as $$
begin
  if new.post_id is not null then
    update public.posts p set
      report_count = (select count(*) from public.reports r where r.post_id = new.post_id),
      is_hidden = ((select count(*) from public.reports r where r.post_id = new.post_id) >= 5)
    where p.id = new.post_id;
  end if;
  return new;
end; $$;

drop trigger if exists trg_sync_report_count on public.reports;
create trigger trg_sync_report_count
  after insert on public.reports
  for each row execute function public.sync_post_report_count();

-- ============================================================================
-- 7. FACT-CHECKS
-- ============================================================================
create table if not exists public.fact_checks (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  claim text not null,
  verdict text check (verdict in ('true','mostly_true','mixed','mostly_false','false','unverifiable')),
  confidence numeric(4,3),             -- 0..1
  explanation text,
  sources jsonb default '[]'::jsonb,
  requested_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists fact_checks_post_idx on public.fact_checks (post_id);

alter table public.fact_checks enable row level security;
drop policy if exists "Fact checks are public" on public.fact_checks;
create policy "Fact checks are public" on public.fact_checks for select using (true);
drop policy if exists "Users request fact checks" on public.fact_checks;
create policy "Users request fact checks" on public.fact_checks for insert with check (auth.uid() = requested_by);

-- ============================================================================
-- 8. ANALYTICS LIGERO (propio, complementa PostHog)
-- ============================================================================
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete set null,
  event text not null,
  properties jsonb default '{}'::jsonb,
  province text,
  created_at timestamptz default now()
);

create index if not exists analytics_event_idx on public.analytics_events (event, created_at desc);

alter table public.analytics_events enable row level security;
drop policy if exists "Users insert own events" on public.analytics_events;
create policy "Users insert own events" on public.analytics_events
  for insert with check (auth.uid() = user_id or user_id is null);

-- ============================================================================
-- 9. RPCs
-- ============================================================================
create or replace function public.delete_post(p_post_id uuid)
returns boolean language plpgsql security definer as $$
declare
  v_author_id uuid;
begin
  select author_id into v_author_id from public.posts where id = p_post_id;
  if v_author_id is null then return false; end if;
  if auth.uid() != v_author_id then return false; end if;
  delete from public.posts where id = p_post_id;
  return true;
end; $$;

create or replace function public.delete_comment(p_comment_id uuid)
returns boolean language plpgsql security definer as $$
declare
  v_author_id uuid;
begin
  select author_id into v_author_id from public.comments where id = p_comment_id;
  if v_author_id is null then return false; end if;
  if auth.uid() != v_author_id then return false; end if;
  delete from public.comments where id = p_comment_id;
  return true;
end; $$;

create or replace function public.delete_user()
returns void language sql security definer as $$
  delete from auth.users where id = auth.uid();
$$;

-- Trending: hashtags más usados en los últimos 7 días
create or replace function public.trending_hashtags(p_limit integer default 10)
returns table (tag text, uses bigint) language sql stable as $$
  select unnest(hashtags) as tag, count(*) as uses
  from public.posts
  where created_at > now() - interval '7 days' and not is_hidden
  group by tag
  order by uses desc, tag
  limit p_limit;
$$;

-- Participación por provincia (para mapas y dashboards)
create or replace function public.participation_by_province()
returns table (province text, users bigint, posts bigint) language sql stable as $$
  select pr.province,
         count(distinct pr.id) as users,
         count(p.id) as posts
  from public.profiles pr
  left join public.posts p on p.author_id = pr.id
  where pr.province is not null and pr.province <> ''
  group by pr.province
  order by users desc;
$$;

-- Recalcular trust score: base 50, sube con participación positiva, baja con reportes
create or replace function public.recalc_trust_score(p_user_id uuid)
returns numeric language plpgsql security definer as $$
declare
  v_posts int; v_likes int; v_reports int; v_score numeric;
begin
  select count(*) into v_posts from public.posts where author_id = p_user_id;
  select coalesce(sum(likes), 0) into v_likes from public.posts where author_id = p_user_id;
  select count(*) into v_reports from public.reports r
    join public.posts p on p.id = r.post_id
    where p.author_id = p_user_id and r.status <> 'dismissed';
  v_score := greatest(0, least(100, 50 + v_posts * 0.5 + v_likes * 0.2 - v_reports * 5));
  update public.profiles set trust_score = v_score where id = p_user_id;
  return v_score;
end; $$;

-- ============================================================================
-- 10. STORAGE
-- ----------------------------------------------------------------------------
-- Crear bucket público 'comunidad_media' desde el panel de Supabase
-- (Storage -> New bucket -> public). Límite recomendado: 5 MB por archivo.
-- ============================================================================
