<div align="center">

# ✦ NOVA

### *Tu país, tus datos, tu decisión.*

Plataforma cívica independiente para las elecciones de **Costa Rica 2026** 🇨🇷
Comparador electoral · Red social ciudadana · IA con fuentes oficiales

[![CI](https://github.com/josueazc/VoteOn2/actions/workflows/ci.yml/badge.svg)](https://github.com/josueazc/VoteOn2/actions)
[![License](https://img.shields.io/badge/proyecto-c%C3%ADvico-0B2F7E)](docs/GROWTH.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-bienvenidos-346538)](https://github.com/josueazc/VoteOn2/pulls)

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![PostHog](https://img.shields.io/badge/PostHog-1D4AFF?style=for-the-badge&logo=posthog&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

---

## 🗳️ ¿Qué es NOVA?

En época electoral, el problema no es la falta de información — es el exceso
sin contexto. NOVA toma los datos oficiales del TSE y la Asamblea Legislativa
y los convierte en herramientas que cualquier persona puede usar en 5 minutos:
comparar propuestas por tema, verificar afirmaciones con IA, y debatir en una
comunidad moderada. **Sin sesgos, sin pauta, sin partido.**

## ✨ Módulos

| | Módulo | Qué hace |
| --- | --- | --- |
| ⚖️ | **Comparador político** | 7 temas, frente a frente entre partidos, mapa ideológico interactivo y análisis comparativo con IA |
| 💬 | **Comunidad (DebateCR)** | Posts, hashtags, tendencias, seguidores, guardados, perfiles verificados y moderación IA pre-publicación |
| 🤖 | **Asistente IA** | Chatbot estricto basado en documentos (PDF/TXT) y fuentes oficiales; multilingüe |
| 🔍 | **Fact-checking** | Veredicto en 6 niveles con barra de confianza y fuentes sugeridas |
| 🧭 | **Test de afinidad** | Brújula ideológica con temas de actualidad |
| 🏛️ | **La Asamblea** | Votaciones, asistencias y proyectos de ley |
| 📊 | **Participación** | Métricas abiertas por provincia, exportar CSV/PDF |
| 🔔 | **Notificaciones** | Generadas por el servidor (triggers), con filtros |

## 🏗️ Arquitectura

```mermaid
flowchart LR
    subgraph Cliente["🖥️ SPA React 19 + Vite"]
        UI[Design system<br/>tokens claro/oscuro] --> Shell[AppShell<br/>hash router + i18n es/en]
        Shell --> Vistas[12 vistas<br/>lazy-loaded]
        Vistas --> Servicios[Capa de servicios]
    end
    Servicios -->|REST| Gemini["✨ Google Gemini<br/>asistente · moderación · fact-check"]
    Servicios -->|SDK| Supa["⚡ Supabase<br/>PostgreSQL + RLS · Auth · Storage"]
    Supa --> Triggers["Triggers: contadores atómicos,<br/>notificaciones, auto-ocultar reportados"]
    Servicios -.->|opcional| Obs["📈 PostHog · Sentry"]
```

**Principios:** los componentes nunca hablan con Supabase directamente (capa
de servicios) · los datos electorales viven en [`src/data/`](src/data/)
editables sin tocar UI · los contadores los mantiene el servidor · la IA
degrada con gracia sin API key.

## 🚀 Empezar

```bash
git clone https://github.com/josueazc/VoteOn2.git
cd VoteOn2
npm install
cp .env.example .env   # completa Supabase y Gemini
npm run dev
```

1. 🗄️ Crea un proyecto en [Supabase](https://supabase.com) y ejecuta
   [`supabase/migrations/00_init.sql`](supabase/migrations/00_init.sql)
   → guía completa en [supabase/README.md](supabase/README.md)
2. 📦 Crea el bucket público `comunidad_media` en Storage
3. 🔑 Consigue tu API key en [Google AI Studio](https://aistudio.google.com/apikey)

```bash
npm test         # 29 tests (Vitest + RTL)
npm run build    # bundle inicial ~255 kB gracias al code splitting
```

## ☁️ Despliegue

SPA estática: funciona out-of-the-box en **Vercel** o **Netlify**
(framework Vite, build `npm run build`, output `dist`, variables `VITE_*`
en el panel). CI corre tests + build en cada push.

## ⛓️ Roadmap Web3 (explorando)

NOVA es una plataforma de *confianza pública* — exactamente el problema que
blockchain resuelve bien cuando se usa con criterio. Ideas en evaluación:

- **Anclaje de integridad:** hash de cada fact-check y snapshot del comparador
  anclado on-chain → cualquiera puede auditar que no se editó después.
- **Insignias soulbound:** verificación de candidatos y embajadores como
  tokens intransferibles.
- **Sondeos resistentes a manipulación:** consultas comunitarias con
  commit-reveal o pruebas zk (no elecciones reales — eso es del TSE).
- **Transparencia de fondos:** donaciones en cripto con libro público.

Detalle y trade-offs en la sección Web3 de [docs/GROWTH.md](docs/GROWTH.md).

## 🤝 Neutralidad

NOVA **no recomienda votar por ningún partido**. Los resúmenes del comparador
son síntesis editoriales neutrales marcadas como tales; las posiciones
ideológicas son estimaciones educativas. Consulta siempre los planes oficiales
en el [TSE](https://www.tse.go.cr) antes de decidir tu voto.

## 🧑‍💻 Contribuir

Issues y PRs bienvenidos — corre `npm test` antes de enviar.
Plan de crecimiento y decisiones abiertas: [docs/GROWTH.md](docs/GROWTH.md).

<div align="center">
<sub><strong>Libertad · Justicia · Pura Vida</strong> — hecho en Costa Rica 🇨🇷</sub>
</div>
