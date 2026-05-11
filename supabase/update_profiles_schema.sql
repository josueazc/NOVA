-- Este script añade las columnas faltantes a la tabla 'profiles'
-- Puedes ejecutarlo de forma segura, si alguna columna ya existe, la omitirá.

DO $$ 
BEGIN 
    -- Provincia
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='province') THEN 
        ALTER TABLE profiles ADD COLUMN province text; 
    END IF;

    -- Cédula (DNI)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='dni') THEN 
        ALTER TABLE profiles ADD COLUMN dni text; 
    END IF;

    -- Biografía
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='bio') THEN 
        ALTER TABLE profiles ADD COLUMN bio text; 
    END IF;

    -- Partido
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='party') THEN 
        ALTER TABLE profiles ADD COLUMN party text; 
    END IF;

    -- Cargo (si es político)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='cargo') THEN 
        ALTER TABLE profiles ADD COLUMN cargo text; 
    END IF;

    -- Información adicional del cargo
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='cargo_info') THEN 
        ALTER TABLE profiles ADD COLUMN cargo_info text; 
    END IF;

    -- Es Político (por si acaso no la tienes)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_politician') THEN 
        ALTER TABLE profiles ADD COLUMN is_politician boolean DEFAULT false; 
    END IF;
END $$;

-- Opcional: Asegurarnos de que las políticas RLS permitan al usuario actualizar su propio perfil
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile" 
ON profiles 
FOR UPDATE 
USING ( auth.uid() = id );
