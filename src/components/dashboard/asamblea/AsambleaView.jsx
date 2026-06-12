import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, Users, Calendar, MapPin, Clock, 
  Landmark, CheckCircle, BrainCircuit, Sparkles, 
  History, Landmark as AssemblyIcon, XCircle, Timer, BarChart3, Star, Bell,
  BookOpen, ChevronRight, ChevronDown, Gavel, ExternalLink, Info
} from 'lucide-react';

const DIPUTADOS_FULL = [
  // SAN JOSÉ (18)
  { name: "Anna Katharina Müller Castro", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Antonio Barzuna Thompson", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Sadie Britton González", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "José Miguel Villalobos Umaña", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Zaira Murillo Marín", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Gerardo Bogantes Rivera", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Cindy Blanco González", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Yara Jiménez Fallas", province: "San José", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Álvaro Ramírez Bogantes", province: "San José", party: "PLN", color: "#10b981" },
  { name: "Iztarú Alfaro Guerrero", province: "San José", party: "PLN", color: "#10b981" },
  { name: "Rafael Ángel Vargas Brenes", province: "San José", party: "PLN", color: "#10b981" },
  { name: "Andrea Valverde Palavicini", province: "San José", party: "PLN", color: "#10b981" },
  { name: "Marco Badilla Chavarría", province: "San José", party: "PLN", color: "#10b981" },
  { name: "José María Villalta", province: "San José", party: "Frente Amplio", color: "#f59e0b" },
  { name: "Vianey Mora Vega", province: "San José", party: "Frente Amplio", color: "#f59e0b" },
  { name: "María Eugenia Román Mora", province: "San José", party: "Frente Amplio", color: "#f59e0b" },
  { name: "Abril Gordienko López", province: "San José", party: "PUSC", color: "#ef4444" },
  { name: "Claudia Vanessa Dobles Camargo", province: "San José", party: "Agenda Ciudadana", color: "#8b5cf6" },

  // ALAJUELA (12)
  { name: "Kattia Mora Montoya", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Stephan Brunner", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Mayuli Ortega", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Gonzalo Ramírez Zamora", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Wilson Jiménez Cordero", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Fernando Obaldía Álvarez", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Royner Mora Ruiz", province: "Alajuela", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Diana Murillo Murillo", province: "Alajuela", party: "PLN", color: "#10b981" },
  { name: "Eder Hernández Ulloa", province: "Alajuela", party: "PLN", color: "#10b981" },
  { name: "Karen Alfaro Jiménez", province: "Alajuela", party: "PLN", color: "#10b981" },
  { name: "Antonio Trejos Mazariegos", province: "Alajuela", party: "Frente Amplio", color: "#f59e0b" },
  { name: "Joselyn Sáenz Núñez", province: "Alajuela", party: "Frente Amplio", color: "#f59e0b" },

  // CARTAGO (6)
  { name: "Kattia Ulate Alvarado", province: "Cartago", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Grethel Ávila Vargas", province: "Cartago", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Robert Barrantes Camacho", province: "Cartago", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Janice Sandí Morales", province: "Cartago", party: "PLN", color: "#10b981" },
  { name: "Salvador Padilla Villanueva", province: "Cartago", party: "PLN", color: "#10b981" },
  { name: "Sigrid Segura Artavia", province: "Cartago", party: "Frente Amplio", color: "#f59e0b" },

  // HEREDIA (5)
  { name: "Daniel Siezar Cárdenas", province: "Heredia", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Cindy Murillo Artavia", province: "Heredia", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Víctor Hidalgo Solís", province: "Heredia", party: "PLN", color: "#10b981" },
  { name: "Ángela Aguilar Vargas", province: "Heredia", party: "PLN", color: "#10b981" },
  { name: "Edgardo Araya Sibaja", province: "Heredia", party: "Frente Amplio", color: "#f59e0b" },

  // GUANACASTE (5)
  { name: "Juan Manuel Quesada Espinoza", province: "Guanacaste", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Nayuribe Guadamuz Rosales", province: "Guanacaste", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Osvaldo Artavia Carballo", province: "Guanacaste", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Ronald Campos Villegas", province: "Guanacaste", party: "PLN", color: "#10b981" },
  { name: "Karol Matamoros Montoya", province: "Guanacaste", party: "PLN", color: "#10b981" },

  // PUNTARENAS (6)
  { name: "Ariel Mora Fallas", province: "Puntarenas", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Ana Ruth Esquivel Medrano", province: "Puntarenas", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Kristel Ward Hudson", province: "Puntarenas", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Reynaldo Arias Mora", province: "Puntarenas", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Norjelens Lobo Vargas", province: "Puntarenas", party: "PLN", color: "#10b981" },
  { name: "Jesús Calderón Calderón", province: "Puntarenas", party: "PLN", color: "#10b981" },

  // LIMÓN (5)
  { name: "Marta Esquivel Rodríguez", province: "Limón", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "María Isabel Camareno Camareno", province: "Limón", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Kathia Calvo Cruz", province: "Limón", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Jorge Obaldía (PPSO)", province: "Limón", party: "Pueblo Soberano", color: "#3b82f6" },
  { name: "Mangell McLean Villalobos", province: "Limón", party: "PLN", color: "#10b981" },
];

const AsambleaView = () => {
  const [hoveredDiputado, setHoveredDiputado] = useState(null);
  const [activeTab, setActiveTab] = useState('proyectos');
  const [openFaq, setOpenFaq] = useState(null);

  const dots = useMemo(() => {
    const sorted = [...DIPUTADOS_FULL].sort((a, b) => a.party.localeCompare(b.party));
    const rows = [
      { max: 16, radius: 240 },
      { max: 19, radius: 340 },
      { max: 22, radius: 440 }
    ];
    let result = [];
    let idx = 0;
    rows.forEach(r => {
      for (let i = 0; i < r.max; i++) {
        if (idx < sorted.length) {
          const angle = Math.PI + 0.15 + (i / (r.max - 1)) * (Math.PI - 0.3);
          result.push({ 
            ...sorted[idx], 
            x: 500 + r.radius * Math.cos(angle), 
            y: 500 + r.radius * Math.sin(angle), 
            id: idx 
          });
          idx++;
        }
      }
    });
    return result;
  }, []);

  const faqs = [
    {
      q: "¿Cuánto gana un diputado en Costa Rica?",
      a: "El salario bruto de un diputado se compone de una remuneración básica más gastos de representación, rondando los 4 millones de colones mensuales. A este monto se le aplican rebajos de ley como impuestos sobre la renta y contribuciones sociales."
    },
    {
      q: "¿Se pueden reelegir los diputados?",
      a: "No de forma sucesiva. En Costa Rica, los diputados deben esperar al menos un periodo legislativo completo (4 años) antes de poder volver a postularse para el cargo."
    },
    {
      q: "¿Cuántos votos se necesitan para aprobar una ley?",
      a: "Para la mayoría de las leyes ordinarias se necesita mayoría simple (la mitad más uno de los diputados presentes). Para reformas constitucionales, empréstitos internacionales o nombramientos clave, se requieren mayorías calificadas, usualmente 38 votos (dos tercios del plenario)."
    },
    {
      q: "¿Cómo se eligen a los diputados?",
      a: "Se eligen de forma directa mediante un sistema de representación proporcional (cociente y subcociente) dividido en listas cerradas y bloqueadas por provincia. La provincia de San José elige 19, Alajuela 11, Cartago 7, Heredia 6, Guanacaste 4, Puntarenas 5 y Limón 5."
    }
  ];

  return (
    <div className="w-full text-ink font-sans animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 pb-20 transition-colors">
      <main className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-24 space-y-24">
        
        {/* Sección 1: ¿Qué es la Asamblea? e Historia */}
        <section id="historia" className="grid xl:grid-cols-2 gap-16 items-start w-full">
           <div className="space-y-8 w-full">
              <div className="space-y-4">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic transition-colors">Sobre la Institución</span>
                <h2 className="text-6xl lg:text-7xl font-black text-[#001D4A] dark:text-white tracking-tighter leading-none uppercase italic transition-colors">¿Qué es la <br/> Asamblea?</h2>
                <p className="text-slate-500 dark:text-slate-300 font-medium text-xl leading-relaxed max-w-2xl transition-colors">
                  Es el **Primer Poder de la República**, donde reside el Poder Legislativo. Su función principal es dictar, reformar y derogar las leyes que rigen a Costa Rica.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 w-full transition-colors">
                <div className="flex items-center gap-3 text-red-600">
                  <History size={28} />
                  <h4 className="font-black uppercase text-sm tracking-widest">Un poco de Historia</h4>
                </div>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic transition-colors">
                  Desde la Constitución de 1949, la Asamblea Legislativa adoptó su forma actual unicameral (una sola cámara). Ha sido el pilar de la abolición del ejército y el desarrollo del estado social de derecho en nuestra nación.
                </p>
                <div className="pt-6 mt-4 flex gap-4 border-t border-slate-100 dark:border-slate-700 transition-colors">
                  <div className="flex-1 text-center border-r border-slate-100 dark:border-slate-700 transition-colors">
                    <p className="text-4xl font-black text-blue-600">1949</p>
                    <p className="text-[10px] lg:text-xs uppercase font-bold text-slate-400 mt-1">Constitución Actual</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-4xl font-black text-blue-600">57</p>
                    <p className="text-[10px] lg:text-xs uppercase font-bold text-slate-400 mt-1">Curules Fijas</p>
                  </div>
                </div>
              </div>
           </div>

           <div className="relative group w-full h-full flex">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-[4rem] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="bg-white dark:bg-slate-800 rounded-[4rem] border border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-xl w-full flex flex-col transition-colors">
                <div className="p-10 lg:p-12 bg-[#001D4A] dark:bg-slate-900 text-white transition-colors">
                  <BookOpen size={40} className="mb-4 text-blue-400" />
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter">Funciones Clave</h3>
                </div>
                <div className="p-10 lg:p-12 space-y-8 flex-grow flex flex-col justify-center">
                  {[
                    { t: "Legislar", d: "Crear, reformar y derogar normas jurídicas para el bienestar común. Es la principal herramienta para adaptar el marco legal al país." },
                    { t: "Control Político", d: "Supervisar las acciones del Poder Ejecutivo e instituciones. Incluye crear comisiones y llamar a comparecer a jerarcas." },
                    { t: "Presupuesto", d: "Aprobar los gastos del Estado cada año, decidiendo cómo se invierten los recursos públicos recolectados." },
                    { t: "Nombramientos", d: "Elegir Magistrados de la Corte Suprema, Contralor General y Defensor de los Habitantes, garantizando el equilibrio." },
                    { t: "Tratados Int.", d: "Aprobar o improbar los convenios internacionales y acuerdos diplomáticos, integrándolos al ordenamiento." }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-1 transition-colors">
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <h5 className="font-black text-[#001D4A] dark:text-white uppercase text-sm italic tracking-widest mb-1 transition-colors">{f.t}</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">{f.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </section>

        {/* Sección 2: Hemiciclo (El Mapa) */}
        <section id="hemiciclo" className="space-y-12 text-center bg-white dark:bg-slate-800 rounded-[4rem] p-8 lg:p-16 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden w-full relative transition-colors">
           <div className="space-y-4 relative z-10">
              <h3 className="text-4xl lg:text-5xl font-black text-[#001D4A] dark:text-white uppercase tracking-tighter italic transition-colors">Distribución del Plenario</h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">Pasa el cursor sobre un punto para identificar al diputado</p>
           </div>
           
           <div className="relative flex justify-center py-10 min-h-[500px] lg:min-h-[600px] w-full items-center">
              <svg viewBox="0 0 1000 600" className="w-full max-w-5xl overflow-visible filter drop-shadow-2xl">
                 {dots.map((d) => (
                    <circle 
                      key={d.id} 
                      cx={d.x} cy={d.y} r="16" 
                      fill={d.color} 
                      className="cursor-pointer transition-all duration-300 hover:stroke-white hover:stroke-[4px]"
                      onMouseEnter={() => setHoveredDiputado(d)}
                      onMouseLeave={() => setHoveredDiputado(null)}
                      style={{ 
                        transform: hoveredDiputado?.id === d.id ? 'scale(1.5)' : 'scale(1)',
                        transformOrigin: `${d.x}px ${d.y}px`,
                        opacity: hoveredDiputado && hoveredDiputado.id !== d.id ? 0.3 : 1
                      }}
                    />
                 ))}
                 <path d="M400,530 h200 v40 q0,10 -10,10 h-180 q-10,0 -10,-10 z" className="fill-[#001D4A] dark:fill-slate-700 transition-colors" />
                 <text x="500" y="555" textAnchor="middle" fill="white" className="text-xs font-black uppercase tracking-widest italic">Directorio Legislativo</text>
              </svg>

              {hoveredDiputado && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-700 w-96 text-center animate-in zoom-in-95 duration-200 z-30 pointer-events-none transition-colors">
                   <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4 italic">Diputado de la República</p>
                   <h5 className="font-black text-[#001D4A] dark:text-white uppercase text-2xl leading-tight mb-4 italic tracking-tighter transition-colors">
                      {hoveredDiputado.name}
                   </h5>
                   <div className="inline-block px-5 py-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-8 transition-colors">
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest italic transition-colors">{hoveredDiputado.party}</p>
                   </div>
                   <div className="pt-6 border-t border-slate-100 dark:border-slate-700 transition-colors">
                      <p className="text-xs font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 italic">
                        <MapPin size={16} className="text-red-500" /> Provincia de {hoveredDiputado.province}
                      </p>
                   </div>
                </div>
              )}
           </div>

           <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto pt-10 border-t border-slate-50 dark:border-slate-700 relative z-10 transition-colors">
              {[
                { label: "Pueblo Soberano", color: "#3b82f6" },
                { label: "PLN", color: "#10b981" },
                { label: "Frente Amplio", color: "#f59e0b" },
                { label: "PUSC", color: "#ef4444" },
                { label: "Agenda Ciudadana", color: "#8b5cf6" }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors">
                   <div className="w-4 h-4 rounded-full" style={{background: p.color}}></div>
                   <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-tighter italic transition-colors">{p.label}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Sección 3: Proyectos Aprobados y Desaprobados */}
        <section id="proyectos" className="space-y-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-[#001D4A] dark:text-white uppercase tracking-tighter italic transition-colors">Control de Leyes</h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">Estado actual de las iniciativas legislativas 2024</p>
            </div>
            <div className="flex bg-white dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm self-start md:self-end transition-colors">
              <button 
                onClick={() => setActiveTab('proyectos')}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'proyectos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                Aprobados
              </button>
              <button 
                onClick={() => setActiveTab('desaprobados')}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'desaprobados' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                Archivados
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === 'proyectos' ? [
              { title: "Ley Jaguar", id: "Exp. 24.364", desc: "Reforma a la Ley de Contratación Pública.", status: "Aprobado 1er Debate", color: "bg-green-500" },
              { title: "Gestión de Aguas", id: "Exp. 23.411", desc: "Modernización del sistema de acueductos.", status: "Ley de la República", color: "bg-blue-500" },
              { title: "Seguridad Digital", id: "Exp. 22.901", desc: "Protección contra ataques cibernéticos.", status: "Aprobado", color: "bg-green-500" }
            ] : [
              { title: "Impuesto al Lujo", id: "Exp. 21.500", desc: "Propuesta de gravamen a bienes suntuarios.", status: "Archivado", color: "bg-slate-400" },
              { title: "Reforma Educativa", id: "Exp. 20.120", desc: "Cambios curriculares en secundaria.", status: "Rechazado", color: "bg-red-400" },
              { title: "Jornadas 4-3", id: "Exp. 21.182", desc: "Propuesta de horarios laborales extendidos.", status: "Inconstitucional", color: "bg-red-500" }
            ]).map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                    {activeTab === 'proyectos' ? <Gavel size={28} /> : <XCircle size={28} />}
                  </div>
                  <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-700 px-4 py-1.5 rounded-full text-slate-500 dark:text-slate-300 uppercase tracking-widest italic transition-colors">{item.id}</span>
                </div>
                <h4 className="text-2xl font-black text-[#001D4A] dark:text-white uppercase italic tracking-tighter mb-4 transition-colors">{item.title}</h4>
                <p className="text-sm text-slate-400 font-bold mb-8 italic leading-relaxed">{item.desc}</p>
                <div className="pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between transition-colors">
                  <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">{item.status}</span>
                  <ChevronRight size={20} className="text-slate-300 dark:text-slate-500 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección 4: Calendario Legislativo y FAQ */}
        <section id="calendario" className="grid xl:grid-cols-2 gap-16 items-start w-full">
           <div className="bg-[#001D4A] dark:bg-slate-900 p-12 lg:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden w-full h-full flex flex-col transition-colors">
              <Calendar size={250} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
              <div className="relative z-10 space-y-10 flex-grow">
                <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-none">Próximas <br/> Sesiones</h3>
                <div className="space-y-8">
                  {[
                    { date: "15 May", event: "Sesión Plenaria Ordinaria", time: "2:45 PM" },
                    { date: "18 May", event: "Comisión de Hacendarios", time: "9:00 AM" },
                    { date: "20 May", event: "Votación Segundo Debate", time: "3:30 PM" }
                  ].map((ev, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="bg-blue-600 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                        <span className="text-[10px] lg:text-xs font-black uppercase leading-none opacity-70">{ev.date.split(' ')[1]}</span>
                        <span className="text-2xl lg:text-3xl font-black leading-none mt-1">{ev.date.split(' ')[0]}</span>
                      </div>
                      <div>
                        <h5 className="font-black uppercase text-base lg:text-lg italic tracking-tighter">{ev.event}</h5>
                        <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mt-1">{ev.time} • Edificio Legislativo</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>

           <div className="space-y-10 w-full">
              <div className="bg-white dark:bg-slate-800 p-10 lg:p-12 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm w-full transition-colors">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 transition-colors">
                       <Timer size={28} />
                    </div>
                    <h4 className="font-black text-[#001D4A] dark:text-white text-2xl uppercase italic tracking-tighter leading-none transition-colors">Tiempos de <br/> Debate</h4>
                 </div>
                 <p className="text-slate-500 dark:text-slate-300 font-medium text-base leading-relaxed mb-8 transition-colors">
                    Cada fracción tiene tiempos asignados por el Reglamento de la Asamblea para discutir proyectos. Esto asegura un debate democrático y ordenado.
                 </p>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                       <span>Uso de Palabra</span>
                       <span>Promedio 15 min</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-red-600" style={{width: '65%'}}></div>
                    </div>
                 </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-white dark:bg-slate-800 p-10 lg:p-12 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm w-full transition-colors">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl text-slate-600 dark:text-slate-300 transition-colors">
                       <Info size={28} />
                    </div>
                    <h4 className="font-black text-[#001D4A] dark:text-white text-2xl uppercase italic tracking-tighter leading-none transition-colors">Preguntas <br/> Frecuentes</h4>
                 </div>
                 
                 <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden transition-all">
                        <button 
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full p-5 text-left flex justify-between items-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <span className="font-bold text-slate-700 dark:text-slate-200 text-sm md:text-base italic transition-colors">{faq.q}</span>
                          <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaq === index && (
                          <div className="p-5 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 transition-colors">
                            <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium transition-colors">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Call to action: Visitar sitio web oficial */}
        <section className="w-full flex justify-center pb-12">
            <a 
              href="https://www.asamblea.go.cr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-[#001D4A] to-blue-900 dark:from-slate-800 dark:to-slate-900 px-10 py-8 rounded-[3rem] shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all w-full max-w-4xl"
            >
              <div className="bg-white/10 p-5 rounded-2xl text-white group-hover:scale-110 transition-transform">
                <ExternalLink size={36} />
              </div>
              <div className="text-center md:text-left flex-grow">
                <h4 className="text-2xl lg:text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Visita el Sitio Oficial</h4>
                <p className="text-blue-200 font-medium text-sm md:text-base">Accede a transmisiones en vivo, proyectos de ley completos y actas de las comisiones directamente desde el portal oficial de la Asamblea Legislativa de Costa Rica.</p>
              </div>
              <div className="bg-white dark:bg-slate-700 text-[#001D4A] dark:text-white w-14 h-14 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-slate-600 transition-colors">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
        </section>

      </main>
    </div>
  );
};

export default AsambleaView;
