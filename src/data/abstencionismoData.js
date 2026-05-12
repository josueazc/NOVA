// ============================================================
// Datos de Abstencionismo Electoral — Costa Rica
// Fuente: Tribunal Supremo de Elecciones (TSE)
// ============================================================

// --- Datos Históricos (Primera Ronda, Elecciones Presidenciales) ---
export const datosHistoricos = [
  { año: 1953, abstencionismo: 32.8, contexto: 'Post-guerra civil' },
  { año: 1958, abstencionismo: 35.3, contexto: 'Consolidación democrática' },
  { año: 1962, abstencionismo: 19.2, contexto: 'Bipartidismo emergente' },
  { año: 1966, abstencionismo: 18.7, contexto: 'Estabilidad política' },
  { año: 1970, abstencionismo: 16.7, contexto: 'Expansión del Estado' },
  { año: 1974, abstencionismo: 20.2, contexto: 'Crisis del petróleo' },
  { año: 1978, abstencionismo: 18.6, contexto: 'Bipartidismo PLN-PUSC' },
  { año: 1982, abstencionismo: 21.4, contexto: 'Crisis económica' },
  { año: 1986, abstencionismo: 18.2, contexto: 'Consolidación bipartidista' },
  { año: 1990, abstencionismo: 18.2, contexto: 'Fin bipartidismo clásico' },
  { año: 1994, abstencionismo: 18.9, contexto: 'Últimas elecciones bipartidistas' },
  { año: 1998, abstencionismo: 30.0, contexto: 'Quiebre del bipartidismo' },
  { año: 2002, abstencionismo: 31.2, contexto: 'Primera segunda ronda' },
  { año: 2006, abstencionismo: 34.8, contexto: 'Multipartidismo creciente' },
  { año: 2010, abstencionismo: 30.9, contexto: 'Primera presidenta electa' },
  { año: 2014, abstencionismo: 31.8, contexto: 'Fragmentación partidaria' },
  { año: 2018, abstencionismo: 34.3, contexto: 'Polarización ideológica' },
  { año: 2022, abstencionismo: 40.65, contexto: 'Récord histórico de abstención' },
];

// --- Datos por Provincia (Primera Ronda 2022) ---
export const datosPorProvincia = {
  'San José': {
    abstencionismo: 27.64,
    padronElectoral: 1_120_450,
    votosEmitidos: 810_438,
    poblacion: '1.4M',
    idh: 0.82,
    urbano: 85,
    color: '#FCA5A5',
    tendencia: 'estable',
    descripcion: 'Capital del país. Concentra la mayor cantidad de votantes y mantiene tasas relativamente bajas de abstención gracias a la accesibilidad de centros de votación.',
  },
  'Alajuela': {
    abstencionismo: 28.10,
    padronElectoral: 640_320,
    votosEmitidos: 460_549,
    poblacion: '1.0M',
    idh: 0.78,
    urbano: 65,
    color: '#FCA5A5',
    tendencia: 'creciente',
    descripcion: 'Segunda provincia más poblada. La zona norte presenta mayor abstención que el Valle Central.',
  },
  'Cartago': {
    abstencionismo: 24.57,
    padronElectoral: 380_210,
    votosEmitidos: 286_849,
    poblacion: '535K',
    idh: 0.80,
    urbano: 70,
    color: '#86EFAC',
    tendencia: 'estable',
    descripcion: 'Una de las provincias con menor abstención. Su cercanía al Valle Central y altos índices educativos contribuyen a la participación.',
  },
  'Heredia': {
    abstencionismo: 24.42,
    padronElectoral: 350_890,
    votosEmitidos: 265_253,
    poblacion: '513K',
    idh: 0.84,
    urbano: 88,
    color: '#86EFAC',
    tendencia: 'estable',
    descripcion: 'Provincia con el mayor IDH y menor abstención. Alta concentración universitaria y nivel educativo elevado.',
  },
  'Guanacaste': {
    abstencionismo: 36.58,
    padronElectoral: 240_670,
    votosEmitidos: 152_620,
    poblacion: '354K',
    idh: 0.72,
    urbano: 48,
    color: '#F87171',
    tendencia: 'creciente',
    descripcion: 'Provincia costera del Pacífico norte. La dispersión geográfica y la lejanía de centros urbanos contribuyen a la alta abstención.',
  },
  'Puntarenas': {
    abstencionismo: 43.20,
    padronElectoral: 310_450,
    votosEmitidos: 176_335,
    poblacion: '410K',
    idh: 0.69,
    urbano: 40,
    color: '#DC2626',
    tendencia: 'creciente',
    descripcion: 'Segunda provincia con mayor abstención. Presenta desigualdad territorial significativa entre la zona costera y las áreas con acceso al Valle Central.',
  },
  'Limón': {
    abstencionismo: 44.80,
    padronElectoral: 280_340,
    votosEmitidos: 154_747,
    poblacion: '386K',
    idh: 0.66,
    urbano: 38,
    color: '#B91C1C',
    tendencia: 'creciente',
    descripcion: 'Provincia con la mayor tasa de abstencionismo del país. Factores como la desigualdad, menor inversión pública y desconfianza institucional son determinantes.',
  },
};

