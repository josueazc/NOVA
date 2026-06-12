// Utilidades de texto compartidas

/** Extrae hashtags únicos (#tema) de un texto, normalizados en minúscula. */
export const extractHashtags = (text = '') => {
  const matches = text.match(/#[\p{L}\p{N}_]{2,30}/gu) || [];
  return [...new Set(matches.map((t) => t.slice(1).toLowerCase()))];
};

/** Sanitiza entradas de usuario: sin caracteres de control, longitud máxima. */
export const sanitizeText = (text = '', maxLength = 2000) =>
  text
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)
    .trim();

const UNITS = [
  ['año', 31536000],
  ['mes', 2592000],
  ['sem', 604800],
  ['d', 86400],
  ['h', 3600],
  ['min', 60],
];

/** "hace 3 h", "hace 2 d" — tiempo relativo corto en español. */
export const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'ahora';
  for (const [unit, secs] of UNITS) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) {
      const plural = unit.length > 3 && count > 1 ? (unit === 'mes' ? 'es' : 's') : '';
      return `hace ${count} ${unit}${plural}`;
    }
  }
  return 'ahora';
};

/** Valida archivos de imagen para subida. */
export const validateImageFile = (file, { maxMB = 5 } = {}) => {
  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!ALLOWED.includes(file.type)) {
    return { ok: false, error: 'Solo se permiten imágenes JPG, PNG, WebP o GIF.' };
  }
  if (file.size > maxMB * 1024 * 1024) {
    return { ok: false, error: `La imagen no puede superar ${maxMB} MB.` };
  }
  return { ok: true };
};
