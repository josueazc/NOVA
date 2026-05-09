const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({
    connectionString: 'postgres://postgres:josueazofeifa280408@db.knjyovglyyxnbqwuorag.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to DB!');
    
    const sql = fs.readFileSync('../supabase/01_comunidad_schema.sql', 'utf8');
    
    // Also include the bucket creation sql
    const extraSql = `
      -- CREAR EL BUCKET PARA GUARDAR LAS IMÁGENES
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('comunidad_media', 'comunidad_media', true)
      ON CONFLICT (id) DO NOTHING;

      -- Use PLPGSQL block to safely create policies without errors if they exist
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Imagenes publicas' AND tablename = 'objects' AND schemaname = 'storage'
          ) THEN
              CREATE POLICY "Imagenes publicas" ON storage.objects FOR SELECT USING ( bucket_id = 'comunidad_media' );
          END IF;
          
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Usuarios pueden subir imagenes' AND tablename = 'objects' AND schemaname = 'storage'
          ) THEN
              CREATE POLICY "Usuarios pueden subir imagenes" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'comunidad_media' AND auth.uid() = owner );
          END IF;
      END $$;
    `;
    
    await client.query(sql);
    console.log('Executed 01_comunidad_schema.sql');
    
    await client.query(extraSql);
    console.log('Executed extraSql (buckets)');
    
    // Also backfill missing profiles
    const backfillSql = `
      insert into public.profiles (id, full_name, party)
      select id, raw_user_meta_data->>'full_name', raw_user_meta_data->>'party'
      from auth.users
      where id not in (select id from public.profiles);
    `;
    const res = await client.query(backfillSql);
    console.log('Backfilled profiles: ', res.rowCount);

  } catch (err) {
    console.error('Error running SQL:', err.message);
  } finally {
    await client.end();
  }
}

run();
