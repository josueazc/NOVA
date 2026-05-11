import React, { useState, useRef } from 'react';
import { 
  History, Trophy, Gavel, Download, UserPlus, 
  ChevronLeft, ChevronRight, CheckCircle2, Flag, 
  MapPin, Calendar, ExternalLink, FileText, Star,
  Shield, Landmark, Users, ArrowRight, List, X, BookOpen,
  Target, Eye, Compass, Quote, BarChart3, TrendingUp, ArrowLeft
} from 'lucide-react';

const PartyProfile = ({ party, onBack }) => {
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);
  const scrollContainer = useRef(null);

  const scrollCarousel = (direction) => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainer.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 pb-32 animate-in fade-in zoom-in-95 duration-500 transition-colors">
      
      {/* Botón Flotante para Regresar */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={onBack}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:bg-[#EF1C24] dark:hover:bg-[#EF1C24] hover:text-white text-slate-800 dark:text-slate-200 transition-all transform hover:-translate-x-1 group flex items-center gap-2 border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft size={24} />
          <span className="font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity w-0 group-hover:w-auto overflow-hidden">Regresar</span>
        </button>
      </div>

      {/* Header Bandera */}
      <section className="relative h-[45vh] flex items-end overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0 flex flex-col">
          {party.imagen ? (
            <img src={party.imagen} alt={party.nombre} className="w-full h-full object-cover" />
          ) : (
            party.bandera
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        <div className="w-full px-8 lg:px-16 2xl:px-24 pb-12 relative z-10 flex flex-col items-start gap-4">
          <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-black text-xs uppercase tracking-[0.3em] shadow-lg">
             {party.siglas} • Nivel {party.escala}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[1000] text-white tracking-tighter leading-[0.9] mb-2 drop-shadow-2xl">
            {party.nombre}
          </h1>
          <div className="flex items-center gap-4">
            <span className="h-1 w-12 rounded-full shadow-md" style={{ backgroundColor: party.color }}></span>
            <p className="text-white/90 text-lg md:text-xl font-bold uppercase tracking-[0.2em] drop-shadow-md">
              {party.lema}
            </p>
          </div>
        </div>
      </section>

      <main className="w-full px-8 lg:px-16 2xl:px-24 -mt-12 relative z-20 space-y-12">
        
        {/* ================== UPPER SECTION ================== */}
        {/* Dos Columnas: Izquierda Stats/Misión - Derecha Líderes */}
        <div className="grid xl:grid-cols-12 gap-10">
          
          <div className="xl:col-span-4 2xl:col-span-3 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors">
               <button 
                  className="w-full p-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform mb-4 flex items-center justify-center gap-3"
                  style={{ backgroundColor: party.color }}
               >
                  <Download size={18}/> Descargar Estatutos
               </button>
               <button className="w-full p-5 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-800 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
                  <UserPlus size={18}/> Formulario de Afiliación
               </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col items-center shadow-sm dark:shadow-none transition-colors">
                  <Trophy className="mb-2" size={28} style={{ color: party.color }}/>
                  <span className="text-4xl font-black">{party.vecesGobierno}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Gobiernos</span>
               </div>
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col items-center shadow-sm dark:shadow-none transition-colors">
                  <Gavel className="mb-2" size={28} style={{ color: party.color }}/>
                  <span className="text-4xl font-black">{party.diputadosActuales}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Diputados</span>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-8 transition-colors">
               <div className="space-y-3">
                  <div className="flex items-center gap-3" style={{ color: party.color }}>
                     <Target size={22}/>
                     <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white transition-colors">Nuestra Misión</h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-300 text-sm font-medium leading-relaxed italic transition-colors">"{party.mision}"</p>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3" style={{ color: party.color }}>
                     <Eye size={22}/>
                     <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white transition-colors">Nuestra Visión</h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-300 text-sm font-medium leading-relaxed transition-colors">{party.vision}</p>
               </div>
               <div className="pt-6 border-t border-slate-50 dark:border-slate-700 flex flex-wrap gap-2 transition-colors">
                  {party.valores.map(v => (
                    <span 
                      key={v} 
                      className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm"
                      style={{ backgroundColor: `${party.color}15`, color: party.color, border: `1px solid ${party.color}30` }}
                    >
                      {v}
                    </span>
                  ))}
               </div>
            </div>
          </div>

          <div className="xl:col-span-8 2xl:col-span-9 flex flex-col gap-8">
            {party.integrantes && party.integrantes.length > 0 && (
              <section className="bg-white dark:bg-slate-800 p-10 rounded-[3.5rem] shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="flex items-center justify-between mb-8 px-2">
                  <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-4 dark:text-white transition-colors">
                    <Users size={24} className="text-slate-300 dark:text-slate-500" /> Líderes Actuales
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => scrollCarousel('left')} className="p-3 rounded-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all text-slate-900 dark:text-slate-100"><ChevronLeft size={18}/></button>
                    <button onClick={() => scrollCarousel('right')} className="p-3 rounded-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all text-slate-900 dark:text-slate-100"><ChevronRight size={18}/></button>
                  </div>
                </div>
                <div ref={scrollContainer} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none' }}>
                  {party.integrantes.map((int, i) => (
                    <div key={i} className="min-w-[140px] snap-center group">
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl overflow-hidden mb-4 mx-auto border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:border-slate-200 dark:group-hover:border-slate-600 transition-all bg-slate-100 dark:bg-slate-700" style={{ borderColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${party.color}30`} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                        <img 
                          src={int.fotoLocal || `https://api.dicebear.com/7.x/avataaars/svg?seed=${int.nombre}&backgroundColor=f1f5f9`} 
                          alt={int.nombre} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white text-center transition-colors">{int.nombre}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase text-center mt-1">{int.puesto}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Frase Inspiradora movida para llenar el espacio de la derecha */}
            <div className="bg-slate-900 p-10 lg:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center w-full">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full blur-[100px]" style={{ backgroundColor: `${party.color}40` }}></div>
               <Quote className="text-white/20 mb-6 relative z-10" size={60}/>
               <p className="text-3xl lg:text-5xl font-[1000] tracking-tight text-white leading-[1.2] italic max-w-4xl mx-auto relative z-10">
                 "{party.fraseImpacto}"
               </p>
            </div>
          </div>
        </div>

        {/* ================== LOWER SECTION (Rectángulos Apilados a lo ancho) ================== */}
        <div className="space-y-12">
           
           {/* Historia Narrativa (Rectángulo ancho) */}
           <section className="bg-white dark:bg-slate-800 p-10 lg:p-14 rounded-[3.5rem] shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-start gap-10 w-full transition-colors">
             <div className="flex-shrink-0 md:w-1/4">
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-4 rounded-3xl" style={{ backgroundColor: `${party.color}15`, color: party.color }}><BookOpen size={28} /></div>
                 <h3 className="text-2xl font-[1000] tracking-tighter uppercase dark:text-white transition-colors">Nuestra Historia</h3>
               </div>
             </div>
             <p className="text-slate-600 dark:text-slate-300 text-lg lg:text-xl leading-relaxed font-medium md:w-3/4 transition-colors">
               <span className="text-5xl font-black mr-3 float-left leading-none" style={{ color: party.color }}>
                 {party.historiaTexto.charAt(0)}
               </span>
               {party.historiaTexto.substring(1)}
             </p>
           </section>

           {/* Línea del Tiempo (Rectángulo ancho horizontal) */}
           {party.historiaDetallada && party.historiaDetallada.length > 0 && (
             <section className="bg-white dark:bg-slate-800 p-10 lg:p-14 rounded-[3.5rem] shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 w-full transition-colors">
                <div className="flex items-center gap-4 mb-10">
                   <div className="p-4 rounded-3xl" style={{ backgroundColor: `${party.color}15`, color: party.color }}><History size={28} /></div>
                   <h3 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-800 dark:text-white transition-colors">Hitos Clave</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="flex flex-col gap-6 border-l-2 border-slate-100 dark:border-slate-700 pl-6 transition-colors">
                    {party.historiaDetallada.map((h, i) => (
                      <button key={i} onClick={() => setActiveHistoryIndex(i)} className={`flex items-center gap-4 transition-all text-left ${activeHistoryIndex === i ? 'scale-105 ml-2' : 'opacity-40 hover:opacity-100'}`}>
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${activeHistoryIndex === i ? 'ring-8 ring-slate-100 dark:ring-slate-700' : 'bg-slate-300 dark:bg-slate-600'}`} style={activeHistoryIndex === i ? { backgroundColor: party.color } : {}}></div>
                        <div>
                          <span className="text-sm font-black tracking-widest text-slate-800 dark:text-white block transition-colors">{h.año}</span>
                          {activeHistoryIndex !== i && <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] block transition-colors">{h.hito}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700 p-10 rounded-[2.5rem] animate-in fade-in slide-in-from-right-4 duration-500 transition-colors">
                     <h4 className="text-3xl font-[1000] mb-4 tracking-tighter" style={{ color: party.color }}>{party.historiaDetallada[activeHistoryIndex].hito}</h4>
                     <p className="text-slate-500 dark:text-slate-300 text-lg font-medium leading-relaxed transition-colors">{party.historiaDetallada[activeHistoryIndex].desc}</p>
                  </div>
                </div>
             </section>
           )}

           {/* Gráfica de Historial Electoral (Rectángulo ancho) */}
           {party.historialVotos && party.historialVotos.length > 0 && (
             <section className="bg-white dark:bg-slate-800 p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none w-full transition-colors">
                <div className="flex items-center justify-between mb-10 border-b border-slate-50 dark:border-slate-700 pb-6 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="p-4 rounded-3xl" style={{ backgroundColor: `${party.color}15`, color: party.color }}><BarChart3 size={28} /></div>
                      <h3 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-800 dark:text-white transition-colors">Resultados Presidenciales</h3>
                   </div>
                   <div className="text-xs font-black uppercase text-slate-400 tracking-widest hidden sm:block">Primera Ronda</div>
                </div>
                
                <div className="flex items-end justify-around h-[250px] mt-6">
                   {party.historialVotos.map((data, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center group">
                        <div className="mb-3 text-sm font-black text-slate-400 opacity-50 group-hover:opacity-100 transition-opacity">{data.porcentaje}%</div>
                        <div 
                          className="w-12 sm:w-16 lg:w-24 rounded-t-2xl transition-all duration-1000 hover:scale-105 shadow-lg relative"
                          style={{ 
                             height: `${data.porcentaje * 4}px`, 
                             backgroundColor: data.color || party.color,
                             boxShadow: `0 10px 30px -10px ${data.color || party.color}80` 
                          }}
                        >
                        </div>
                        <span className="mt-4 text-sm font-black text-slate-800 dark:text-white tracking-widest transition-colors">{data.ano}</span>
                     </div>
                   ))}
                </div>
             </section>
           )}

        {/* Galería de Gobiernos (Rectángulo ancho con grid interno) */}
        {party.listaGobiernos && party.listaGobiernos.length > 0 && (
          <section className="bg-white dark:bg-slate-800 p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none w-full transition-colors">
             <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-3xl" style={{ backgroundColor: `${party.color}15`, color: party.color }}><Landmark size={28} /></div>
                <h3 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-800 dark:text-white transition-colors">El Legado en el Poder</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {party.listaGobiernos.map((gob, i) => (
                  <div key={i} className="group relative bg-slate-50 dark:bg-slate-700 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-600 hover:-translate-y-2 hover:shadow-xl transition-all h-full flex flex-col justify-center items-start text-left">
                     <span className="text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-4" style={{ backgroundColor: `${party.color}15`, color: party.color }}>{gob.año}</span>
                     <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight transition-colors">{gob.presidente}</h4>
                     <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed transition-colors">
                        {gob.obra || gob.hito}
                     </p>
                  </div>
                ))}
             </div>
          </section>
        )}

        </div>
      </main>
    </div>
  );
};

export default PartyProfile;
