-- RPC para eliminar un comentario saltando RLS
CREATE OR REPLACE FUNCTION delete_comment(p_comment_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_author_id uuid;
BEGIN
  SELECT author_id INTO v_author_id FROM public.comments WHERE id = p_comment_id;
  
  IF v_author_id IS NULL THEN
    RETURN false;
  END IF;

  IF auth.uid() != v_author_id THEN
    RETURN false;
  END IF;

  DELETE FROM public.comments WHERE id = p_comment_id;
  RETURN true;
END;
$$;
