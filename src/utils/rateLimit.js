// Rate limiting del lado del cliente: primera barrera contra abuso
// (la barrera real son las políticas RLS y los límites del servidor).

const buckets = new Map();

/**
 * @returns {{ ok: boolean, retryInSeconds?: number }}
 */
export const checkRateLimit = (key, { max = 5, windowMs = 60000 } = {}) => {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((ts) => now - ts < windowMs);
  if (hits.length >= max) {
    const retryInSeconds = Math.ceil((windowMs - (now - hits[0])) / 1000);
    return { ok: false, retryInSeconds };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true };
};
