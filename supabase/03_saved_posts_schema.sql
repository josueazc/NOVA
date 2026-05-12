-- 03_saved_posts_schema.sql
-- Ejecutar en Supabase SQL Editor

-- 1. Tabla saved_posts
CREATE TABLE IF NOT EXISTS public.saved_posts (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

-- Habilitar RLS si no estaba
ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;

-- Políticas (Eliminar previas si existen para no causar error)
DROP POLICY IF EXISTS "Users can see their own saved posts" ON public.saved_posts;
DROP POLICY IF EXISTS "Users can manage their saved posts" ON public.saved_posts;

CREATE POLICY "Users can see their own saved posts" ON public.saved_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their saved posts" ON public.saved_posts FOR ALL USING (auth.uid() = user_id);

-- 2. Insertar comentarios falsos de bots para simular debate
DO $$
DECLARE
    bot_ambiente_id uuid := '11111111-1111-1111-1111-111111111111';
    bot_seguridad_id uuid := '22222222-2222-2222-2222-222222222222';
    diputado_id uuid := '33333333-3333-3333-3333-333333333333';
    post_ambiente uuid;
    post_seguridad uuid;
BEGIN
    -- Conseguir el id del post de ambiente que insertamos en seed_bots.sql
    SELECT id INTO post_ambiente FROM public.posts WHERE topic = 'Ambiente' LIMIT 1;
    -- Conseguir el id del post de seguridad
    SELECT id INTO post_seguridad FROM public.posts WHERE topic = 'Seguridad' LIMIT 1;

    IF post_ambiente IS NOT NULL THEN
        INSERT INTO public.comments (post_id, author_id, text, created_at) VALUES 
        (post_ambiente, diputado_id, 'Me parece una excelente iniciativa, apoyaremos desde nuestra fracción.', now() - interval '1 hour')
        ON CONFLICT DO NOTHING;
    END IF;

    IF post_seguridad IS NOT NULL THEN
        INSERT INTO public.comments (post_id, author_id, text, created_at) VALUES 
        (post_seguridad, bot_ambiente_id, 'Es importante mantener la vigilancia y también pensar en prevención social.', now() - interval '2 hours')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
