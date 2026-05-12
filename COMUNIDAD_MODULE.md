# Documentación Técnica Detallada: Módulo de Comunidad (VoteOn)

El módulo de "Comunidad" (implementado en `ComunidadView.jsx`) es el núcleo social interactivo de la plataforma VoteOn. Está diseñado para proveer una experiencia fluida estilo "Twitter/X", permitiendo el debate político mediante publicaciones, respuestas, un sistema de reacciones y un esquema de seguidores.

Esta documentación detalla el funcionamiento interno de toda la arquitectura: Base de Datos, Backend y Frontend.

---

## 1. Filosofía de Diseño

El módulo está construido bajo una arquitectura **"Frontend-First" con Resiliencia Local e "Optimistic UI"**.
*   **Resiliencia Local:** La interfaz prioriza funcionar bajo cualquier circunstancia. Si la base de datos (Supabase) falla, tarda en responder, o no se ha completado una migración, la aplicación no se bloquea. Utiliza `localStorage` y memoria en tiempo de ejecución para mantener la experiencia visual.
*   **Optimistic UI:** Acciones como dar "Me gusta", comentar, seguir o eliminar, se reflejan instantáneamente en la interfaz gráfica. En segundo plano, se envía la petición al backend. Si el backend falla, el Frontend maneja la reversión o la retención local de los datos.

---

## 2. Estructura de la Base de Datos (Supabase PostgreSQL)

El sistema de Comunidad depende de varias tablas fuertemente interconectadas mediante relaciones `FOREIGN KEY` con restricciones `ON DELETE CASCADE`.

### 2.1. Tablas Principales

1.  **`profiles`**: Tabla central de usuarios, sincronizada automáticamente con la autenticación de Supabase mediante un *Trigger* (`handle_new_user`). Almacena datos públicos como el nombre, partido político, y si el usuario es un político oficial (`is_politician`).
2.  **`posts`**: Contiene las publicaciones principales ("Comentarios" en el muro).
    *   `author_id`: Referencia a `profiles(id)`.
    *   Campos: `text`, `media`, contadores (`likes`, `reposts`, `comment_count`), `topic` (almacenado parcialmente en frontend) y fecha de creación.
3.  **`comments`**: Almacena las respuestas a un `post` específico.
    *   `post_id`: Referencia al post. Si el post se borra, el comentario desaparece automáticamente (`ON DELETE CASCADE`).
    *   `author_id`: Referencia al perfil.
4.  **`saved_posts`**: Tabla pivote para gestionar la funcionalidad de "Guardar" publicaciones en el perfil. Relaciona `user_id` con `post_id`.
5.  **`post_reactions` y `post_reposts`**: Tablas pivote que registran qué usuario interactuó con qué post.

### 2.2. Seguridad (Row Level Security - RLS)

Todas las tablas tienen políticas RLS estrictas:
*   **`SELECT`**: Público. Todos los usuarios autenticados pueden leer posts, comentarios y reacciones.
*   **`INSERT` y `UPDATE`**: Limitado. Solo puedes insertar o editar filas donde tu identificador (`auth.uid()`) coincida con el `author_id` o `user_id` de la fila.

### 2.3. Resolviendo el Problema del Borrado en Cascada (RPCs)
Un problema común con las bases de datos SQL estrictas es que al intentar borrar un `post`, el comando `DELETE CASCADE` también intenta borrar los `comments` o `likes` asociados de *otros* usuarios. Las políticas RLS de esos hijos bloquean la acción (ya que no eres el dueño del like ajeno) y el borrado falla silenciosamente.

Para resolver esto, se crearon **Remote Procedure Calls (RPC)** en Supabase:
*   `delete_post(p_post_id uuid)`
*   `delete_comment(p_comment_id uuid)`

Estos RPCs se ejecutan con la directiva `SECURITY DEFINER`. Esto significa que la base de datos ignora el RLS temporalmente solo para ejecutar el borrado en cascada, verificando primero manualmente que el usuario que llama a la función (`auth.uid()`) sea realmente el creador del post.

