-- ============================================================================
-- Migración incremental: crea el bucket de Storage 'comunidad_media' y sus
-- políticas. Necesaria para subir imágenes en la Comunidad.
-- ----------------------------------------------------------------------------
-- Correr en el SQL Editor de Supabase (usa rol de servicio). Es idempotente.
-- Ya viene incluida en 00_init.sql para instalaciones nuevas; este archivo es
-- para bases de datos que ya existían sin el bucket.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('comunidad_media', 'comunidad_media', true)
on conflict (id) do update set public = true;

drop policy if exists "comunidad_media lectura publica" on storage.objects;
create policy "comunidad_media lectura publica"
  on storage.objects for select
  using (bucket_id = 'comunidad_media');

drop policy if exists "comunidad_media subida autenticados" on storage.objects;
create policy "comunidad_media subida autenticados"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'comunidad_media');

drop policy if exists "comunidad_media actualizar propios" on storage.objects;
create policy "comunidad_media actualizar propios"
  on storage.objects for update to authenticated
  using (bucket_id = 'comunidad_media' and owner = auth.uid());

drop policy if exists "comunidad_media borrar propios" on storage.objects;
create policy "comunidad_media borrar propios"
  on storage.objects for delete to authenticated
  using (bucket_id = 'comunidad_media' and owner = auth.uid());
