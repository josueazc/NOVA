import React from 'react';
import { Zap, Star } from 'lucide-react';

export const partidosData = {
  pln: {
    id: 'pln',
    nombre: 'Partido Liberación Nacional',
    siglas: 'PLN',
    color: '#008000',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/3 bg-green-700"></div>
        <div className="h-1/3 bg-white"></div>
        <div className="h-1/3 bg-green-700"></div>
      </div>
    ),
    fundacion: '12 de octubre de 1951',
    vecesGobierno: 9,
    diputadosActuales: 19,
    lema: "Por una Costa Rica más próspera y solidaria",
    historiaTexto: "El Partido Liberación Nacional (PLN) nació en el corazón de la modernización costarricense. Fundado el 12 de octubre de 1951 en la emblemática Finca La Lucha, surgió como el heredero político del Movimiento de Liberación Nacional que lideró la Guerra Civil de 1948. Bajo la guía de figuras como José Figueres Ferrer, el partido impulsó una agenda socialdemócrata que transformó el tejido social del país, promoviendo la nacionalización de la banca, los seguros y, lo más trascendental, la abolición del ejército.",
    mision: "Promover el desarrollo integral de Costa Rica basado en la justicia social, la libertad y la sostenibilidad ambiental.",
    vision: "Ser la fuerza política líder que modernice el Estado y garantice prosperidad equitativa para todas las generaciones.",
    valores: ["Solidaridad", "Transparencia", "Paz", "Democracia"],
    fraseImpacto: "Nuestra lucha no es solo por el poder, es por el bienestar de cada costarricense que sueña con un futuro mejor.",
    historialVotos: [
      { ano: "2006", porcentaje: 40.9, color: "#16a34a" },
      { ano: "2010", porcentaje: 46.9, color: "#22c55e" },
      { ano: "2014", porcentaje: 29.7, color: "#4ade80" },
      { ano: "2018", porcentaje: 18.6, color: "#86efac" },
      { ano: "2022", porcentaje: 27.3, color: "#22c55e" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "1951", hito: "Fundación", desc: "Acta constitutiva en La Lucha." },
      { año: "1953", hito: "Abolición Ejército", desc: "Hito mundial de paz." },
      { año: "1987", hito: "Premio Nobel", desc: "Plan de Paz Esquipulas II." },
      { año: "2010", hito: "Primera Presidenta", desc: "Laura Chinchilla Miranda." },
      { año: "2024", hito: "Municipales", desc: "Mantiene la mayoría de alcaldías (29)." },
      { año: "2026", hito: "Elecciones 2026", desc: "Renovación de cara a los comicios nacionales." }
    ],
    listaGobiernos: [
      { año: "1953-1958", presidente: "José Figueres Ferrer", obra: "Abolición del ejército y nacionalización bancaria." },
      { año: "1962-1966", presidente: "Francisco Orlich B.", obra: "Creación del ITCO (hoy INDER) y Reforma Agraria." },
      { año: "1970-1974", presidente: "José Figueres Ferrer", obra: "Creación de la Asignaciones Familiares (FODESAF)." },
      { año: "1974-1978", presidente: "Daniel Oduber Quirós", obra: "Creación del Sistema Nacional de Parques Nacionales." }
    ],
    integrantes: [
      { nombre: 'Ricardo Sancho', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Miguel Guillén', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Paulina Ramírez', puesto: 'Jefa Fracción', fotoLocal: '' },
      { nombre: 'Rodrigo Arias', puesto: 'Asamblea', fotoLocal: '' },
      { nombre: 'Andrea Álvarez', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Óscar Izquierdo', puesto: 'Diputado', fotoLocal: '' }
    ]
  },
  pusc: {
    id: 'pusc',
    nombre: 'Partido Unidad Social Cristiana',
    siglas: 'PUSC',
    color: '#0000FF',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/2 bg-blue-700"></div>
        <div className="h-1/2 bg-red-600"></div>
      </div>
    ),
    fundacion: '17 de diciembre de 1983',
    vecesGobierno: 3,
    diputadosActuales: 9,
    lema: "La fuerza de la unidad para el progreso",
    historiaTexto: "El Partido Unidad Social Cristiana (PUSC) se consolidó como la principal fuerza opositora y alternativa de poder en el sistema bipartidista costarricense a finales del siglo XX. Nació de la fusión de cuatro partidos de oposición al PLN y promueve una filosofía basada en la Doctrina Social de la Iglesia, enfocada en la justicia social, el humanismo cristiano y la economía social de mercado.",
    mision: "Impulsar políticas públicas que pongan a la persona humana como el centro del desarrollo social y económico.",
    vision: "Ser el partido de las clases medias y trabajadoras, construyendo oportunidades mediante la eficiencia del Estado.",
    valores: ["Dignidad", "Bien Común", "Subsidiariedad", "Solidaridad"],
    fraseImpacto: "El progreso solo tiene sentido si llega a todas las familias de Costa Rica.",
    historialVotos: [
      { ano: "1998", porcentaje: 46.9, color: "#1e40af" },
      { ano: "2002", porcentaje: 38.6, color: "#1e3a8a" },
      { ano: "2014", porcentaje: 6.0, color: "#60a5fa" },
      { ano: "2018", porcentaje: 16.0, color: "#3b82f6" },
      { ano: "2022", porcentaje: 12.4, color: "#2563eb" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "1983", hito: "Fundación", desc: "Fusión de partidos en la Coalición Unidad." },
      { año: "1990", hito: "Primer Gobierno", desc: "Elección de R.A. Calderón Fournier." },
      { año: "1998", hito: "Gobierno", desc: "Elección de Miguel Ángel Rodríguez." },
      { año: "2002", hito: "Gobierno", desc: "Elección de Abel Pacheco de la Espriella." },
      { año: "2024", hito: "Municipales", desc: "Crecimiento electoral alcanzando 20 alcaldías." },
      { año: "2026", hito: "Elecciones 2026", desc: "Busca retornar a la presidencia tras 20 años." }
    ],
    listaGobiernos: [
      { año: "1990-1994", presidente: "Rafael Ángel Calderón F.", obra: "Bono Gratuito de la Vivienda y reformas sociales." },
      { año: "1998-2002", presidente: "Miguel Ángel Rodríguez E.", obra: "Ley de Protección al Trabajador." },
      { año: "2002-2006", presidente: "Abel Pacheco de la Espriella", obra: "Inclusión de garantías ambientales." }
    ],
    integrantes: [
      { nombre: 'Juan Carlos Hidalgo', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Alejandro Pacheco', puesto: 'Jefe Fracción', fotoLocal: '' },
      { nombre: 'María Inés Solís', puesto: 'Ex-Diputada', fotoLocal: '' },
      { nombre: 'Daniela Rojas', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Vanessa Castro', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Leslye Bojorges', puesto: 'Diputado', fotoLocal: '' }
    ]
  },
  plp: {
    id: 'plp',
    nombre: 'Partido Liberal Progresista',
    siglas: 'PLP',
    color: '#f97316',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex h-full w-full bg-orange-500 items-center justify-center p-4">
        <div className="w-full h-full border-[6px] border-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    ),
    fundacion: '27 de febrero de 2016',
    vecesGobierno: 0,
    diputadosActuales: 6,
    lema: "Por una Costa Rica libre, próspera y de oportunidades",
    historiaTexto: "El Partido Liberal Progresista surgió como una respuesta a la creciente necesidad de un enfoque liberal clásico y pragmático en la política costarricense. Fundado por Eli Feinzaig, promueve la reducción de impuestos, la simplificación de trámites y un Estado eficiente que no interfiera innecesariamente en la economía y la vida privada de los ciudadanos.",
    mision: "Defender la libertad individual y promover un ecosistema económico competitivo que atraiga inversión y genere riqueza.",
    vision: "Convertir a Costa Rica en el país más próspero de América Latina a través de la libertad económica.",
    valores: ["Libertad", "Propiedad Privada", "Eficiencia", "Innovación"],
    fraseImpacto: "El mejor programa social es un empleo digno generado por la libre empresa.",
    historialVotos: [
      { ano: "2022", porcentaje: 12.3, color: "#f97316" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2016", hito: "Fundación", desc: "Inscripción oficial del partido." },
      { año: "2022", hito: "Elecciones", desc: "Ingreso a la Asamblea con 6 escaños." },
      { año: "2024", hito: "Municipales", desc: "Consigue sus primeras 3 alcaldías a nivel nacional." },
      { año: "2026", hito: "Elecciones 2026", desc: "Consolidación como principal fuerza liberal." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Eli Feinzaig', puesto: 'Presidente y Diputado', fotoLocal: '' },
      { nombre: 'Kattia Cambronero', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Luis Diego Vargas', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Johana Obando', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Gilberto Campos', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Jorge Dengo', puesto: 'Ex-Diputado', fotoLocal: '' }
    ]
  },
  fa: {
    id: 'fa',
    nombre: 'Partido Frente Amplio',
    siglas: 'PFA',
    color: '#eab308',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex h-full w-full bg-yellow-400 items-center justify-center relative overflow-hidden">
        <div className="absolute w-[120%] h-2 bg-black rotate-45"></div>
        <div className="absolute w-[120%] h-2 bg-black -rotate-45"></div>
      </div>
    ),
    fundacion: '16 de octubre de 2004',
    vecesGobierno: 0,
    diputadosActuales: 6,
    lema: "La esperanza se defiende",
    historiaTexto: "El Frente Amplio es la principal agrupación de izquierda democrática en Costa Rica. Surgió bajo el liderazgo del sacerdote y pensador José Merino del Río, agrupando a sectores progresistas, ambientalistas y movimientos sociales. El partido se caracteriza por su férrea defensa del Estado Social de Derecho, los derechos laborales y la protección del medio ambiente contra las políticas neoliberales.",
    mision: "Luchar por una sociedad más justa, igualitaria y ecológicamente sustentable, defendiendo las instituciones públicas.",
    vision: "Consolidar una alternativa popular que gobierne para las mayorías y erradique la desigualdad en el país.",
    valores: ["Justicia Social", "Ecologismo", "Feminismo", "Solidaridad"],
    fraseImpacto: "Donde hay una injusticia, ahí estará el Frente Amplio para combatirla.",
    historialVotos: [
      { ano: "2010", porcentaje: 0.4, color: "#fde047" },
      { ano: "2014", porcentaje: 17.1, color: "#eab308" },
      { ano: "2018", porcentaje: 0.8, color: "#fef08a" },
      { ano: "2022", porcentaje: 8.7, color: "#ca8a04" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2004", hito: "Fundación", desc: "Impulsado por José Merino del Río." },
      { año: "2014", hito: "Auge Electoral", desc: "José María Villalta alcanza 17% de los votos." },
      { año: "2022", hito: "Consolidación", desc: "Logra 6 diputaciones clave en la Asamblea." },
      { año: "2024", hito: "Municipales", desc: "Aumento de representación en regidurías." },
      { año: "2026", hito: "Elecciones 2026", desc: "Aspiran a liderar un bloque progresista nacional." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Patricia Mora', puesto: 'Presidenta', fotoLocal: '' },
      { nombre: 'Sofía Guillén', puesto: 'Jefa de Fracción', fotoLocal: '' },
      { nombre: 'Ariel Robles', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Jonathan Acuña', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Priscilla Vindas', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Rocío Alfaro', puesto: 'Diputada', fotoLocal: '' }
    ]
  },
  nr: {
    id: 'nr',
    nombre: 'Partido Nueva República',
    siglas: 'PNR',
    color: '#1e3a8a',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-2/3 bg-blue-900 flex items-center justify-center">
           <div className="w-12 h-12 border-4 border-white/30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
           </div>
        </div>
        <div className="h-1/3 bg-sky-500"></div>
      </div>
    ),
    fundacion: '20 de octubre de 2018',
    vecesGobierno: 0,
    diputadosActuales: 7,
    lema: "Por los valores de la familia",
    historiaTexto: "Nueva República fue fundado tras las elecciones de 2018 por el excandidato presidencial Fabricio Alvarado. Se presenta como una opción política conservadora, defensora de la vida, la familia tradicional y los principios judeocristianos. Combina su enfoque en valores con una propuesta de reactivación económica basada en la reducción de impuestos y el apoyo a las PYMES.",
    mision: "Defender la vida desde la concepción y los valores fundamentales de la sociedad costarricense.",
    vision: "Un país próspero donde la familia sea el centro y motor del desarrollo nacional.",
    valores: ["Pro-Vida", "Familia", "Libertad Religiosa", "Emprendimiento"],
    fraseImpacto: "La verdadera nueva república nace del respeto a la vida y el apoyo a quienes trabajan.",
    historialVotos: [
      { ano: "2022", porcentaje: 14.8, color: "#1e3a8a" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2018", hito: "Fundación", desc: "Tras el movimiento político de Restauración." },
      { año: "2022", hito: "Elecciones", desc: "Obtiene 7 escaños legislativos." },
      { año: "2024", hito: "Municipales", desc: "Consolidación de bases en el nivel local." },
      { año: "2026", hito: "Elecciones 2026", desc: "Nueva aspiración presidencial de Fabricio Alvarado." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Fabricio Alvarado', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Gloria Navas', puesto: 'Ex-Diputada', fotoLocal: '' },
      { auto: true, nombre: 'David Segura', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Olga Morera', puesto: 'Diputada', fotoLocal: '' },
      { nombre: 'Yonder Salas', puesto: 'Diputado', fotoLocal: '' },
      { nombre: 'Rosalía Brown', puesto: 'Diputada', fotoLocal: '' }
    ]
  },
  pps: {
    id: 'pps',
    nombre: 'Partido Pueblo Soberano',
    siglas: 'PPS',
    color: '#16a34a',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/2 bg-blue-950"></div>
        <div className="h-1/2 bg-green-600 flex items-center justify-center">
           <div className="w-full h-2 bg-white/20"></div>
        </div>
      </div>
    ),
    fundacion: '2022',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "El poder vuelve al pueblo",
    historiaTexto: "El Partido Pueblo Soberano es una de las formaciones más recientes en el espectro político, afín al movimiento ciudadano conocido como 'rodriguista'. Surge con el objetivo de dar continuidad a las propuestas de eficiencia estatal, lucha contra la corrupción y desmantelamiento de privilegios, presentándose como una alternativa ciudadana.",
    mision: "Devolver el poder de decisión al ciudadano y eliminar la corrupción estatal.",
    vision: "Un Estado eficiente, moderno y al servicio directo de las necesidades populares.",
    valores: ["Soberanía", "Anticorrupción", "Eficiencia", "Participación"],
    fraseImpacto: "El soberano siempre es el pueblo, no las cúpulas.",
    historialVotos: [
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2022", hito: "Inscripción", desc: "Proceso de recolección de firmas e inscripción nacional." },
      { año: "2024", hito: "Municipales", desc: "Primera participación obteniendo presencia en concejos." },
      { año: "2026", hito: "Elecciones 2026", desc: "Se perfila como principal fuerza del movimiento rodriguista." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Mayuli Ortega', puesto: 'Presidenta', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  ac: {
    id: 'ac',
    nombre: 'Partido Agenda Ciudadana',
    siglas: 'PAC',
    color: '#dc2626',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/2 bg-yellow-400 flex items-center justify-center">
           <Zap size={48} className="text-red-600 fill-red-600 animate-bounce" />
        </div>
        <div className="h-1/2 bg-red-600"></div>
      </div>
    ),
    fundacion: '2023',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "Nuestra agenda es la tuya",
    historiaTexto: "Agenda Ciudadana emerge como un partido de corte progresista y civil. Busca incorporar las preocupaciones directas de los ciudadanos en las políticas públicas, enfocándose en transparencia radical, participación comunal y desarrollo tecnológico para solucionar problemas nacionales.",
    mision: "Construir políticas públicas con base en la participación directa de las comunidades.",
    vision: "Una democracia digital y participativa donde cada voz cuenta.",
    valores: ["Innovación", "Transparencia", "Ciudadanía", "Desarrollo"],
    fraseImpacto: "La política debe hacerse en las calles y las comunidades, no en escritorios cerrados.",
    historialVotos: [
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2023", hito: "Creación", desc: "Agrupación de colectivos ciudadanos." },
      { año: "2026", hito: "Elecciones 2026", desc: "Primera incursión en la papeleta presidencial." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Carlos Rojas', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  png: {
    id: 'png',
    nombre: 'Partido Nueva Generación',
    siglas: 'PNG',
    color: '#2563eb',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full bg-blue-600 items-center justify-center">
         <div className="w-20 h-20 bg-white/10 rounded-full border-2 border-white/40 shadow-xl"></div>
      </div>
    ),
    fundacion: '8 de julio de 2010',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "Gente nueva, ideas frescas",
    historiaTexto: "Nueva Generación fue creado por Sergio Mena y se ha destacado por su fuerte participación en elecciones municipales, logrando consolidar liderazgos locales. Promueve una visión de centro, con énfasis en el emprendimiento juvenil, el fortalecimiento de los gobiernos locales y la eficiencia.",
    mision: "Renovar los liderazgos políticos impulsando a las nuevas generaciones.",
    vision: "Liderar el desarrollo desde lo local hacia lo nacional con alcaldías fuertes.",
    valores: ["Juventud", "Municipalismo", "Eficiencia", "Descentralización"],
    fraseImpacto: "El cambio empieza en tu cantón con líderes de tu comunidad.",
    historialVotos: [
      { ano: "2014", porcentaje: 1.2, color: "#60a5fa" },
      { ano: "2018", porcentaje: 2.1, color: "#3b82f6" },
      { ano: "2022", porcentaje: 1.7, color: "#2563eb" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2010", hito: "Fundación", desc: "Creado por Sergio Mena Díaz." },
      { año: "2016", hito: "Municipales", desc: "Obtención de primeras alcaldías." },
      { año: "2020", hito: "Crecimiento", desc: "Logran varias alcaldías y regidurías a nivel nacional." },
      { año: "2024", hito: "Municipales", desc: "Revalidación de liderazgo en cantones clave." },
      { año: "2026", hito: "Elecciones 2026", desc: "Enfoque en desarrollo cantonal hacia lo nacional." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Sergio Mena', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  prsc: {
    id: 'prsc',
    nombre: 'Partido Republicano Social Cristiano',
    siglas: 'PRSC',
    color: '#ef4444',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/3 bg-blue-800"></div>
        <div className="h-1/3 bg-yellow-400"></div>
        <div className="h-1/3 bg-red-600"></div>
      </div>
    ),
    fundacion: '2014',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "Por los principios del calderonismo",
    historiaTexto: "El PRSC nace como una escisión del PUSC, agrupando a los sectores más leales al expresidente Rafael Ángel Calderón Fournier y reviviendo los colores y valores del histórico Partido Republicano Nacional de los años 40. Promueve las Garantías Sociales y el Código de Trabajo como sus pilares.",
    mision: "Defender y ampliar las conquistas sociales de la reforma de los años 40.",
    vision: "Un país con profundo sentido de solidaridad y garantías sociales inquebrantables.",
    valores: ["Socialcristianismo", "Garantías Sociales", "Familia", "Solidaridad"],
    fraseImpacto: "Los derechos sociales de ayer son nuestra obligación de defender hoy.",
    historialVotos: [
      { ano: "2018", porcentaje: 4.9, color: "#f87171" },
      { ano: "2022", porcentaje: 1.0, color: "#ef4444" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2014", hito: "Fundación", desc: "Separación del PUSC." },
      { año: "2018", hito: "Elecciones", desc: "Logra 2 diputaciones (Dragos Dolanescu y Otto Roberto Vargas)." },
      { año: "2024", hito: "Municipales", desc: "Alianza y obtención de escaños cantonales." },
      { año: "2026", hito: "Elecciones 2026", desc: "Agrupación en busca de recuperar su bancada legislativa." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Otto Roberto Vargas', puesto: 'Líder', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  pnt: {
    id: 'pnt',
    nombre: 'Partido Nuestro Tiempo',
    siglas: 'PNT',
    color: '#8b5cf6',
    escala: 'Provincial',
    imagen: '',
    bandera: (
      <div className="flex h-full w-full bg-violet-600 items-center justify-center">
        <Star size={48} className="text-white fill-white/20" />
      </div>
    ),
    fundacion: '2020',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "Es el tiempo de todos",
    historiaTexto: "Una agrupación provincial enfocada en la resolución de problemas locales, especialmente en áreas urbanas marginadas. Destaca por su uso de plataformas digitales para consultar a sus bases antes de tomar decisiones políticas.",
    mision: "Llevar la voz de las provincias marginadas al centro de decisión nacional.",
    vision: "Equidad territorial en la distribución de recursos e inversión.",
    valores: ["Equidad", "Modernidad", "Inclusión", "Desarrollo Local"],
    fraseImpacto: "El centro del país no es el único lugar que merece progreso.",
    historialVotos: [
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Miembro 1', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  pac2: {
    id: 'pac2',
    nombre: 'Partido Acción Ciudadana',
    siglas: 'PAC',
    color: '#d97706',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex h-full w-full">
        <div className="w-1/2 bg-yellow-500"></div>
        <div className="w-1/2 bg-red-600"></div>
      </div>
    ),
    fundacion: '3 de diciembre de 2000',
    vecesGobierno: 2,
    diputadosActuales: 0,
    lema: "La Costa Rica del Siglo XXI",
    historiaTexto: "Fundado por Ottón Solís como un partido ético y anticorrupción para romper el bipartidismo PLN-PUSC. Logró sacudir la política nacional y finalmente llegó al poder en 2014 con Luis Guillermo Solís y en 2018 con Carlos Alvarado, promoviendo derechos humanos, estabilización fiscal y descarbonización, aunque sufrió un duro desgaste electoral en 2022.",
    mision: "Promover la ética en la función pública, los derechos humanos y la sostenibilidad ambiental.",
    vision: "Un país carbono neutral, inclusivo y sin corrupción institucional.",
    valores: ["Ética", "Inclusión", "Ecología", "Derechos Humanos"],
    fraseImpacto: "La ética no es negociable, es la base de todo gobierno.",
    historialVotos: [
      { ano: "2002", porcentaje: 26.2, color: "#fef08a" },
      { ano: "2006", porcentaje: 39.8, color: "#fde047" },
      { ano: "2010", porcentaje: 25.1, color: "#facc15" },
      { ano: "2014", porcentaje: 30.6, color: "#eab308" },
      { ano: "2018", porcentaje: 21.6, color: "#ca8a04" },
      { ano: "2022", porcentaje: 0.6, color: "#a16207" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "2000", hito: "Fundación", desc: "Rompimiento del bipartidismo." },
      { año: "2014", hito: "1er Gobierno", desc: "Elección de Luis Guillermo Solís." },
      { año: "2018", hito: "2do Gobierno", desc: "Elección de Carlos Alvarado Quesada." },
      { año: "2022", hito: "Debacle", desc: "Salida de la Asamblea Legislativa." },
      { año: "2026", hito: "Elecciones 2026", desc: "Proceso de renovación para volver al parlamento." }
    ],
    listaGobiernos: [
      { año: "2014-2018", presidente: "Luis Guillermo Solís", obra: "Estabilización de precios y apertura de diálogo." },
      { año: "2018-2022", presidente: "Carlos Alvarado Quesada", obra: "Reforma Fiscal, Plan de Descarbonización y gestión de la pandemia." }
    ],
    integrantes: [
      { nombre: 'Fabián Solano', puesto: 'Presidente', fotoLocal: '' },
      { nombre: 'Margarita Bolaños', puesto: 'Ex-Presidenta', fotoLocal: '' },
      { nombre: 'Ottón Solís', puesto: 'Fundador', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  },
  pin: {
    id: 'pin',
    nombre: 'Partido Integración Nacional',
    siglas: 'PIN',
    color: '#1d4ed8',
    escala: 'Nacional',
    imagen: '',
    bandera: (
      <div className="flex flex-col h-full w-full">
        <div className="h-1/3 bg-blue-700"></div>
        <div className="h-1/3 bg-white flex items-center justify-center">
           <div className="w-12 h-12 rounded-full border-[6px] border-blue-700"></div>
        </div>
        <div className="h-1/3 bg-blue-700"></div>
      </div>
    ),
    fundacion: '1996',
    vecesGobierno: 0,
    diputadosActuales: 0,
    lema: "Con la fuerza de la experiencia",
    historiaTexto: "El PIN es liderado históricamente por el Dr. Walter Muñoz. Ha tenido participaciones intermitentes en la Asamblea Legislativa, alcanzando su mayor éxito en 2018 cuando llevó a Juan Diego Castro como candidato presidencial, logrando obtener 4 diputados. Se enfoca en temas de salud pública y soberanía.",
    mision: "Garantizar una salud pública de excelencia y defender la soberanía institucional.",
    vision: "Un estado que protege los servicios de salud como pilar fundamental de la calidad de vida.",
    valores: ["Salud Pública", "Soberanía", "Experiencia", "Nacionalismo"],
    fraseImpacto: "Sin salud no hay economía, sin soberanía no hay país.",
    historialVotos: [
      { ano: "1998", porcentaje: 1.4, color: "#93c5fd" },
      { ano: "2018", porcentaje: 9.5, color: "#3b82f6" },
      { ano: "2022", porcentaje: 0.4, color: "#1d4ed8" },
      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }
    ],
    historiaDetallada: [
      { año: "1996", hito: "Fundación", desc: "Creado por Dr. Walter Muñoz." },
      { año: "1998", hito: "Asamblea", desc: "Obtiene su primer diputado." },
      { año: "2018", hito: "Elecciones", desc: "Alcanza 4 escaños legislativos." }
    ],
    listaGobiernos: [],
    integrantes: [
      { nombre: 'Walter Muñoz', puesto: 'Presidente y Fundador', fotoLocal: '' },
      { nombre: 'Miembro 2', puesto: 'Secretario', fotoLocal: '' },
      { nombre: 'Miembro 3', puesto: 'Tesorero', fotoLocal: '' },
      { nombre: 'Miembro 4', puesto: 'Vocal', fotoLocal: '' },
      { nombre: 'Miembro 5', puesto: 'Representante', fotoLocal: '' },
      { nombre: 'Miembro 6', puesto: 'Delegado', fotoLocal: '' }
    ]
  }
};
