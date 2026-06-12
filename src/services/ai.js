// ============================================================================
// Capa de servicios IA (Google Gemini, API REST nativa)
// Centraliza TODAS las llamadas a IA de la plataforma: asistente electoral,
// resúmenes de planes, comparación de propuestas, moderación y fact-checking.
// Cada función degrada con gracia si no hay API key configurada.
// ============================================================================

const MODEL = 'gemini-2.5-flash';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const apiKey = () => import.meta.env.VITE_GEMINI_API_KEY;

export const hasAIConfig = () => Boolean(apiKey());

class AIError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'AIError';
    this.cause = cause;
  }
}

/**
 * Llamada base a Gemini.
 * @param {Array|string} contents - historial [{role, parts}] o texto simple.
 * @param {object} opts - { system, temperature, json, maxOutputTokens }
 */
export async function geminiRequest(contents, opts = {}) {
  if (!hasAIConfig()) {
    throw new AIError('Falta configurar VITE_GEMINI_API_KEY en el archivo .env');
  }

  const { system, temperature = 0.4, json = false, maxOutputTokens = 2048 } = opts;

  const body = {
    contents:
      typeof contents === 'string'
        ? [{ role: 'user', parts: [{ text: contents }] }]
        : contents,
    generationConfig: {
      temperature,
      maxOutputTokens,
      ...(json ? { responseMimeType: 'application/json' } : {}),
    },
    ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
  };

  let res;
  try {
    res = await fetch(`${BASE_URL}?key=${apiKey()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new AIError('No se pudo contactar el servicio de IA. Revisa tu conexión.', err);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new AIError(`El servicio de IA respondió ${res.status}.`, detail);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text) throw new AIError('La IA no devolvió contenido.');
  return text;
}

/** Intenta parsear JSON tolerando fences de markdown. */
const parseJSON = (raw) => {
  const cleaned = raw.replace(/```json?\s*|```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new AIError('Respuesta de IA con formato inesperado.');
  }
};

// ============================================================================
// 1. ASISTENTE ELECTORAL — neutral, contextualizado, con fuentes
// ============================================================================
const ASSISTANT_SYSTEM = `Eres el Asistente Electoral de VoteOn Costa Rica, una plataforma cívica NEUTRAL.
Reglas estrictas:
- Responde SOLO sobre política, elecciones, instituciones y educación cívica de Costa Rica.
- Nunca recomiendes votar por un partido o candidato específico.
- Distingue HECHOS verificables de OPINIONES; cita la fuente institucional cuando exista (TSE, Asamblea Legislativa, Constitución).
- Si no sabes algo o los datos pueden estar desactualizados, dilo explícitamente.
- Responde en el idioma del usuario. Sé claro y didáctico, apto para alguien sin formación política.`;

export async function askElectoralAssistant(question, { history = [], context = '' } = {}) {
  const contents = [
    ...history,
    {
      role: 'user',
      parts: [{ text: context ? `Contexto de la plataforma:\n${context}\n\nPregunta: ${question}` : question }],
    },
  ];
  return geminiRequest(contents, { system: ASSISTANT_SYSTEM, temperature: 0.5 });
}

// ============================================================================
// 2. RESÚMENES — planes de gobierno y textos largos
// ============================================================================
export async function summarizePlan(text, { party = '', topic = '' } = {}) {
  const prompt = `Resume el siguiente ${topic ? `contenido sobre "${topic}"` : 'plan de gobierno'}${party ? ` del partido ${party}` : ''} para un ciudadano sin formación política.
Devuelve JSON con esta forma exacta:
{"resumen": "3-4 oraciones simples", "puntos_clave": ["...", "...", "..."], "temas": ["tema1", "tema2"]}

Texto:
${text.slice(0, 30000)}`;
  return parseJSON(await geminiRequest(prompt, { json: true, temperature: 0.3 }));
}

// ============================================================================
// 3. COMPARACIÓN — propuestas e ideologías
// ============================================================================
export async function compareProposals(items, topic) {
  const prompt = `Compara con neutralidad absoluta las siguientes posiciones sobre "${topic}" en Costa Rica.
${items.map((it, i) => `--- Posición ${i + 1} (${it.name}) ---\n${it.text}`).join('\n')}

Devuelve JSON con esta forma exacta:
{
  "similitudes": ["...", "..."],
  "diferencias": [{"aspecto": "...", "posiciones": {"${items[0]?.name}": "...", "${items[1]?.name}": "..."}}],
  "explicacion_simple": "2-3 oraciones que un ciudadano común entienda"
}`;
  return parseJSON(await geminiRequest(prompt, { json: true, temperature: 0.3 }));
}

// ============================================================================
// 4. MODERACIÓN — toxicidad, spam, ataques, desinformación
// ============================================================================
export async function moderateContent(text) {
  const prompt = `Evalúa este contenido de un foro político ciudadano de Costa Rica.
Considera: toxicidad, spam, ataques personales, discurso de odio, desinformación evidente, contenido sensible y polarización extrema.
El debate político vehemente ES VÁLIDO; solo marca contenido realmente dañino.

Devuelve JSON con esta forma exacta:
{"allowed": true/false, "labels": ["toxicity"|"spam"|"harassment"|"hate"|"misinformation"|"sensitive"|"extreme_polarization"], "severity": 0.0-1.0, "reason": "explicación breve en español"}

Contenido:
"""${text.slice(0, 8000)}"""`;

  try {
    const result = parseJSON(await geminiRequest(prompt, { json: true, temperature: 0.1 }));
    return {
      allowed: Boolean(result.allowed),
      labels: Array.isArray(result.labels) ? result.labels : [],
      severity: Number(result.severity) || 0,
      reason: result.reason || '',
    };
  } catch (err) {
    // Si la moderación falla, no bloqueamos la publicación (fail-open)
    console.warn('Moderación IA no disponible:', err.message);
    return { allowed: true, labels: [], severity: 0, reason: 'moderación no disponible', failed: true };
  }
}

// ============================================================================
// 5. FACT-CHECKING — asistido, con nivel de confianza
// ============================================================================
export async function factCheck(claim) {
  const prompt = `Actúa como verificador de datos para Costa Rica. Analiza esta afirmación:
"""${claim.slice(0, 4000)}"""

IMPORTANTE: tu conocimiento tiene fecha de corte; si la afirmación depende de hechos recientes que no puedes verificar, usa "unverifiable" y dilo.

Devuelve JSON con esta forma exacta:
{
  "claim_detectado": "la afirmación verificable principal",
  "verdict": "true"|"mostly_true"|"mixed"|"mostly_false"|"false"|"unverifiable",
  "confidence": 0.0-1.0,
  "explanation": "explicación con contexto, en español simple",
  "sources_suggested": ["institución o fuente donde el ciudadano puede verificar"]
}`;
  return parseJSON(await geminiRequest(prompt, { json: true, temperature: 0.2 }));
}

// ============================================================================
// 6. ANÁLISIS IDEOLÓGICO — para el comparador
// ============================================================================
export async function analyzeIdeology(partyName, description) {
  const prompt = `Analiza la orientación ideológica del partido costarricense "${partyName}" según esta descripción:
"""${description.slice(0, 6000)}"""

Devuelve JSON con esta forma exacta (escala -10 izquierda a +10 derecha, 0 centro):
{"economia": n, "social": n, "explicacion": "1-2 oraciones neutrales"}`;
  return parseJSON(await geminiRequest(prompt, { json: true, temperature: 0.2 }));
}

export { AIError };
