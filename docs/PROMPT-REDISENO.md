# Prompt para la próxima sesión (rediseño NOVA)

> Copiar/pegar este prompt completo, o decirle al agente:
> "lee docs/PROMPT-REDISENO.md y ejecútalo".

---

Trabaja en este repo (NOVA, ex-VoteOn). Antes de tocar nada, corre la app
(`npm run dev`), revisa la consola del navegador y el tab de red para
diagnosticar los problemas reportados. Haz commits pequeños y push al final.

## 1. UNA SOLA identidad visual (lo más importante)

Hoy conviven dos estéticas: las vistas viejas (Partidos, Planes, Asamblea,
Test, Chatbot, Documentación, Abstencionismo) y las nuevas (Home, Comparador,
Comunidad, Notificaciones, Participación, Config, Auth). Quiero UNA sola:

- **Colores: los originales de VoteOn.** Azul `#002B7F` como color principal
  (no como acento tímido) y rojo `#EF1C24` para CTAs y énfasis. Actualiza los
  design tokens en `src/styles.css` y `tailwind.config.js` — mantén la
  arquitectura de tokens y el modo oscuro, solo cambia los valores para que
  la paleta sea la de la bandera: azul protagonista, rojo con energía, blanco.
- **Tipografía: ELIMINA la serif italic (Instrument Serif).** Nada de
  cursivas. Usa sans-serif contundente como el diseño original:
  `font-black`, `tracking-tighter`, mayúsculas con tracking amplio en
  kickers. Quita Instrument Serif de index.html y de la clase `font-serif`
  en todos los componentes (wordmark, títulos de vistas, AuthScreen).
- **Energía: la UI actual es aburrida y triste.** El diseño original tenía
  vida: bordes redondeados generosos (rounded-2xl/3xl), sombras con
  presencia, fondos decorativos con gradientes azul/rojo sutiles, iconos
  con contenedores de color, hover con rotación/escala. Recupera esa
  personalidad sobre el sistema de componentes actual (Button, Card, Badge,
  etc. en `src/components/ui/`) — actualiza esos componentes UNA vez y
  todas las vistas heredan.
- Pasa TODAS las vistas (viejas y nuevas) por la misma identidad. Criterio
  de éxito: un usuario no puede adivinar qué vista se hizo en qué época.

## 2. Landing: la anterior estaba mejor

Restaura el espíritu de la landing original (está en git:
`git show e2d9d74:src/components/dashboard/Dashboard.jsx`):

- Hero "Tu país, Tus datos, Tu decisión." con tipografía gigante font-black
  y el **sistema orbital animado** (57 Diputados / 3.5M Electores / +120
  Proyectos girando alrededor del círculo Monitor Nacional).
- Fila de stats (Partidos inscritos, Diputados, Proyectos, Días para
  elección).
- Los 4 pilares grandes clicables (Test, Asamblea, Planes, Partidos).
- Sección de noticias con imágenes y sección de educación cívica con el
  "Dato del día" en tarjeta azul.
- Mantén el routing por hash y el AppShell actuales; es el CONTENIDO y la
  estética del home lo que vuelve, no el viejo navbar.

## 3. Arreglar la IA (no responde ninguna)

- Diagnostica primero: con la key de `.env`, prueba
  `curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$VITE_GEMINI_API_KEY" -H 'Content-Type: application/json' -d '{"contents":[{"parts":[{"text":"hola"}]}]}'`
  y revisa el error real (key inválida, cuota, modelo, restricción de
  referrer). Revisa también la consola del navegador al usar el chatbot.
- Agrega **Anthropic Claude como proveedor alternativo** en
  `src/services/ai.js`: variable `VITE_AI_PROVIDER=gemini|anthropic` +
  `VITE_ANTHROPIC_API_KEY`. Para llamadas desde el navegador usa el header
  `anthropic-dangerous-direct-browser-access: true` contra
  `https://api.anthropic.com/v1/messages` (modelo `claude-haiku-4-5-20251001`
  para moderación/resúmenes baratos y `claude-sonnet-4-6` para el asistente).
  Deja la interfaz de funciones igual (askElectoralAssistant, moderateContent,
  factCheck, etc.) para que ninguna vista cambie.
