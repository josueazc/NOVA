// Datos generales del proceso electoral CR 2026.
// Mantener aquí (no en componentes) para actualizar sin tocar código de UI.

export const ELECTION = {
  year: 2026,
  firstRound: '2026-02-01T06:00:00-06:00',
  runoff: '2026-04-05T06:00:00-06:00',
  registeredVoters: 3565952, // padrón TSE
  parties: 32,
  deputies: 57,
  provinces: 7,
};

export const daysUntil = (iso) => {
  const target = new Date(iso).getTime();
  return Math.ceil((target - Date.now()) / 86400000);
};

// Etapa actual del proceso según la fecha del sistema
export const electionStage = () => {
  const toFirst = daysUntil(ELECTION.firstRound);
  const toRunoff = daysUntil(ELECTION.runoff);
  if (toFirst > 0) return { stage: 'pre', label: `${toFirst} días para la primera ronda`, days: toFirst };
  if (toRunoff > 0) return { stage: 'between', label: `${toRunoff} días para la segunda ronda`, days: toRunoff };
  return { stage: 'post', label: 'Proceso electoral 2026 concluido', days: 0 };
};