---

## 3. Arquitectura del Frontend (`ComunidadView.jsx`)

El Frontend es un componente monolítico y robusto que consolida la navegación del Feed y de los Perfiles.

### 3.1. Gestión de Estados

El componente utiliza múltiples estados de React sincronizados con `localStorage` y Supabase:
*   **`posts`**: Arreglo maestro que contiene tanto los Posts reales extraídos de la base de datos como los *Posts Ficticios* (Mocks).
*   **`commentsData`**: Un diccionario de tipo `Record<postId, Comment[]>`. Los comentarios no se cargan todos a la vez para optimizar el rendimiento. Solo cuando el usuario hace clic en "Respuestas", se hace un `fetchComments(postId)` y se guarda en este estado (y en `localStorage`).
*   **`userReactions` / `savedPosts` / `following`**: Estados locales que manejan la interactividad. `following` se extrae de la DB al inicio, pero se actualiza optimísticamente.

### 3.2. El Sistema de Mock Bots (Simuladores de Debate)
Para evitar que la red social se vea vacía, el sistema inyecta publicaciones de "Bots" (ej. políticos ficticios debatiendo sobre Ambiente).
*   **Integración Fluida:** Los IDs de los bots inician con `mock_`.
*   **Intercepción:** Toda función del frontend (`handleReaction`, `handleAddComment`, `handleFollow`) verifica primero si el `postId` o el `targetId` comienza con `mock_`.
*   **Desvío de Lógica:** Si es un elemento mock, el Frontend **jamás** intenta contactar al backend. En su lugar, guarda la interacción (ej. tu comentario en un post ficticio) puramente en el `localStorage`.

### 3.3. Navegación: Feed vs Perfiles
La vista está controlada por el estado `view` (`{ type: 'feed' | 'profile', userId: ... }`).
*   **Feed:** Muestra la lista de posts (filtrados por "Para Ti" o "Recientes").
*   **Perfil:** Renderiza sub-pestañas:
    *   `Publicaciones`: Filtra el estado global `posts` buscando el `authorId`.
    *   `Respuestas`: Verifica el estado `commentsData` para encontrar en qué posts el usuario ha comentado.
    *   `Seguidos / Seguidores`: Extrae dinámicamente perfiles únicos de los posts existentes usando un `useMemo` y cruza esa lista con el arreglo local `following`.

### 3.4. Flujo de Publicación y Borrado
1.  **Publicar:** Al enviar texto, se llama a `supabase.from('posts').insert`. Si es exitoso, la función `fetchPosts()` vuelve a traer la lista fresca de la DB. Si falla (ej. sin conexión), la UI lanza un alert indicando el error.
2.  **Borrar:** Al hacer clic en el ícono de papelera (que solo aparece si `post.authorId === usuario actual`), se llama al RPC `supabase.rpc('delete_post')`.
    *   Si el RPC devuelve un error o no logra borrarlo, lanza un alert.
    *   Si el RPC es exitoso, el frontend ejecuta `setPosts(prev => prev.filter(p => p.id !== postId))`. El post desaparece del DOM instantáneamente sin requerir que la página se recargue.

---

## 4. Estrategia de CSS y UX
Todo el CSS está construido con clases utilitarias de Tailwind.
*   **Responsividad:** Se utilizan breakpoints (`lg:h-64`, `md:p-12`) para adaptar el Feed a pantallas móviles.
*   **Dark Mode Nativo:** Todo color tiene su equivalente oscuro usando el prefijo `dark:` (ej. `bg-white dark:bg-slate-800`).
*   **Micro-animaciones:** El acordeón de respuestas, el scroll y la navegación usan transiciones suaves (`transition-colors`, `animate-in fade-in duration-500`) que eliminan la sensación estática de una web tradicional, acercándola a una App nativa.