// --- Razones del Abstencionismo ---
export const razonesAbstencionismo = [
  {
    id: 1,
    razon: 'Apatía y desafección política',
    porcentaje: 34,
    icono: 'Frown',
    descripcion: 'Creciente desinterés en la política, especialmente en jóvenes. Sensación de que la política no representa sus intereses ni responde a sus necesidades.',
    color: '#EF4444',
  },
  {
    id: 2,
    razon: 'Desconfianza en partidos políticos',
    porcentaje: 28,
    icono: 'ShieldOff',
    descripcion: 'Escándalos de corrupción, promesas incumplidas y falta de transparencia han erosionado la confianza ciudadana en las agrupaciones partidarias.',
    color: '#F97316',
  },
  {
    id: 3,
    razon: 'Percepción de que "el voto no cambia nada"',
    porcentaje: 18,
    icono: 'Ban',
    descripcion: 'Muchos ciudadanos sienten que independientemente de quién gobierne, los problemas del país persisten. Esto genera una sensación de impotencia democrática.',
    color: '#EAB308',
  },
  {
    id: 4,
    razon: 'Desconocimiento de propuestas',
    porcentaje: 10,
    icono: 'HelpCircle',
    descripcion: 'La falta de información clara y accesible sobre los planes de gobierno dificulta la toma de decisiones informadas por parte del electorado.',
    color: '#3B82F6',
  },
  {
    id: 5,
    razon: 'Barreras logísticas y de accesibilidad',
    porcentaje: 6,
    icono: 'MapPinOff',
    descripcion: 'Distancias a centros de votación, falta de transporte y limitaciones físicas afectan especialmente a comunidades rurales y personas con discapacidad.',
    color: '#8B5CF6',
  },
  {
    id: 6,
    razon: 'Otros factores',
    porcentaje: 4,
    icono: 'MoreHorizontal',
    descripcion: 'Incluye factores como enfermedad el día de la elección, trabajo, viaje fuera del país, o simplemente olvido de la fecha electoral.',
    color: '#6B7280',
  },
];

