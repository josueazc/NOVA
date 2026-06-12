import { describe, expect, it } from 'vitest';
import { ROUTES, routeFromHash, hashFromRoute, DEFAULT_ROUTE } from './routes';

describe('routes', () => {
  it('todos los ids y hashes son únicos', () => {
    const ids = ROUTES.map((r) => r.id);
    const hashes = ROUTES.map((r) => r.hash);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it('routeFromHash y hashFromRoute son inversas', () => {
    ROUTES.forEach((r) => {
      expect(routeFromHash(hashFromRoute(r.id))).toBe(r.id);
    });
  });

  it('hash desconocido cae en la ruta por defecto', () => {
    expect(routeFromHash('#/no-existe')).toBe(DEFAULT_ROUTE);
    expect(routeFromHash('')).toBe(DEFAULT_ROUTE);
  });
});
