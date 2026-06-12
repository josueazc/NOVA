import React from 'react';

// SVG flags — geometric party identity
const FlagPLN = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#FFFFFF" />
    <rect width="120" height="22" y="0" fill="#006400" />
    <rect width="120" height="22" y="58" fill="#006400" />
    <text x="60" y="44" textAnchor="middle" fontSize="13" fontWeight="900" fill="#006400" fontFamily="system-ui,sans-serif" letterSpacing="2">PLN</text>
  </svg>
);

const FlagPUSC = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="40" fill="#003DA5" />
    <rect width="120" height="40" y="40" fill="#C8102E" />
    <text x="60" y="26" textAnchor="middle" fontSize="10" fontWeight="900" fill="rgba(255,255,255,0.85)" fontFamily="system-ui,sans-serif" letterSpacing="1">UNIDAD</text>
    <text x="60" y="60" textAnchor="middle" fontSize="10" fontWeight="900" fill="rgba(255,255,255,0.85)" fontFamily="system-ui,sans-serif" letterSpacing="1">SOCIAL</text>
  </svg>
);

const FlagPLP = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#F97316" />
    <rect width="42" height="80" fill="#1E3A8A" />
    <text x="21" y="47" textAnchor="middle" fontSize="15" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif">LP</text>
    <text x="82" y="44" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="1">LIBERAL</text>
  </svg>
);

const FlagFA = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#CC0000" />
    <polygon points="0,0 46,0 26,80 0,80" fill="#8B0000" />
    <text x="73" y="47" textAnchor="middle" fontSize="14" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="2">FA</text>
  </svg>
);

const FlagNR = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#1B1F3B" />
    {[10, 22, 34].map(y => (
      <rect key={y} width="90" height="5" x="15" y={y} fill="#7C3AED" rx="2" />
    ))}
    <text x="60" y="66" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="1">NUEVA REPÚBLICA</text>
  </svg>
);

const FlagPPS = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#D97706" />
    <circle cx="60" cy="34" r="22" fill="white" opacity="0.15" />
    <circle cx="60" cy="34" r="13" fill="white" opacity="0.2" />
    <text x="60" y="38" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="1">PPS</text>
    <text x="60" y="70" textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.8)" fontFamily="system-ui,sans-serif" letterSpacing="0.5">PROGRESO SOCIAL</text>
  </svg>
);

const FlagPIN = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#059669" />
    <rect x="5" y="5" width="110" height="70" fill="none" stroke="white" strokeWidth="5" />
    <text x="60" y="46" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="2">PIN</text>
  </svg>
);

const FlagAC = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="120" height="80" fill="#0EA5E9" />
    <rect width="42" height="80" fill="#0C4A6E" />
    <text x="21" y="47" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="1">AC</text>
    <text x="82" y="44" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.5">ACCIÓN</text>
  </svg>
);

