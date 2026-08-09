// ============================================================================
// Base de conocimiento para el Asistente IA — se construye A PARTIR de los
// datos electorales ya curados (elections2026.js, partidosData.jsx,
// electionInfo.js). NO se duplican hechos aquí: si cambia un candidato o una
// propuesta en la capa de datos, esta base se actualiza sola.
// ----------------------------------------------------------------------------
// Uso: se inyecta como contexto autoritativo en el system prompt del chatbot
// para que pueda responder sobre las elecciones CR 2026.
// ============================================================================

import { ELECTION } from './electionInfo';
import {
  ELECTORAL_CALENDAR,
  CANDIDATES_2026,
  TOPICS,
  PROPOSALS_2026,
  candidateByParty,
} from './elections2026';
import { partidosData } from './partidosData';

// --------------------------- Marco cívico general ---------------------------
// Contenido de referencia sobre el sistema político costarricense (estable).
const CR_POLITICS_KB = `# 🇨🇷 SISTEMA POLÍTICO DE COSTA RICA

Costa Rica es una república democrática, representativa y participativa, con separación de poderes:
- Poder Ejecutivo (Presidente/a y ministros).
- Poder Legislativo (57 diputaciones en la Asamblea Legislativa).
- Poder Judicial (Corte Suprema de Justicia).
El Tribunal Supremo de Elecciones (TSE) es el órgano independiente que organiza y garantiza elecciones libres y transparentes.

## Elecciones
Se realizan cada 4 años. Se elige Presidente/a, dos Vicepresidencias y 57 diputaciones (por provincia: San José, Alajuela, Cartago, Heredia, Guanacaste, Puntarenas y Limón). Las elecciones municipales son en fecha separada.
Si ninguna fórmula presidencial supera el 40 % de los votos válidos en primera ronda, hay segunda ronda (balotaje) entre las dos más votadas.

## Asamblea Legislativa
Crea, reforma y deroga leyes; controla al Ejecutivo; aprueba el presupuesto nacional; ratifica tratados. En la práctica ningún partido suele tener mayoría absoluta, por lo que se requieren alianzas para aprobar leyes.

## Formación de una ley
1) Presentación del proyecto → 2) análisis en comisión → 3) dictamen → 4) discusión en plenario → 5) votación → 6) aprobación o rechazo → 7) firma o veto del Ejecutivo.

## Ideologías (simplificado)
- Izquierda: mayor intervención del Estado, énfasis social.
- Derecha: menor intervención estatal, énfasis en el mercado.
- Centro: equilibrio entre ambos enfoques.

## Estado social y control
Costa Rica tiene un fuerte Estado social: educación pública, salud universal (CCSS) y programas sociales. La Contraloría General de la República y la Defensoría de los Habitantes supervisan el uso de recursos públicos y los derechos ciudadanos. Los partidos se financian con deuda política (financiamiento estatal) y donaciones privadas reguladas.

## Retos actuales
Desconfianza en partidos tradicionales, fragmentación política, dificultad para aprobar leyes, casos de corrupción y abstencionismo electoral.`;

const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00-06:00').toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// --------------------- Constructor de la base 2026 --------------------------
export function buildElection2026Knowledge() {
  const calendar = ELECTORAL_CALENDAR.map(
    (e) => `- ${fmtDate(e.date)}: ${e.label}`
  ).join('\n');

  const candidatesList = CANDIDATES_2026.map((c) => {
    const party = partidosData[c.partyId];
    const partyName = party ? `${party.nombre} (${party.siglas})` : c.partyId;
    return `- ${c.name} — ${partyName}. ${c.background}`;
  }).join('\n');

  const parties = Object.values(partidosData)
    .map((p) => {
      const cand = candidateByParty(p.id);
      const proposals = PROPOSALS_2026.filter((pr) => pr.partyId === p.id)
        .map((pr) => {
          const topic = TOPICS.find((t) => t.id === pr.topic);
          return `    - ${topic ? topic.label : pr.topic}: ${pr.title} — ${pr.summary}`;
        })
        .join('\n');
      return `### ${p.nombre} (${p.siglas})
- Candidatura presidencial 2026: ${cand ? cand.name : 'No registrada'}${cand ? ` — ${cand.background}` : ''}
- Diputaciones actuales (periodo 2022-2026): ${p.diputadosActuales}
- Fundación: ${p.fundacion}
- Lema: "${p.lema}"
- Perfil: ${p.historiaTexto}
- Propuestas 2026 por tema:
${proposals || '    - (sin propuestas registradas)'}`;
    })
    .join('\n\n');

  return `# 🗳️ ELECCIONES COSTA RICA 2026 (datos de la plataforma NOVA)

## Datos generales del proceso
- Primera ronda (presidencia y 57 diputaciones): ${fmtDate('2026-02-01')}.
- Segunda ronda presidencial (si aplica): ${fmtDate('2026-04-05')}.
- Padrón electoral: ${ELECTION.registeredVoters.toLocaleString('es-CR')} personas.
- Partidos inscritos: ${ELECTION.parties}. Provincias: ${ELECTION.provinces}. Diputaciones: ${ELECTION.deputies}.

## Calendario electoral (TSE)
${calendar}

## Candidaturas presidenciales inscritas
${candidatesList}

## Partidos y propuestas
${parties}

## Nota de neutralidad
Los resúmenes de propuestas son síntesis editoriales neutrales de los planes de gobierno; las posiciones ideológicas son estimaciones educativas. NOVA no recomienda votar por ningún partido. Fuente oficial de referencia: Tribunal Supremo de Elecciones (tse.go.cr).`;
}

// Base combinada lista para inyectar en el system prompt del asistente.
export const ELECTION_KNOWLEDGE = `${CR_POLITICS_KB}\n\n---\n\n${buildElection2026Knowledge()}`;
