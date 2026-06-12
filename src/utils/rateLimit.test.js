import { describe, expect, it, vi, afterEach } from 'vitest';
import { checkRateLimit } from './rateLimit';

afterEach(() => {
  vi.useRealTimers();
});

describe('checkRateLimit', () => {
  it('permite hasta el máximo dentro de la ventana', () => {
    const key = `k${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(checkRateLimit(key, { max: 3, windowMs: 1000 }).ok).toBe(true);
    }
    const blocked = checkRateLimit(key, { max: 3, windowMs: 1000 });
    expect(blocked.ok).toBe(false);
    expect(blocked.retryInSeconds).toBeGreaterThan(0);
  });

  it('libera cupo al expirar la ventana', () => {
    vi.useFakeTimers();
    const key = `k${Math.random()}`;
    expect(checkRateLimit(key, { max: 1, windowMs: 1000 }).ok).toBe(true);
    expect(checkRateLimit(key, { max: 1, windowMs: 1000 }).ok).toBe(false);
    vi.advanceTimersByTime(1100);
    expect(checkRateLimit(key, { max: 1, windowMs: 1000 }).ok).toBe(true);
  });
});
