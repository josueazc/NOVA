# 🚀 Hoja de Ruta Futura (Roadmap) - VoteOn Costa Rica

Este documento recopila las ideas arquitectónicas y funcionales de alto impacto planteadas para expandir la plataforma "VoteOn" más allá de su versión inicial, apuntando a un producto *CivicTech* de producción a nivel nacional.

## 1. 🔍 Módulo de "Fact-Checking" (Detector de Fake News)
*   **Concepto:** Un espacio donde los usuarios pueden pegar enlaces o textos sospechosos (ej. cadenas de WhatsApp).
*   **Ejecución Técnica:** Utilizar Gemini AI con un *prompt* estricto y un contexto de bases de datos verificadas o medios oficiales para determinar la veracidad de la noticia y explicar por qué es falsa o engañosa.

## 2. 🏆 Gamificación Cívica
*   **Concepto:** Sistema de recompensas y niveles en el módulo Comunidad.
*   **Ejecución Técnica:** 
    *   Agregar columnas de `puntos` y `nivel` a la tabla `profiles` en Supabase.
    *   Ganar medallas (ej. "Ciudadano Informado", "Analista") por completar hitos: leer 3 planes de gobierno, terminar el test político, o mantener discusiones sin reportes de moderación.

## 3. 📡 Conexión a Datos en Tiempo Real (API TSE y SIL)
*   **Concepto:** Reemplazar los datos *mockeados* por información oficial en vivo (votaciones de diputados, donantes de partidos).
*   **Ejecución Técnica:**
    *   **Extracción Automática:** Un *script* (Python/Node.js) con Puppeteer/Cheerio extrae datos diariamente del Sistema de Información Legislativa (SIL) y el Tribunal Supremo de Elecciones (TSE).
    *   **Supabase Cron Jobs:** Ejecutan el script cada madrugada y guardan los datos en nuevas tablas (ej. `votaciones_asamblea`, `donantes`).
    *   **Frontend:** React consume los datos frescos de Supabase en vez de los archivos estáticos.

## 4. 📢 Alertas y Notificaciones Push / Email
*   **Concepto:** Avisar al ciudadano cuando haya un nuevo proyecto de ley o evento relacionado con sus intereses y su provincia.
*   **Ejecución Técnica:**
    *   **Preferencias:** Tabla `user_preferences` (intereses como "Seguridad", "Ambiente" y región).
    *   **Database Webhooks:** Un trigger en Supabase detecta inserciones de nuevas leyes/noticias.
    *   **Envío de Correos:** Supabase Edge Functions llama a la API de **Resend** (o SendGrid) para enviar un correo HTML filtrando a los perfiles interesados.
    *   **Campanita In-App:** Tabla `notifications` leída por el Navbar de React para alertas en vivo.

## 5. 🗣️ Accesibilidad Avanzada (Text-to-Speech)
*   **Concepto:** Opción para escuchar el análisis de planes de gobierno y las respuestas del chatbot.
*   **Ejecución Técnica:** Integrar la Web Speech API nativa del navegador o servicios como ElevenLabs para generar audio en español natural. Ayuda a adultos mayores y personas con discapacidad visual.

## 6. 📝 "Tracker" de Promesas de Campaña
*   **Concepto:** Línea de tiempo visual en el perfil del partido/candidato que rastrea promesas.
*   **Ejecución Técnica:** Almacenar en una tabla `promesas` las propuestas extraídas por la IA. En el futuro, un moderador o algoritmo marca el estatus (Cumplida, En Progreso, Rota) para visualizarlas en un termómetro de confiabilidad.

## 7. 🗺️ Mapeo Ciudadano de Problemas (Geo-Reportes)
*   **Concepto:** Mapa interactivo en "Comunidad" para reportar fallas de infraestructura o seguridad por cantón.
*   **Ejecución Técnica:**
    *   Integración con Mapbox GL JS o Google Maps.
    *   Ciudadanos colocan un "pin". Los perfiles políticos pueden responder oficialmente a esos "pins" con propuestas de acción.

---
*Documento vivo para futuras iteraciones y desarrollo de la plataforma.*
