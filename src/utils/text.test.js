import { describe, expect, it } from 'vitest';
import { extractHashtags, sanitizeText, timeAgo, validateImageFile } from './text';

describe('extractHashtags', () => {
  it('extrae hashtags normalizados en minúscula', () => {
    expect(extractHashtags('Apoyo la #LeyHumedales y #Ambiente')).toEqual(['leyhumedales', 'ambiente']);
  });

  it('deduplica y soporta tildes/ñ', () => {
    expect(extractHashtags('#Economía #economía #año2026')).toEqual(['economía', 'año2026']);
  });

  it('ignora # sueltos y tags de 1 carácter', () => {
    expect(extractHashtags('precio # 100 #a')).toEqual([]);
  });

  it('devuelve [] sin texto', () => {
    expect(extractHashtags()).toEqual([]);
  });
});

describe('sanitizeText', () => {
  it('elimina caracteres de control preservando saltos de línea', () => {
    expect(sanitizeText('hola \u0000\u0001 mundo\nlinea2')).toBe('hola  mundo\nlinea2');
  });

  it('recorta a la longitud máxima', () => {
    expect(sanitizeText('a'.repeat(50), 10)).toHaveLength(10);
  });

  it('hace trim', () => {
    expect(sanitizeText('  hola  ')).toBe('hola');
  });
});

describe('timeAgo', () => {
  it('devuelve "ahora" para fechas recientes', () => {
    expect(timeAgo(new Date())).toBe('ahora');
  });

  it('formatea horas', () => {
    expect(timeAgo(new Date(Date.now() - 3 * 3600000))).toBe('hace 3 h');
  });

  it('formatea días', () => {
    expect(timeAgo(new Date(Date.now() - 2 * 86400000))).toBe('hace 2 d');
  });
});

describe('validateImageFile', () => {
  const makeFile = (type, sizeMB) => ({ type, size: sizeMB * 1024 * 1024, name: 'f' });

  it('acepta JPEG bajo el límite', () => {
    expect(validateImageFile(makeFile('image/jpeg', 1)).ok).toBe(true);
  });

  it('rechaza tipos no permitidos', () => {
    const result = validateImageFile(makeFile('application/pdf', 1));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/imágenes/);
  });

  it('rechaza archivos demasiado grandes', () => {
    expect(validateImageFile(makeFile('image/png', 10)).ok).toBe(false);
  });
});
