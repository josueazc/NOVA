-- RPC para permitir a los usuarios eliminar su propia cuenta y todos sus datos en cascada
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  -- Esto eliminará el usuario de auth.users.
  -- Si tienes foreign keys con ON DELETE CASCADE en profiles, posts y comments,
  -- esto automáticamente borrará toda la información del usuario.
  DELETE FROM auth.users WHERE id = auth.uid();
$$;
