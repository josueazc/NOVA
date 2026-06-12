# Base de datos — VoteOn

## Setup

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre **SQL Editor** y ejecuta [`migrations/00_init.sql`](migrations/00_init.sql) completo.
   El script es idempotente: puedes re-ejecutarlo sin perder datos.
3. En **Storage**, crea un bucket público llamado `comunidad_media` (límite sugerido 5 MB).
4. En **Authentication → Email Templates**, pega [`email_template.html`](email_template.html) si quieres el correo de bienvenida personalizado.
5. Copia la URL y la anon key del proyecto a tu `.env` (ver `.env.example`).

## Modelo de datos

| Dominio | Tablas |
| --- | --- |
| Identidad | `profiles` (trust_score, verificación, intereses, provincia) |
| Red social | `posts`, `comments`, `post_reactions`, `post_reposts`, `followers`, `saved_posts` |
| Política | `parties`, `politicians`, `government_plans`, `proposals` |
| Moderación | `reports`, `fact_checks` |
| Producto | `notifications`, `analytics_events` |

### Decisiones de diseño

- **Contadores atómicos:** `likes`, `dislikes`, `reposts`, `comment_count`,
  `followers_count` los mantienen triggers en el servidor. El cliente nunca
  escribe contadores (evita condiciones de carrera y manipulación).
- **Notificaciones automáticas:** triggers sobre comentarios, likes y follows
  insertan en `notifications`; el cliente solo lee y marca como leído.
- **Moderación:** 5 reportes ocultan un post automáticamente (`is_hidden`).
  La evaluación IA se guarda en `reports.ai_assessment`.
- **RLS en todo:** cada tabla tiene Row Level Security; los catálogos
  políticos son de solo lectura para clientes (se administran con
  `service_role`).
- **RPCs:** `delete_post`, `delete_comment`, `delete_user`,
  `trending_hashtags`, `participation_by_province`, `recalc_trust_score`.
