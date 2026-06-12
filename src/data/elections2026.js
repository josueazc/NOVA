// ============================================================================
// Elecciones Costa Rica 2026 — capa de datos
// ----------------------------------------------------------------------------
// TODO el contenido electoral vive aquí (no en componentes): para actualizar
// candidaturas, fechas o propuestas NO hay que tocar código de UI.
// Los resúmenes de propuestas son síntesis editoriales neutrales de los planes
// de gobierno; enlazar `sourceUrl` al PDF oficial del TSE cuando esté cargado.
// ============================================================================

// --------------------------- Calendario TSE ---------------------------------
export const ELECTORAL_CALENDAR = [
  { date: '2025-10-01', label: 'Inscripción de candidaturas ante el TSE' },
  { date: '2025-10-08', label: 'Arranque oficial de la campaña electoral' },
  { date: '2026-01-28', label: 'Cierre de campaña (veda electoral)' },
  { date: '2026-02-01', label: 'Primera ronda: presidencia y 57 diputaciones' },
  { date: '2026-04-05', label: 'Segunda ronda presidencial (si ninguna fórmula supera el 40 %)' },
  { date: '2026-05-08', label: 'Traspaso de poderes' },
];

// --------------------------- Candidaturas -----------------------------------
// Candidaturas presidenciales inscritas ante el TSE (octubre 2025).
export const CANDIDATES_2026 = [
  { id: 'laura-fernandez', name: 'Laura Fernández', partyId: 'pps', role: 'Candidata presidencial', background: 'Exministra de la Presidencia y de Planificación.' },
  { id: 'alvaro-ramos', name: 'Álvaro Ramos', partyId: 'pln', role: 'Candidato presidencial', background: 'Economista, expresidente ejecutivo de la CCSS y exsuperintendente de pensiones.' },
  { id: 'fabricio-alvarado', name: 'Fabricio Alvarado', partyId: 'nr', role: 'Candidato presidencial', background: 'Periodista y diputado; candidato presidencial en 2018 y 2022.' },
  { id: 'ariel-robles', name: 'Ariel Robles', partyId: 'fa', role: 'Candidato presidencial', background: 'Diputado 2022-2026.' },
  { id: 'juan-carlos-hidalgo', name: 'Juan Carlos Hidalgo', partyId: 'pusc', role: 'Candidato presidencial', background: 'Analista de políticas públicas y dirigente partidario.' },
  { id: 'eliecer-feinzaig', name: 'Eliécer Feinzaig', partyId: 'plp', role: 'Candidato presidencial', background: 'Economista y diputado; fundador del PLP.' },
  { id: 'luis-amador', name: 'Luis Amador', partyId: 'pin', role: 'Candidato presidencial', background: 'Ingeniero, exministro de Obras Públicas y Transportes.' },
  { id: 'claudia-dobles', name: 'Claudia Dobles', partyId: 'ac', role: 'Candidata presidencial', background: 'Arquitecta y ex primera dama; lidera coalición Agenda Ciudadana.' },
];

// --------------------------- Temas del comparador ---------------------------
export const TOPICS = [
  { id: 'educacion', label: 'Educación' },
  { id: 'salud', label: 'Salud' },
  { id: 'economia', label: 'Economía' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'ambiente', label: 'Ambiente' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'derechos', label: 'Derechos sociales' },
];

// --------------------------- Escala ideológica ------------------------------
// Ejes: economia -10 (más Estado) a +10 (más mercado)
//       social   -10 (progresista) a +10 (conservador)
// Estimaciones editoriales para visualización; ajustables.
export const IDEOLOGY_2026 = {
  pln: { economia: -2, social: 0 },
  pusc: { economia: 3, social: 3 },
  plp: { economia: 7, social: -2 },
  fa: { economia: -7, social: -6 },
  nr: { economia: 2, social: 8 },
  pps: { economia: 3, social: 5 },
  ac: { economia: -1, social: -4 },
  pin: { economia: 2, social: 3 },
};

