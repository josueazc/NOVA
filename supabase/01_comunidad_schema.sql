-- Update profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS party text,
ADD COLUMN IF NOT EXISTS is_politician boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS cargo text,
ADD COLUMN IF NOT EXISTS cargo_info text;

-- Update trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, party, is_politician, cargo, cargo_info)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    new.raw_user_meta_data ->> 'party',
    COALESCE((new.raw_user_meta_data ->> 'is_politician')::boolean, false),
    new.raw_user_meta_data ->> 'cargo',
    new.raw_user_meta_data ->> 'cargo_info'
  )
  ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        party = EXCLUDED.party,
        is_politician = EXCLUDED.is_politician,
        cargo = EXCLUDED.cargo,
        cargo_info = EXCLUDED.cargo_info;

  RETURN new;
END;
$$;

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  media text,
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  reposts integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  is_announcement boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public posts are viewable by everyone." ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts." ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own posts." ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own posts." ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public comments are viewable by everyone." ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments." ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own comments." ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own comments." ON public.comments FOR DELETE USING (auth.uid() = author_id);

-- Create reactions table
CREATE TABLE IF NOT EXISTS public.post_reactions (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction_type text, -- 'like', 'dislike'
  PRIMARY KEY (post_id, user_id)
);
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reactions viewable by everyone." ON public.post_reactions FOR SELECT USING (true);
CREATE POLICY "Users can manage own reactions." ON public.post_reactions FOR ALL USING (auth.uid() = user_id);

-- Create reposts table
CREATE TABLE IF NOT EXISTS public.post_reposts (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, user_id)
);
ALTER TABLE public.post_reposts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reposts viewable by everyone." ON public.post_reposts FOR SELECT USING (true);
CREATE POLICY "Users can manage own reposts." ON public.post_reposts FOR ALL USING (auth.uid() = user_id);