- Nota: exponer keys en el cliente es aceptable solo en dev; deja un TODO
  para moverlo a Supabase Edge Function en producción.

## 4. Comparador: no se entiende

Rediseñarlo para alguien sin formación política:

- Explica los ejes en lenguaje humano ANTES del gráfico ("← más inversión
  estatal | más participación privada →") con un párrafo de una línea.
- El stance chart necesita leyenda y tooltips al hover con la propuesta.
- El mapa ideológico necesita una explicación de qué significan los
  cuadrantes, con ejemplos.
- Agrega un "modo simple" por defecto: pregunta guiada ("¿Qué tema te
  importa?") → muestra 3 tarjetas comparadas en texto plano; el modo
  avanzado (gráficos) detrás de un toggle.

## 5. Vista de Partidos: arreglarla + datos reales 2026

- `src/data/partidosData.jsx`: actualiza a los partidos REALES de las
  elecciones 2026 con su candidato presidencial, fundación, ideología,
  diputados actuales e historia: PLN (Álvaro Ramos), Pueblo Soberano
  (Laura Fernández), Nueva República (Fabricio Alvarado), Frente Amplio
  (Ariel Robles), PUSC (Juan Carlos Hidalgo), PLP (Eliécer Feinzaig),
  PIN (Luis Amador), Agenda Ciudadana (Claudia Dobles) y los demás
  inscritos ante el TSE. Verifica los datos contra fuentes (los candidatos
  ya están en `src/data/elections2026.js`).
- **PartyProfile (la vista al hacer click en un partido) se ve rara:**
  ábrela en el navegador, identifica qué está roto (layout, imágenes,
  overflow) y rediséñala con la identidad única.

## 6. Comunidad y Métricas: nada carga

El código está bien pero no carga datos. Diagnostica en orden:

1. ¿Se ejecutó `supabase/migrations/00_init.sql` en el proyecto Supabase?
   (Las tablas nuevas: notifications, reports, fact_checks, RPCs
   trending_hashtags y participation_by_province no existen si no.)
   Pide al usuario ejecutarla si falta — sin eso nada carga.
2. Revisa el tab de red: errores 404 (tabla/RPC no existe), 401/403 (RLS),
   o CORS. Arregla lo que sea de código.
3. Mejora los estados de error: si una tabla no existe, la UI debe decir
   "Falta ejecutar la migración en Supabase" en vez de quedarse en blanco.

## 7. Que las cosas SIRVAN y tengan info REAL

Regla general para toda la sesión: nada de placeholders, mocks visibles ni
"En construcción". Cada vista debe funcionar de punta a punta con datos
reales o, si dependen de Supabase y no está configurado, decir exactamente
qué falta. Prioriza arreglar lo roto sobre agregar cosas nuevas.

- Verifica módulo por módulo en el navegador (home, partidos, perfil de
  partido, planes, asamblea, comparador, comunidad, chat IA, test,
  notificaciones, participación, config, abstencionismo) y arregla todo lo
  que no responda, no cargue o se vea quebrado.
- Las noticias del home original eran mock con fotos de Unsplash: o se
  reemplazan con contenido real/útil (ej. hitos del calendario electoral de
  `src/data/elections2026.js`) o se elimina la sección.
- No reescribas los componentes del design system desde cero: TOMA los
  componentes existentes (`src/components/ui/`) y MEJÓRALOS — misma API,
  mejor estética. Así todas las vistas heredan la nueva identidad sin
  romperse.

## Reglas

- Commits pequeños y descriptivos, push al final de todo.
- `npm test` y `npm run build` verdes antes de cada commit.
- No rompas funcionalidad existente; no toques la URL del repo.
- Nada de Docker/Azure (ya se eliminó; no lo reintroduzcas).