// --------------------------- Propuestas por tema ----------------------------
// stance: posición editorial en el eje propio del tema (-10 a +10) para
// gráficos comparativos. summary: lenguaje ciudadano, 1-2 oraciones.
export const PROPOSALS_2026 = [
  // ---- Educación ----
  { partyId: 'pln', topic: 'educacion', title: 'Rescate de la educación pública', summary: 'Aumentar progresivamente la inversión educativa hacia el 8 % del PIB, con énfasis en infraestructura escolar y formación docente.', stance: -3, sourceUrl: '' },
  { partyId: 'pusc', topic: 'educacion', title: 'Educación dual y técnica', summary: 'Expandir la educación técnica y el modelo dual con el sector privado para acelerar la empleabilidad juvenil.', stance: 3, sourceUrl: '' },
  { partyId: 'plp', topic: 'educacion', title: 'Libertad educativa y evaluación', summary: 'Evaluación docente por resultados, autonomía de centros educativos y financiamiento ligado a desempeño.', stance: 7, sourceUrl: '' },
  { partyId: 'fa', topic: 'educacion', title: 'Educación pública gratuita y universal', summary: 'Defensa del 8 % constitucional para educación, becas universales y comedores estudiantiles ampliados.', stance: -8, sourceUrl: '' },
  { partyId: 'nr', topic: 'educacion', title: 'Educación en valores', summary: 'Fortalecer la participación de las familias en los contenidos educativos y la formación técnica con valores.', stance: 5, sourceUrl: '' },
  { partyId: 'pps', topic: 'educacion', title: 'Continuidad de la transformación educativa', summary: 'Profundizar la ruta de la educación iniciada en la administración 2022-2026, con énfasis en bilingüismo y tecnología.', stance: 2, sourceUrl: '' },
  { partyId: 'ac', topic: 'educacion', title: 'Escuelas como centros comunitarios', summary: 'Red de cuido y jornadas extendidas usando la infraestructura escolar como eje del desarrollo barrial.', stance: -4, sourceUrl: '' },
  { partyId: 'pin', topic: 'educacion', title: 'Infraestructura educativa moderna', summary: 'Plan acelerado de construcción y mantenimiento de centros educativos con gestión por resultados.', stance: 1, sourceUrl: '' },

  // ---- Salud ----
  { partyId: 'pln', topic: 'salud', title: 'Fortalecer la CCSS', summary: 'Reducir listas de espera con un plan de choque, más especialistas y financiamiento sostenible de la seguridad social.', stance: -4, sourceUrl: '' },
  { partyId: 'pusc', topic: 'salud', title: 'Alianzas público-privadas en salud', summary: 'Comprar servicios al sector privado para bajar listas de espera manteniendo la rectoría de la CCSS.', stance: 4, sourceUrl: '' },
  { partyId: 'plp', topic: 'salud', title: 'Competencia y libre elección', summary: 'Permitir que el asegurado elija dónde atenderse (público o privado) con el dinero siguiendo al paciente.', stance: 8, sourceUrl: '' },
  { partyId: 'fa', topic: 'salud', title: 'Defensa de la seguridad social', summary: 'Pago de la deuda estatal con la CCSS y rechazo a cualquier forma de privatización de servicios.', stance: -8, sourceUrl: '' },
  { partyId: 'nr', topic: 'salud', title: 'Gestión eficiente de la CCSS', summary: 'Auditorías profundas, digitalización del expediente y reducción de burocracia interna.', stance: 2, sourceUrl: '' },
  { partyId: 'pps', topic: 'salud', title: 'Modernización hospitalaria', summary: 'Continuar la construcción de hospitales y centros de atención iniciados, con gestión por resultados.', stance: 2, sourceUrl: '' },
  { partyId: 'ac', topic: 'salud', title: 'Salud preventiva y comunitaria', summary: 'Fortalecer los EBAIS y la atención primaria con enfoque preventivo y de salud mental.', stance: -3, sourceUrl: '' },
  { partyId: 'pin', topic: 'salud', title: 'Infraestructura y logística sanitaria', summary: 'Plan de infraestructura hospitalaria y cadena logística de medicamentos con métricas públicas.', stance: 1, sourceUrl: '' },

  // ---- Economía ----
  { partyId: 'pln', topic: 'economia', title: 'Crecimiento con equidad', summary: 'Apoyo a pymes y agro con banca de desarrollo, manteniendo disciplina fiscal y atracción de inversión.', stance: -2, sourceUrl: '' },
  { partyId: 'pusc', topic: 'economia', title: 'Empleo y simplificación', summary: 'Reducción de trámites, jornadas flexibles y atracción de inversión extranjera fuera de la GAM.', stance: 4, sourceUrl: '' },
  { partyId: 'plp', topic: 'economia', title: 'Estado más pequeño, economía más libre', summary: 'Reducción del gasto público, venta de activos estatales no estratégicos y apertura de monopolios.', stance: 9, sourceUrl: '' },
  { partyId: 'fa', topic: 'economia', title: 'Economía para la mayoría', summary: 'Reforma tributaria progresiva, combate a la evasión y salario mínimo creciente por encima de la inflación.', stance: -8, sourceUrl: '' },
  { partyId: 'nr', topic: 'economia', title: 'Alivio al costo de la vida', summary: 'Reducción de impuestos a la canasta básica y combustibles, con incentivos a pequeños emprendimientos.', stance: 3, sourceUrl: '' },
  { partyId: 'pps', topic: 'economia', title: 'Continuidad y obra pública', summary: 'Mantener la estabilidad macro de 2022-2026 y acelerar concesiones de infraestructura.', stance: 4, sourceUrl: '' },
  { partyId: 'ac', topic: 'economia', title: 'Economía verde y territorial', summary: 'Inversión pública en transporte limpio y encadenamientos productivos regionales.', stance: -3, sourceUrl: '' },
  { partyId: 'pin', topic: 'economia', title: 'Infraestructura como motor', summary: 'Gran plan de obra pública (carreteras, tren de carga) financiado con alianzas público-privadas.', stance: 2, sourceUrl: '' },

  // ---- Seguridad ----
  { partyId: 'pln', topic: 'seguridad', title: 'Seguridad integral', summary: 'Más policías y tecnología, combinado con prevención social y oportunidades para jóvenes en riesgo.', stance: -1, sourceUrl: '' },
  { partyId: 'pusc', topic: 'seguridad', title: 'Mano firme contra el crimen organizado', summary: 'Reforma penal para endurecer penas por sicariato y narcotráfico; escáneres en puertos y fronteras.', stance: 5, sourceUrl: '' },
  { partyId: 'plp', topic: 'seguridad', title: 'Policía profesional y justicia ágil', summary: 'Profesionalización policial con mejores salarios y depuración, más jueces para acelerar juicios.', stance: 3, sourceUrl: '' },
  { partyId: 'fa', topic: 'seguridad', title: 'Prevención primero', summary: 'Atacar las causas sociales del delito: empleo joven, recuperación de espacios públicos y control de armas.', stance: -7, sourceUrl: '' },
  { partyId: 'nr', topic: 'seguridad', title: 'Tolerancia cero', summary: 'Construcción de nuevas cárceles, penas máximas para homicidios y respaldo total a la policía.', stance: 8, sourceUrl: '' },
  { partyId: 'pps', topic: 'seguridad', title: 'Estado fuerte contra el narco', summary: 'Continuar el refuerzo de fronteras y puertos, cooperación internacional y depuración judicial.', stance: 6, sourceUrl: '' },
  { partyId: 'ac', topic: 'seguridad', title: 'Ciudades seguras por diseño', summary: 'Iluminación, transporte y urbanismo preventivo junto a policía comunitaria de cercanía.', stance: -4, sourceUrl: '' },
  { partyId: 'pin', topic: 'seguridad', title: 'Tecnología y control territorial', summary: 'Videovigilancia inteligente, drones fronterizos y coordinación interinstitucional permanente.', stance: 4, sourceUrl: '' },

  // ---- Ambiente ----
  { partyId: 'pln', topic: 'ambiente', title: 'Liderazgo climático', summary: 'Retomar el plan de descarbonización y pagar servicios ambientales a comunidades rurales.', stance: -4, sourceUrl: '' },
  { partyId: 'pusc', topic: 'ambiente', title: 'Desarrollo sostenible pragmático', summary: 'Equilibrio entre producción y conservación; energías limpias con participación privada.', stance: 2, sourceUrl: '' },
  { partyId: 'plp', topic: 'ambiente', title: 'Mercados verdes', summary: 'Apertura del mercado eléctrico a generación privada renovable y créditos de carbono.', stance: 6, sourceUrl: '' },
  { partyId: 'fa', topic: 'ambiente', title: 'Justicia ambiental', summary: 'Moratoria a megaproyectos en zonas frágiles, protección del agua como derecho humano.', stance: -8, sourceUrl: '' },
  { partyId: 'nr', topic: 'ambiente', title: 'Conservación con producción', summary: 'Defender al productor agropecuario simplificando permisos ambientales sin abandonar parques nacionales.', stance: 5, sourceUrl: '' },
  { partyId: 'pps', topic: 'ambiente', title: 'Aprovechamiento responsable', summary: 'Explorar gas natural y energías marinas bajo estudios técnicos, manteniendo la marca país verde.', stance: 6, sourceUrl: '' },
  { partyId: 'ac', topic: 'ambiente', title: 'Transición ecológica urbana', summary: 'Tren eléctrico, ciclovías y sectorización de buses como columna de la política climática.', stance: -6, sourceUrl: '' },
  { partyId: 'pin', topic: 'ambiente', title: 'Infraestructura resiliente', summary: 'Obra pública con estándares de adaptación climática y manejo de cuencas.', stance: 0, sourceUrl: '' },

  // ---- Tecnología ----
  { partyId: 'pln', topic: 'tecnologia', title: 'Gobierno digital', summary: 'Digitalizar el 100 % de trámites del Estado y llevar fibra óptica a zonas rurales con FONATEL.', stance: -1, sourceUrl: '' },
  { partyId: 'pusc', topic: 'tecnologia', title: 'Hub tecnológico regional', summary: 'Incentivos a empresas de semiconductores e IA; inglés y programación desde primaria.', stance: 3, sourceUrl: '' },
  { partyId: 'plp', topic: 'tecnologia', title: 'Desregulación digital', summary: 'Eliminar barreras a fintech y telecomunicaciones; neutralidad tecnológica del Estado.', stance: 7, sourceUrl: '' },
  { partyId: 'fa', topic: 'tecnologia', title: 'Internet como derecho', summary: 'Acceso universal a internet de calidad como servicio público y soberanía de datos.', stance: -7, sourceUrl: '' },
  { partyId: 'nr', topic: 'tecnologia', title: 'Tecnología con protección familiar', summary: 'Conectividad rural y herramientas de control parental; regulación de contenidos para menores.', stance: 4, sourceUrl: '' },
  { partyId: 'pps', topic: 'tecnologia', title: 'Continuidad en semiconductores', summary: 'Profundizar la estrategia de semiconductores y ciberseguridad nacional iniciada en 2022-2026.', stance: 2, sourceUrl: '' },
  { partyId: 'ac', topic: 'tecnologia', title: 'Innovación pública', summary: 'Laboratorios de innovación ciudadana y datos abiertos por defecto en todas las instituciones.', stance: -3, sourceUrl: '' },
  { partyId: 'pin', topic: 'tecnologia', title: 'Smart infrastructure', summary: 'Peajes inteligentes, semáforos sincronizados y expediente único digital de obra pública.', stance: 1, sourceUrl: '' },

  // ---- Derechos sociales ----
  { partyId: 'pln', topic: 'derechos', title: 'Estado social de derecho', summary: 'Defensa de los programas sociales existentes con mejor focalización y red de cuido ampliada.', stance: -3, sourceUrl: '' },
  { partyId: 'pusc', topic: 'derechos', title: 'Familia y oportunidades', summary: 'Política social centrada en la familia, con transferencias condicionadas a educación.', stance: 3, sourceUrl: '' },
  { partyId: 'plp', topic: 'derechos', title: 'Libertades individuales', summary: 'Estado neutral en decisiones personales; reforma para un Estado laico.', stance: -4, sourceUrl: '' },
  { partyId: 'fa', topic: 'derechos', title: 'Igualdad plena', summary: 'Agenda activa de derechos para mujeres, personas LGBTIQ+, pueblos indígenas y personas con discapacidad.', stance: -9, sourceUrl: '' },
  { partyId: 'nr', topic: 'derechos', title: 'Valores y vida', summary: 'Defensa de la vida desde la concepción y de la familia tradicional; objeción de conciencia.', stance: 9, sourceUrl: '' },
  { partyId: 'pps', topic: 'derechos', title: 'Programas sociales eficientes', summary: 'Unificación de subsidios en una transferencia única focalizada con evaluación de impacto.', stance: 3, sourceUrl: '' },
  { partyId: 'ac', topic: 'derechos', title: 'Ciudad inclusiva', summary: 'Accesibilidad universal, vivienda asequible y participación ciudadana vinculante.', stance: -5, sourceUrl: '' },
  { partyId: 'pin', topic: 'derechos', title: 'Equidad territorial', summary: 'Cerrar brechas entre la GAM y las costas con inversión social georreferenciada.', stance: -1, sourceUrl: '' },
];

export const proposalsByTopic = (topicId) => PROPOSALS_2026.filter((p) => p.topic === topicId);
export const proposalsByParty = (partyId) => PROPOSALS_2026.filter((p) => p.partyId === partyId);
export const candidateByParty = (partyId) => CANDIDATES_2026.find((c) => c.partyId === partyId);
