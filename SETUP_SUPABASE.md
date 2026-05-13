# 📊 Guía de Configuración Supabase - VoteOn

## 🚀 Inicio Rápido

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Haz clic en "New Project"
4. Completa los datos:
   - **Project name**: VoteOn
   - **Database password**: Guarda una contraseña segura
   - **Region**: (Elige la más cercana a ti)
5. Espera a que se cree el proyecto

### 2. Obtener Variables de Entorno

1. Ve a **Project Settings** → **API**
2. Copia estos valores a tu archivo `.env`:

```env
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

3. Copia estas líneas exactamente como aparecen en Supabase

### 3. Activar Autenticación

1. Ve a **Authentication** → **Providers**
2. Habilita:
   - ✅ **Email** (ya está habilitado)
   - ✅ **Google OAuth** (sigue estos pasos):
     - Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com)
     - Ve a **APIs & Services** → **OAuth Consent Screen**
     - Configura la pantalla de consentimiento
     - Ve a **Credentials** → **Create OAuth 2.0 Client ID**
     - Tipo: Web Application
     - Agrega a "Authorized JavaScript origins":
       - `http://localhost:5173`
       - `http://localhost:3000`
       - Tu URL de producción
     - Agrega a "Authorized redirect URIs":
       - `https://[tu-proyecto].supabase.co/auth/v1/callback`
     - Copia Client ID y Secret
     - En Supabase, pega en Google provider settings

---

## 📋 Crear Tablas en Supabase

Abre la consola SQL en Supabase (**SQL Editor**) y ejecuta estos scripts:

### Tabla 1: Perfiles de Usuarios

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  province TEXT,
  dni TEXT UNIQUE,
  bio TEXT,
  party TEXT,
  is_politician BOOLEAN DEFAULT FALSE,
  cargo TEXT,
  cargo_info TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios ven su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Política: Los usuarios pueden insertar su propio perfil
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### Tabla 2: Comentarios/Comunidad

```sql
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  content TEXT NOT NULL,
  topic TEXT,
  party TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  likes_count INTEGER DEFAULT 0
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver comentarios públicos
CREATE POLICY "Authenticated users can view all comments"
  ON public.comments FOR SELECT
  TO authenticated
  USING (TRUE);

-- Política: Los usuarios pueden insertar comentarios
CREATE POLICY "Authenticated users can insert comments"
  ON public.comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Tabla 3: Votos/Encuestas

```sql
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  poll_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios ven sus votos
CREATE POLICY "Users can view own votes"
  ON public.votes FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios pueden votar
CREATE POLICY "Authenticated users can vote"
  ON public.votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Tabla 4: Test Político

```sql
CREATE TABLE IF NOT EXISTS public.political_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  results JSONB,
  score_left_right DECIMAL(5,2),
  score_auth_lib DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.political_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own test results"
  ON public.political_tests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert test results"
  ON public.political_tests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

---

## 🔐 Row Level Security (RLS)

**Importante**: Las políticas RLS anterior protegen los datos:

- ✅ Los usuarios solo ven/editan sus propios datos
- ✅ Los comentarios son públicos pero vinculados al usuario
- ✅ Los votos son privados
- ✅ Los resultados del test son privados

---

## 🛠️ Usar en la Aplicación

### En React, conectar con Supabase:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Obtener perfil del usuario
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

// Insertar comentario
const { data, error } = await supabase
  .from('comments')
  .insert([
    {
      user_id: userId,
      content: 'Mi comentario',
      topic: 'educación'
    }
  ])
```

---

## 📱 Características Responsive

El sitio es **100% responsive** con:

- ✅ Diseño mobile-first
- ✅ Breakpoints en 640px, 768px, 1024px, 1280px
- ✅ Animaciones suaves
- ✅ Paleta de colores: Azul (`#002B7F`) y Rojo (`#EF1C24`)
- ✅ Interfaz minimalista y limpia
- ✅ Transiciones y micro-animaciones

---

## 🎨 Paleta de Colores

- **Azul Primario**: `#002B7F` (profesional, confianza)
- **Rojo Acento**: `#EF1C24` (urgencia, acción)
- **Fondo Neutral**: `#f5f7fa` a `#c3cfe2` (gradiente suave)
- **Texto Oscuro**: `#0f172a` (contraste)

---

## 🚀 Deployment

Para publicar en producción:

1. **Vercel** (Recomendado):
   - Conecta tu repo de GitHub
   - Agrega variables de entorno
   - Auto-deploy en cada push

2. **Netlify**:
   - Conecta repo
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Supabase
- [ ] Variables de entorno configuradas en `.env`
- [ ] Autenticación Email habilitada
- [ ] Google OAuth configurado
- [ ] Tablas creadas y RLS activado
- [ ] Aplicación corriendo en `http://localhost:5173`
- [ ] Puedes crear usuario y iniciar sesión
- [ ] Google login funciona
- [ ] Dashboard se muestra después de login

---

**¡Listo!** Tu plataforma de voto ciudadano está lista. 🎉
