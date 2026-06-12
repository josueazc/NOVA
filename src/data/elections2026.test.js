import { describe, expect, it } from 'vitest';
import { PROPOSALS_2026, TOPICS, IDEOLOGY_2026, CANDIDATES_2026 } from './elections2026';

// Integridad de la capa de datos: si alguien edita los datos y rompe una
// referencia, estos tests lo detectan antes de llegar a la UI.
describe('elections2026 data integrity', () => {
  const topicIds = TOPICS.map((t) => t.id);
  const partyIds = Object.keys(IDEOLOGY_2026);

  it('cada propuesta referencia un tema válido', () => {
    PROPOSALS_2026.forEach((p) => {
      expect(topicIds).toContain(p.topic);
    });
  });

  it('cada propuesta referencia un partido con ideología registrada', () => {
    PROPOSALS_2026.forEach((p) => {
      expect(partyIds).toContain(p.partyId);
    });
  });

  it('los stance scores están en el rango [-10, 10]', () => {
    PROPOSALS_2026.forEach((p) => {
      expect(p.stance).toBeGreaterThanOrEqual(-10);
      expect(p.stance).toBeLessThanOrEqual(10);
    });
  });

  it('cada partido cubre los 7 temas', () => {
    partyIds.forEach((partyId) => {
      const topics = PROPOSALS_2026.filter((p) => p.partyId === partyId).map((p) => p.topic);
      expect(new Set(topics).size).toBe(TOPICS.length);
    });
  });

  it('las candidaturas apuntan a partidos registrados', () => {
    CANDIDATES_2026.forEach((c) => {
      expect(partyIds).toContain(c.partyId);
    });
  });
});
