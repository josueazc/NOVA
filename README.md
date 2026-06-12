# VoteOn — Costa Rica Informada

Plataforma cívica independiente para las elecciones de Costa Rica 2026.
Compara propuestas políticas por tema, debate en una comunidad moderada con IA
y consulta datos con fuentes oficiales del TSE — sin sesgos partidarios.

**Tu país, tus datos, tu decisión.**

## Módulos

| Módulo | Qué hace |
| --- | --- |
| **Comparador político** | 7 temas (educación, salud, economía, seguridad, ambiente, tecnología, derechos), frente a frente entre partidos, mapa ideológico SVG y análisis comparativo con IA |
| **Comunidad (DebateCR)** | Red social ciudadana: posts, hashtags, tendencias, seguidores, guardados, reacciones, perfiles verificados, moderación IA pre-publicación y sistema de reportes |
| **Asistente IA** | Chatbot estricto basado en documentos (PDF/TXT) y base de conocimiento cívica; responde en el idioma del usuario |
| **Fact-checking** | Verificación de afirmaciones en posts con veredicto, nivel de confianza y fuentes sugeridas |
| **Test de afinidad** | Brújula ideológica con temas de actualidad |
| **La Asamblea** | Votaciones, asistencias y proyectos de ley |
| **Participación** | Dashboard ciudadano: métricas abiertas por provincia, temas más discutidos, exportar CSV/PDF |
| **Notificaciones** | Generadas por el servidor (comentarios, likes, follows) con filtros |

## Stack

- **Frontend:** React 19 + Vite, Tailwind CSS con design tokens (claro/oscuro), routing por hash sin dependencias, i18n es/en
- **Backend:** Supabase (PostgreSQL + RLS, Auth, Storage) — contadores atómicos y notificaciones por triggers
- **IA:** Google Gemini (REST) — asistente, moderación, fact-check, resúmenes y comparación
- **Observabilidad:** PostHog + Sentry (opcionales por env) + analytics propio en Supabase
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions + Docker (nginx)

## Empezar

```bash
git clone https://github.com/josueazc/VoteOn2.git
cd VoteOn2
npm install
cp .env.example .env   # completa Supabase y Gemini
npm run dev
```

1. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta
   [`supabase/migrations/00_init.sql`](supabase/migrations/00_init.sql)
   (instrucciones completas en [supabase/README.md](supabase/README.md)).
2. Crea el bucket público `comunidad_media` en Storage.
3. Consigue una API key de [Google AI Studio](https://aistudio.google.com/apikey).

```bash
npm test         # suite de Vitest
npm run build    # build de producción
```

## Despliegue

Tres rutas documentadas en [DEPLOYMENT.md](DEPLOYMENT.md): Azure Static Web
Apps, Docker (Azure Container Apps / cualquier nube) o Vercel/Netlify.

## Arquitectura

```
src/
├── components/
│   ├── ui/            # design system: Button, Card, Modal, Toast, Skeleton…
│   ├── layout/        # AppShell (nav, footer), ErrorBoundary
│   ├── auth/          # AuthScreen
│   └── dashboard/     # un directorio por módulo (comunidad, comparador…)
├── services/          # ai, community, notifications, analytics — única puerta a APIs
├── data/              # capa de datos electoral (editable sin tocar UI)
├── contexts/          # ThemeContext
├── i18n/              # es/en + provider
├── hooks/ utils/ config/
└── test/
supabase/migrations/   # esquema consolidado idempotente
docs/GROWTH.md         # plan de crecimiento AARRR
```

Principios: los componentes no hablan con Supabase directamente (capa de
servicios), los datos electorales viven fuera de la UI, los contadores los
mantiene el servidor, y la IA degrada con gracia si no hay API key.

## Neutralidad

VoteOn no recomienda votar por ningún partido. Los resúmenes del comparador
son síntesis editoriales neutrales y están marcados como tales; las posiciones
ideológicas son estimaciones educativas. Consulta siempre los planes oficiales
en el [TSE](https://www.tse.go.cr) antes de decidir tu voto.

## Contribuir

Issues y PRs bienvenidos. Corre `npm test` antes de enviar. El plan de
crecimiento y las decisiones abiertas están en [docs/GROWTH.md](docs/GROWTH.md).
