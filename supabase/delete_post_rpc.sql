-- RPC para eliminar un post y todos sus dependientes saltando RLS de hijos
CREATE OR REPLACE FUNCTION delete_post(p_post_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_author_id uuid;
BEGIN
  -- Verificar si el post existe y obtener el autor
  SELECT author_id INTO v_author_id FROM public.posts WHERE id = p_post_id;
  
  -- Si no existe, retornar false
  IF v_author_id IS NULL THEN
    RETURN false;
  END IF;

  -- Verificar que el usuario que llama sea el autor del post
  IF auth.uid() != v_author_id THEN
    RETURN false;
  END IF;

  -- Eliminar el post (el CASCADE de la BD borrará los comentarios, likes, etc. usando los permisos del owner de la funcion, que es postgres superuser)
  DELETE FROM public.posts WHERE id = p_post_id;
  
  RETURN true;
END;
$$;
