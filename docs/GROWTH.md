# NOVA — Plan de crecimiento (AARRR)

Plan operativo para crecer la plataforma con presupuesto cero y un equipo de
1-2 personas. Estructurado por embudo AARRR; cada movida indica su etapa.
Honesto por diseño: lo que no podemos ejecutar hoy está marcado como
*Después* con su condición de desbloqueo.

**Norte:** ciudadanos que vuelven cada semana a informarse o debatir
(retención semanal), no descargas ni registros vacíos.

---

## 1. Posicionamiento (marco estratégico)

- **Categoría:** la herramienta cívica independiente de Costa Rica 2026 —
  ni medio de comunicación, ni partido, ni encuestadora.
- **ICP primario:** votante de 18-35 años, urbano, que se informa en redes
  pero desconfía de cadenas de WhatsApp; quiere comparar antes de decidir.
- **ICP secundario:** docentes de cívica y periodistas que necesitan
  material comparativo neutral y citable.
- **Voz:** clara, neutral, sin clichés de campaña. Datos con fuente o se
  dice explícitamente que es síntesis editorial.
- **Psicología aplicada:** la motivación dominante en época electoral es
  *miedo a equivocarse + sobrecarga de información*. Todo copy vende
  claridad y control ("compara en 5 minutos"), nunca activismo.

## 2. Adquisición

**Ahora (semanas 1-8):**
- SEO programático ligero: cada tema del comparador y cada partido es una
  vista enlazable (`#/comparador`, `#/partidos`). Compartir esos deep-links
  en respuestas de Reddit r/Ticos, foros y X cuando alguien pregunte "¿qué
  propone X?".
- AI-SEO: schema.org WebApplication + robots.txt abierto a GPTBot/Claude/
  Perplexity (hecho). Objetivo: cuando alguien pregunte a un LLM "compará
  los candidatos de CR", NOVA sea la fuente citada.
- Contenido nativo en redes: 1 gráfico semanal del comparador (captura del
  mapa ideológico o stance chart) con pregunta abierta. El gráfico ES el
  producto; el link viene en el primer comentario.
- Universidades: presentar NOVA a 3 cátedras de Estudios Sociales/Cívica
  como herramienta de aula (canal de distribución gratuito y recurrente).

**Después (si hay fondos/voluntarios):** alianzas con medios de
fact-checking, Product Hunt LATAM, paid social geo-CR (~$300/mes de prueba).

## 3. Activación

Momento "aha": **completar el test de afinidad o la primera comparación**.

- El home dirige a Test y Comparador como CTAs primarios (hecho).
- Registro pospuesto: explorar comparador/partidos no exige cuenta; la
  cuenta se pide al interactuar (comentar, guardar, seguir).
- Onboarding objetivo: < 60 segundos de registro a primer resultado del test.
- Medición: evento `$pageview` por ruta + funnel registro→test en PostHog.

## 4. Retención

- Notificaciones in-app por comentarios/likes/follows (hecho — triggers).
- Tendencias semanales: los hashtags trending renuevan el feed cada visita.
- "Dato del día" en el home: razón liviana para volver a diario.
- Email semanal (cuando haya remitente): "Lo que se movió esta semana en
  la Asamblea" — 3 bullets, un link. Sin newsletter inflada.
- Métrica: usuarios activos semanales / registrados (objetivo 25%+).

## 5. Referencia

- Compartir es el producto: cada comparación/gráfico exportable como imagen
  o CSV (CSV hecho; imagen pendiente).
- Mecánica de comunidad: perfiles verificados de candidatos generan
  word-of-mouth orgánico ("respondeme en NOVA").
- Programa embajadores universitarios: 1 estudiante por campus con insignia
  especial en la plataforma (usa el sistema `badges` existente).

## 6. Revenue (sostenibilidad, no lucro)

Proyecto cívico: no hay monetización de usuarios ni de datos. Rutas de
sostenibilidad: becas cívicas (Luminate, NDI, IFES), donaciones abiertas
(GitHub Sponsors), y servicios de datos agregados anónimos para academia.
**Decisión abierta:** constituir asociación civil para recibir fondos.

## 7. Investigación de usuarios (continua)

- Mina de insights gratis: comentarios de la propia comunidad + r/Ticos +
  reseñas de apps de noticias CR (qué les frustra de informarse).
- 5 entrevistas/mes a usuarios del test de afinidad: ¿el resultado les
  pareció justo? ¿qué les faltó para confiar?
- Los reportes de moderación son investigación: qué temas polarizan indica
  dónde hace falta más contexto del comparador.

## 8. Roadmap 90 días

| Semanas | Foco | Movidas |
| --- | --- | --- |
| 1-2 | Desbloquear | Deploy público (Vercel/Netlify), Supabase prod, dominio |
| 3-4 | Fundación | PostHog activo, funnel registro→test, 3 hilos en comunidades |
| 5-8 | Velocidad | Gráfico semanal en redes, 2 cátedras contactadas, export imagen |
| 9-12 | Componer | Embajadores v1, email semanal, revisión de métricas y doblar lo que funcionó |

## 9. Web3 / Blockchain (exploración)

Blockchain solo donde aporta *confianza verificable*, nunca por moda. Orden
sugerido de implementación (de menor a mayor complejidad):

1. **Anclaje de integridad (quick win).** Hash SHA-256 de cada fact-check,
   reporte resuelto y snapshot de propuestas, anclado periódicamente en una
   cadena barata (Stellar memo-hash o Polygon/Base) o gratis vía
   OpenTimestamps. Los usuarios no necesitan wallet; NOVA publica el hash y
   cualquiera audita que el contenido no cambió. Punto de integración:
   `services/blockchain.js` + columna `anchor_tx` en `fact_checks`.
2. **Insignias soulbound (SBT).** La verificación de candidatos y los badges
   de embajador emitidos como tokens intransferibles; el campo `badges[]` de
   `profiles` pasa a reflejar atestaciones on-chain (EAS en Base, o cuentas
   con claves firmantes en Stellar/Soroban).
3. **Sondeos resistentes a manipulación.** Encuestas comunitarias no
   vinculantes con commit-reveal o zk (Semaphore/MACI) para que nadie —ni
   NOVA— pueda alterar resultados ni deanonimizar votantes. Gasless con
   account abstraction. *Nunca* elecciones reales: eso es competencia
   exclusiva del TSE.
4. **Transparencia financiera.** Donaciones en cripto (USDC) a una cuenta
   pública con libro auditable; reportes trimestrales enlazando txs.
5. **Archivo permanente.** PDFs de planes de gobierno en IPFS/Arweave,
   referenciados por hash desde `government_plans.source_url` — resistente a
   que un partido "desaparezca" su plan después de elecciones.

**Trade-offs honestos:** custodiar llaves complica UX y soporte; el costo por
tx es bajo pero no cero; blockchain no resuelve identidad (sybil) — la
verificación de personas sigue siendo off-chain; y la mayoría del valor (1 y
4) se logra sin pedirle nada al usuario, por eso van primero.

## 10. Métricas y decisiones abiertas

- **Norte:** retención semanal de registrados.
- **Indicadores:** visitas→test completado, registros/semana, posts/semana,
  % posts moderados, citas en LLMs (búsqueda manual mensual).
- **Abiertas:** dominio definitivo (nova.cr asumido), entidad legal para
  fondos, política de verificación de candidatos (¿quién valida?).