// --- Datos Demográficos ---
export const datosDemograficos = {
  porEdad: [
    { grupo: '18-24', abstencionismo: 48.2, label: 'Jóvenes' },
    { grupo: '25-34', abstencionismo: 42.5, label: 'Adultos jóvenes' },
    { grupo: '35-44', abstencionismo: 35.8, label: 'Adultos' },
    { grupo: '45-54', abstencionismo: 30.2, label: 'Adultos medios' },
    { grupo: '55-64', abstencionismo: 28.4, label: 'Pre-jubilados' },
    { grupo: '65+', abstencionismo: 33.6, label: 'Adultos mayores' },
  ],
  brechaUrbanoRural: {
    urbano: 29.8,
    rural: 42.3,
    diferencia: 12.5,
  },
  correlacionIDH: [
    { provincia: 'Heredia', idh: 0.84, abstencionismo: 24.42 },
    { provincia: 'Cartago', idh: 0.80, abstencionismo: 24.57 },
    { provincia: 'San José', idh: 0.82, abstencionismo: 27.64 },
    { provincia: 'Alajuela', idh: 0.78, abstencionismo: 28.10 },
    { provincia: 'Guanacaste', idh: 0.72, abstencionismo: 36.58 },
    { provincia: 'Puntarenas', idh: 0.69, abstencionismo: 43.20 },
    { provincia: 'Limón', idh: 0.66, abstencionismo: 44.80 },
  ],
};

// --- Estrategias de Prevención ---
export const estrategiasPrevencion = [
  {
    id: 1,
    titulo: 'Educación Cívica Temprana',
    descripcion: 'Incorporar formación democrática desde la educación primaria para crear conciencia sobre la importancia del voto y los derechos ciudadanos.',
    icono: 'GraduationCap',
    impacto: 'Alto',
    plazo: 'Largo plazo',
  },
  {
    id: 2,
    titulo: 'Plataformas de Información Accesible',
    descripcion: 'Herramientas digitales como VoteOn que presenten información política de forma clara, visual y sin sesgo para que el ciudadano tome decisiones informadas.',
    icono: 'Monitor',
    impacto: 'Alto',
    plazo: 'Inmediato',
  },
  {
    id: 3,
    titulo: 'Voto Electrónico y Facilidades',
    descripcion: 'Implementar mecanismos de votación remota o ampliar horarios y centros de votación para reducir las barreras logísticas.',
    icono: 'Smartphone',
    impacto: 'Medio',
    plazo: 'Mediano plazo',
  },
  {
    id: 4,
    titulo: 'Debates Públicos Transparentes',
    descripcion: 'Promover debates obligatorios entre candidatos con formatos accesibles, transmitidos por múltiples plataformas y con fact-checking en tiempo real.',
    icono: 'MessageSquare',
    impacto: 'Alto',
    plazo: 'Corto plazo',
  },
  {
    id: 5,
    titulo: 'Rendición de Cuentas Pública',
    descripcion: 'Crear mecanismos de seguimiento ciudadano a las promesas de campaña y la gestión de los funcionarios electos.',
    icono: 'ClipboardCheck',
    impacto: 'Alto',
    plazo: 'Mediano plazo',
  },
  {
    id: 6,
    titulo: 'Incentivos a la Participación',
    descripcion: 'Implementar beneficios tangibles para quienes ejerzan su derecho al voto, como certificaciones, descuentos o prioridad en trámites.',
    icono: 'Award',
    impacto: 'Medio',
    plazo: 'Corto plazo',
  },
];

// --- Datos Comparativos Municipales vs Nacionales ---
export const comparativaMunicipalNacional = [
  { tipo: 'Nacional 2018', abstencionismo: 34.3 },
  { tipo: 'Municipal 2020', abstencionismo: 64.3 },
  { tipo: 'Nacional 2022', abstencionismo: 40.65 },
  { tipo: 'Municipal 2024', abstencionismo: 72.1 },
];

// --- Estadísticas Clave ---
export const estadisticasClave = {
  abstencionismo2022: 40.65,
  padronTotal2022: 3_541_366,
  votosEmitidos2022: 2_106_602,
  votosNoEmitidos2022: 1_434_764,
  incrementoVs2018: 6.35,
  provinciaMaxAbstencion: 'Limón',
  provinciaMinAbstencion: 'Heredia',
  promedioHistorico: 27.4,
};