export const partidosData = {
  pln: {
    id: 'pln',
    nombre: 'Partido Liberación Nacional',
    siglas: 'PLN',
    color: '#006400',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagPLN />,
    fundacion: '12 de octubre de 1951',
    vecesGobierno: 9,
    diputadosActuales: 19,
    lema: 'Por una Costa Rica más próspera y solidaria',
    historiaTexto:
      'El Partido Liberación Nacional nació el 12 de octubre de 1951 en la Finca La Lucha. Heredero del Movimiento de Liberación Nacional que lideró la Guerra Civil de 1948, bajo José Figueres Ferrer impulsó la abolición del ejército, la nacionalización bancaria y el Estado Social costarricense.',
    mision: 'Promover el desarrollo integral de Costa Rica basado en la justicia social, la libertad y la sostenibilidad ambiental.',
    vision: 'Ser la fuerza política líder que modernice el Estado y garantice prosperidad equitativa para todas las generaciones.',
    valores: ['Solidaridad', 'Transparencia', 'Paz', 'Democracia'],
    fraseImpacto: 'Nuestra lucha no es solo por el poder, es por el bienestar de cada costarricense.',
    historialVotos: [
      { ano: '2010', porcentaje: 46.9, color: '#22c55e' },
      { ano: '2014', porcentaje: 29.7, color: '#4ade80' },
      { ano: '2018', porcentaje: 18.6, color: '#86efac' },
      { ano: '2022', porcentaje: 27.3, color: '#16a34a' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '1951', hito: 'Fundación', desc: 'Acta constitutiva en La Lucha.' },
      { año: '1953', hito: 'Abolición Ejército', desc: 'Hito mundial de paz.' },
      { año: '1987', hito: 'Premio Nobel', desc: 'Plan de Paz Esquipulas II — Óscar Arias.' },
      { año: '2010', hito: 'Primera Presidenta', desc: 'Laura Chinchilla Miranda.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Álvaro Ramos Chaves.' },
    ],
    listaGobiernos: [
      { año: '1953-1958', presidente: 'José Figueres Ferrer', obra: 'Abolición del ejército y nacionalización bancaria.' },
      { año: '1970-1974', presidente: 'José Figueres Ferrer', obra: 'Creación del FODESAF.' },
      { año: '1974-1978', presidente: 'Daniel Oduber Quirós', obra: 'Sistema Nacional de Parques Nacionales.' },
      { año: '1986-1990', presidente: 'Óscar Arias Sánchez', obra: 'Premio Nobel de la Paz 1987.' },
      { año: '2010-2014', presidente: 'Laura Chinchilla Miranda', obra: 'Primera presidenta de Costa Rica.' },
      { año: '2014-2018', presidente: 'Luis Guillermo Solís', obra: 'Reconocimiento de derechos LGBTQ+.' },
    ],
    integrantes: [
      { nombre: 'Álvaro Ramos Chaves', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
      { nombre: 'Rodrigo Arias', puesto: 'Presidente Asamblea Legislativa', fotoLocal: '' },
      { nombre: 'Paulina Ramírez', puesto: 'Jefa de Fracción', fotoLocal: '' },
    ],
  },

  pusc: {
    id: 'pusc',
    nombre: 'Partido Unidad Social Cristiana',
    siglas: 'PUSC',
    color: '#003DA5',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagPUSC />,
    fundacion: '17 de diciembre de 1983',
    vecesGobierno: 3,
    diputadosActuales: 9,
    lema: 'La fuerza de la unidad para el progreso',
    historiaTexto:
      'El PUSC fue la principal alternativa al PLN en el bipartidismo del siglo XX. Nacido de la fusión de cuatro partidos opositores, promueve la Doctrina Social de la Iglesia: justicia social, humanismo cristiano y economía social de mercado.',
    mision: 'Impulsar políticas públicas que pongan a la persona humana como centro del desarrollo.',
    vision: 'Ser el partido de las clases medias, construyendo oportunidades mediante la eficiencia del Estado.',
    valores: ['Dignidad', 'Bien Común', 'Subsidiariedad', 'Solidaridad'],
    fraseImpacto: 'El progreso solo tiene sentido si llega a todas las familias de Costa Rica.',
    historialVotos: [
      { ano: '2014', porcentaje: 6.0, color: '#60a5fa' },
      { ano: '2018', porcentaje: 16.0, color: '#3b82f6' },
      { ano: '2022', porcentaje: 12.4, color: '#1d4ed8' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '1983', hito: 'Fundación', desc: 'Fusión de partidos en la Coalición Unidad.' },
      { año: '1990', hito: 'Primer Gobierno', desc: 'R.Á. Calderón Fournier.' },
      { año: '1998', hito: 'Gobierno', desc: 'Miguel Ángel Rodríguez.' },
      { año: '2002', hito: 'Gobierno', desc: 'Abel Pacheco de la Espriella.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Juan Carlos Hidalgo Mora.' },
    ],
    listaGobiernos: [
      { año: '1990-1994', presidente: 'Rafael Ángel Calderón F.', obra: 'Bono Gratuito de la Vivienda.' },
      { año: '1998-2002', presidente: 'Miguel Ángel Rodríguez E.', obra: 'Ley de Protección al Trabajador.' },
      { año: '2002-2006', presidente: 'Abel Pacheco de la Espriella', obra: 'Garantías ambientales.' },
    ],
    integrantes: [
      { nombre: 'Juan Carlos Hidalgo Mora', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
      { nombre: 'Óscar Izquierdo', puesto: 'Diputado', fotoLocal: '' },
    ],
  },

  plp: {
    id: 'plp',
    nombre: 'Partido Liberal Progresista',
    siglas: 'PLP',
    color: '#F97316',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagPLP />,
    fundacion: '2019',
    vecesGobierno: 0,
    diputadosActuales: 6,
    lema: 'Libertad que transforma',
    historiaTexto:
      'El PLP es un partido liberal-libertario que defiende la reducción del Estado, la apertura económica y las libertades individuales. Su candidato Eliécer Feinzaig se ha posicionado como alternativa fresca al bipartidismo tradicional.',
    mision: 'Construir un Estado eficiente que garantice libertades y oportunidades iguales para todos.',
    vision: 'Costa Rica competitiva, moderna y libre de corrupción sistémica.',
    valores: ['Libertad', 'Responsabilidad', 'Meritocracia', 'Transparencia'],
    fraseImpacto: 'El gobierno debe ser el árbitro, no el jugador.',
    historialVotos: [
      { ano: '2022', porcentaje: 12.4, color: '#f97316' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '2019', hito: 'Fundación', desc: 'Inscripción ante el TSE.' },
      { año: '2022', hito: 'Debut electoral', desc: 'Eliécer Feinzaig: 12.4% — 6 diputados.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Eliécer Feinzaig Masuda.' },
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Eliécer Feinzaig Masuda', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
    ],
  },

  fa: {
    id: 'fa',
    nombre: 'Frente Amplio',
    siglas: 'FA',
    color: '#CC0000',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagFA />,
    fundacion: '2004',
    vecesGobierno: 0,
    diputadosActuales: 6,
    lema: 'Por la justicia social y el bien común',
    historiaTexto:
      'El Frente Amplio es la principal fuerza de izquierda en Costa Rica. Fundado en 2004, defiende los derechos laborales, la educación pública, el medio ambiente y el feminismo.',
    mision: 'Construir un país más justo, igualitario y sustentable desde los movimientos sociales.',
    vision: 'Una Costa Rica sin desigualdad estructural, con plena soberanía y derechos garantizados.',
    valores: ['Justicia', 'Igualdad', 'Ecología', 'Feminismo'],
    fraseImpacto: 'La lucha de los pueblos nunca fue en vano.',
    historialVotos: [
      { ano: '2014', porcentaje: 17.7, color: '#dc2626' },
      { ano: '2018', porcentaje: 3.3, color: '#ef4444' },
      { ano: '2022', porcentaje: 11.1, color: '#b91c1c' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '2004', hito: 'Fundación', desc: 'Nace como alternativa a la izquierda costarricense.' },
      { año: '2014', hito: 'Gran resultado', desc: 'José María Villalta: 17.7% primera ronda.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Ariel Robles Ureña.' },
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Ariel Robles Ureña', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
    ],
  },

  nr: {
    id: 'nr',
    nombre: 'Nueva República',
    siglas: 'NR',
    color: '#7C3AED',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagNR />,
    fundacion: '2018',
    vecesGobierno: 0,
    diputadosActuales: 10,
    lema: 'Valores, familia y nación',
    historiaTexto:
      'Nueva República irrumpió en 2018 con Fabricio Alvarado como figura central. Representa a sectores religiosos y familias tradicionales que buscan un Estado con más valores morales y una agenda socialmente conservadora.',
    mision: 'Defender los valores de la familia, la vida y la libertad religiosa en la institucionalidad costarricense.',
    vision: 'Costa Rica gobernada por principios éticos y morales sólidos.',
    valores: ['Familia', 'Fe', 'Vida', 'Nación'],
    fraseImpacto: 'Los valores no se negocian, se defienden.',
    historialVotos: [
      { ano: '2018', porcentaje: 25.0, color: '#7c3aed' },
      { ano: '2022', porcentaje: 14.9, color: '#6d28d9' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '2018', hito: 'Debut explosivo', desc: 'Fabricio Alvarado: 25% en primera ronda.' },
      { año: '2022', hito: 'Segunda fuerza', desc: '10 diputados y 14.9% presidencial.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Fabricio Alvarado Muñoz.' },
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Fabricio Alvarado Muñoz', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
    ],
  },

  pps: {
    id: 'pps',
    nombre: 'Partido Progreso Social Democrático',
    siglas: 'PPS',
    color: '#D97706',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagPPS />,
    fundacion: '2018',
    vecesGobierno: 1,
    diputadosActuales: 10,
    lema: 'Progreso con justicia social',
    historiaTexto:
      'El PPS fue fundado por Rodrigo Chaves, quien llegó a la presidencia en 2022 con un discurso antisistema y promesas de modernización del Estado. Para 2026 postula a Laura Fernández Sibaja como continuadora.',
    mision: 'Transformar el Estado costarricense eliminando la corrupción y burocracia que frenan el desarrollo.',
    vision: 'Un gobierno eficiente y cercano a la ciudadanía que responde con resultados concretos.',
    valores: ['Eficiencia', 'Anticorrupción', 'Ciudadanía', 'Resultados'],
    fraseImpacto: 'Costa Rica necesita un gobierno que cumpla lo que promete.',
    historialVotos: [
      { ano: '2022', porcentaje: 52.8, color: '#d97706' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '2018', hito: 'Fundación', desc: 'Rodrigo Chaves funda el partido.' },
      { año: '2022', hito: 'Victoria presidencial', desc: 'Rodrigo Chaves gana segunda ronda con 52.8%.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidata: Laura Fernández Sibaja.' },
    ],
    listaGobiernos: [
      { año: '2022-2026', presidente: 'Rodrigo Chaves Robles', obra: 'Digitalización del Estado y lucha anticorrupción.' },
    ],
    integrantes: [
      { nombre: 'Laura Fernández Sibaja', puesto: 'Candidata Presidencial 2026', fotoLocal: '' },
      { nombre: 'Rodrigo Chaves', puesto: 'Presidente de la República 2022-2026', fotoLocal: '' },
    ],
  },

  pin: {
    id: 'pin',
    nombre: 'Partido Integración Nacional',
    siglas: 'PIN',
    color: '#059669',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagPIN />,
    fundacion: '1996',
    vecesGobierno: 0,
    diputadosActuales: 1,
    lema: 'Unidos por Costa Rica',
    historiaTexto:
      'El PIN es un partido centrista con base en sectores trabajadores y populares. Luis Amador Jiménez lo dirige hacia las elecciones 2026 con un mensaje de integración nacional y desarrollo inclusivo.',
    mision: 'Representar los intereses de los sectores populares y trabajadores de Costa Rica.',
    vision: 'Una nación unida donde todos tengan oportunidades reales de progreso.',
    valores: ['Unidad', 'Trabajo', 'Inclusión', 'Desarrollo'],
    fraseImpacto: 'La integración de todos es la fuerza de Costa Rica.',
    historialVotos: [
      { ano: '2018', porcentaje: 9.5, color: '#059669' },
      { ano: '2022', porcentaje: 1.8, color: '#047857' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '1996', hito: 'Fundación', desc: 'Nace como partido de base popular.' },
      { año: '2018', hito: 'Mejor resultado', desc: 'Juan Diego Castro: 9.5% — 4 diputados.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidato: Luis Amador Jiménez.' },
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Luis Amador Jiménez', puesto: 'Candidato Presidencial 2026', fotoLocal: '' },
    ],
  },

  ac: {
    id: 'ac',
    nombre: 'Acción Ciudadana',
    siglas: 'AC',
    color: '#0EA5E9',
    escala: 'Nacional',
    imagen: '',
    bandera: <FlagAC />,
    fundacion: '2000',
    vecesGobierno: 2,
    diputadosActuales: 2,
    lema: 'El poder a la ciudadanía',
    historiaTexto:
      'El Partido Acción Ciudadana llegó al poder en 2014 y 2018. Para 2026 postula a Claudia Dobles Camargo, exministra de Vivienda bajo Carlos Alvarado, como candidata presidencial con una agenda de transición climática e inclusión.',
    mision: 'Construir una democracia de calidad basada en la participación ciudadana y la ética pública.',
    vision: 'Costa Rica gobernada con transparencia, inclusión y compromiso ambiental.',
    valores: ['Ética', 'Participación', 'Inclusión', 'Ambiente'],
    fraseImpacto: 'La política es de todos, no de unos pocos.',
    historialVotos: [
      { ano: '2014', porcentaje: 30.6, color: '#0ea5e9' },
      { ano: '2018', porcentaje: 48.4, color: '#0284c7' },
      { ano: '2022', porcentaje: 1.0, color: '#bae6fd' },
      { ano: '2026', porcentaje: 0, color: '#e2e8f0' },
    ],
    historiaDetallada: [
      { año: '2000', hito: 'Fundación', desc: 'Ottón Solís funda el PAC.' },
      { año: '2014', hito: 'Primer Gobierno', desc: 'Luis Guillermo Solís gana la presidencia.' },
      { año: '2018', hito: 'Reelección', desc: 'Carlos Alvarado gana segunda ronda.' },
      { año: '2026', hito: 'Elecciones 2026', desc: 'Candidata: Claudia Dobles Camargo.' },
    ],
    listaGobiernos: [
      { año: '2014-2018', presidente: 'Luis Guillermo Solís Rivera', obra: 'Apertura democrática y derechos civiles.' },
      { año: '2018-2022', presidente: 'Carlos Alvarado Quesada', obra: 'Descarbonización y Plan Nacional de Transporte.' },
    ],
    integrantes: [
      { nombre: 'Claudia Dobles Camargo', puesto: 'Candidata Presidencial 2026', fotoLocal: '' },
      { nombre: 'Carlos Alvarado', puesto: 'Ex Presidente 2018-2022', fotoLocal: '' },
    ],
  },
};
