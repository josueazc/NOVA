# VoteOn Costa Rica 🇨🇷

VoteOn es una plataforma ciudadana interactiva diseñada para fomentar la educación cívica y la transparencia política en Costa Rica de cara a las elecciones 2026. Proporciona herramientas para interactuar con datos políticos, conocer a los candidatos, debatir en una comunidad moderada y realizar consultas impulsadas por Inteligencia Artificial.

## 🚀 Características Principales

1. **Dashboard Informativo:** Estadísticas de partidos, proyectos de ley y noticias políticas relevantes en tiempo real.
2. **Asistente IA Estricto (Gemini):** Un chatbot de Inteligencia Artificial que responde *exclusivamente* basándose en los documentos (TXT, PDF) y textos que el usuario le proporciona, evitando alucinaciones. Soporta múltiples idiomas.
3. **Comunidad (DebateCR):** Un foro o muro social tipo Twitter/Reddit donde los ciudadanos pueden publicar opiniones, comentar, dar *like*, *dislike*, y republicar. Soporta subida de imágenes.
4. **Mi Perfil:** Sistema de usuarios con Supabase donde los usuarios pueden registrarse como ciudadanos regulares o políticos, indicando su afiliación y provincia. 
5. **Autenticación Completa:** Registro, inicio de sesión y sistema completo de recuperación de contraseña ("Olvidaste tu contraseña") usando Supabase Auth.
6. **Módulos Adicionales:** Test Político, La Asamblea y Análisis de Planes de Gobierno (en constante desarrollo).

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React.js, Vite
- **Estilos:** Tailwind CSS (con animaciones y diseño *glassmorphism* premium)
- **Iconos:** Lucide React
- **Backend & Base de Datos:** Supabase (PostgreSQL, Storage, Auth)
- **Inteligencia Artificial:** API REST nativa de Google Gemini (Gemini-2.5-Flash)

## 🏗️ Arquitectura y Organización del Código

El proyecto sigue una arquitectura modular basada en componentes y vistas funcionales de React, estructurado para mantener escalabilidad y buenas prácticas:

- `/src/components/dashboard/`: Contiene los módulos principales de la plataforma (Asamblea, Comunidad, Partidos, Planes, Test Político, Chatbot y Configuración).
- `/src/components/auth/`: Lógica y vistas de autenticación, registro y recuperación de contraseñas.
- `/src/data/`: Archivos estáticos de datos centralizados (e.g., `partidosData.js`) para evitar duplicación y centralizar la información.
- `/src/lib/`: Configuración e inicialización de clientes externos (e.g., `supabaseClient.js`).
- `/src/index.css`: Archivo principal de estilos de Tailwind CSS, incluyendo la configuración de temas globales (modo oscuro/claro) y variables CSS (Tailwind utilities).

## 🗄️ Diseño de Base de Datos (Supabase / PostgreSQL)

El sistema utiliza un esquema relacional para asegurar integridad referencial y escalar de forma efectiva.

### Tablas Principales:
1. **`profiles`**: Extiende la tabla de autenticación nativa de Supabase (`auth.users`).
   - Campos: `id` (UUID), `full_name`, `provincia`, `cedula`, `bio`, `party`, `is_politician`, `cargo`, `cargo_info`.
   - Propósito: Almacenar la identidad cívica o perfil político del usuario.
2. **`posts`**: Almacena las publicaciones del módulo Comunidad.
   - Campos: `id`, `author_id` (FK a `profiles`), `text`, `media` (URL de imagen), `likes`, `reposts`, `created_at`.
3. **`comments`**: Estructura anidada para las respuestas en publicaciones.
   - Campos: `id`, `post_id` (FK a `posts`), `author_id` (FK a `profiles`), `text`, `created_at`.

### Integridad y Seguridad (RLS):
Se han aplicado políticas RLS (*Row Level Security*) rigurosas:
- **Lectura:** Pública para `posts` y `comments` permitiendo visibilidad comunitaria.
- **Escritura/Modificación:** Restringida exclusivamente al `auth.uid()` del usuario creador.
- **Storage:** Bucket `comunidad_media` configurado para aceptar únicamente imágenes desde clientes autenticados.

## ⚙️ Configuración del Entorno Local y Despliegue

Para correr este proyecto en tu máquina, asegúrate de tener instalado **Node.js** y sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd ProyectoDesa
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno (.env):**
   Crea o edita el archivo `.env` en la raíz del proyecto y agrega tus credenciales:
   ```env
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
   VITE_GEMINI_API_KEY=tu_api_key_de_gemini
   ```

4. **Configuración de Supabase (Base de datos):**
   - Asegúrate de tener habilitada la autenticación por Email/Contraseña.
   - Crea un bucket en Supabase Storage llamado `comunidad_media` y hazlo **público** para permitir la subida de imágenes.

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) para ver la aplicación.

### Construcción para Producción
Para compilar y preparar el proyecto para despliegue (ej. Vercel, Netlify):
```bash
npm run build
```
Esto generará los assets optimizados en la carpeta `/dist/`.

## 🤝 Contribuciones

Si eres un desarrollador, analista de datos o simplemente un ciudadano apasionado por mejorar la calidad de la información pública en Costa Rica, ¡eres bienvenido a contribuir! 

---
*Plataforma desarrollada para el futuro democrático de Costa Rica.*
