-- 02_gamification_schema.sql
-- Ejecutar en Supabase SQL Editor

DO $$ 
BEGIN 
    -- Columnas de Gamificación
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='badges') THEN 
        ALTER TABLE profiles ADD COLUMN badges text[] DEFAULT '{}'; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='points') THEN 
        ALTER TABLE profiles ADD COLUMN points integer DEFAULT 0; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='level') THEN 
        ALTER TABLE profiles ADD COLUMN level integer DEFAULT 1; 
    END IF;
    
    -- Columnas de Bots y Temas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_bot') THEN 
        ALTER TABLE profiles ADD COLUMN is_bot boolean DEFAULT false; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='bot_topic') THEN 
        ALTER TABLE profiles ADD COLUMN bot_topic text; 
    END IF;

    -- Columnas de Followers
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='followers_count') THEN 
        ALTER TABLE profiles ADD COLUMN followers_count integer DEFAULT 0; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='following_count') THEN 
        ALTER TABLE profiles ADD COLUMN following_count integer DEFAULT 0; 
    END IF;
END $$;

-- Tabla followers
CREATE TABLE IF NOT EXISTS public.followers (
  follower_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public followers viewable by everyone." ON public.followers FOR SELECT USING (true);
CREATE POLICY "Users can manage their follows." ON public.followers FOR ALL USING (auth.uid() = follower_id);

-- Agregar topic a posts
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='topic') THEN 
        ALTER TABLE posts ADD COLUMN topic text; 
    END IF;
END $$;

-- Opcionalmente, agregar una insignia de prueba al usuario admin o tu cuenta si existe
-- UPDATE public.profiles SET badges = ARRAY['🏅 Ciudadano Informado', '⚡ Fundador'];
