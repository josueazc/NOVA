import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowDownAZ, ArrowUpAZ,
  MapPin, Calendar, CheckCircle2,
  Zap, Star, Shield, Target, ChevronRight
} from 'lucide-react';
import PartyProfile from './PartyProfile';
import { partidosData } from '../../../data/partidosData';

const PartidosView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [selectedParty, setSelectedParty] = useState(null);

  // Obtener el array de partidos desde la data centralizada
  const partidos = useMemo(() => Object.values(partidosData), []);

  const processedPartidos = useMemo(() => {
    return partidos
      .filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.siglas.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'asc') return a.nombre.localeCompare(b.nombre);
        return b.nombre.localeCompare(a.nombre);
      });
  }, [searchTerm, sortBy, partidos]);

  // Si hay un partido seleccionado, renderizamos su perfil completo
  if (selectedParty) {
    return (
      <PartyProfile 
        party={selectedParty} 
        onBack={() => setSelectedParty(null)} 
      />
    );
  }

  // De lo contrario, mostramos el dashboard principal de partidos
  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 pb-24 pt-12 flex-grow border-t border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-24">
        
        {/* BLOQUE DE INFO: Sin contenedor, integrado al fondo */}
        <div className="mb-20 flex flex-col lg:flex-row gap-16 items-center justify-between">
           
           {/* Lado Izquierdo: Textos y Buscador flotante */}
           <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white text-[#002B7F] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF1C24]"></span>
                </span>
                Directorio Oficial 2026
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-[1000] tracking-tighter leading-[0.85] text-slate-900">
                Mapa de <br />
                <span className="text-[#002B7F]">Agrupaciones</span>
              </h1>
              
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
                Filtra y explora las propuestas, líderes y bases ideológicas inscritas para nuestro próximo proceso electoral.
              </p>

              {/* Buscador grande e integrado */}
              <div className="relative group w-full max-w-md mt-4">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#002B7F] transition-colors" size={24} />
                 <input 
                   type="text" 
                   placeholder="Escribe un partido o siglas..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="bg-white border-none rounded-full py-5 pl-16 pr-6 text-base font-bold outline-none focus:ring-4 focus:ring-[#002B7F]/10 w-full transition-all shadow-xl shadow-slate-200/50"
                 />
              </div>
           </div>

           {/* Lado Derecho: Tiles individuales flotantes */}
           <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Tarjeta de Estadísticas General */}
                 <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center sm:col-span-2 relative overflow-hidden group">
                   <div className="absolute right-0 top-0 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
                     <Shield size={200} />
                   </div>
                   <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 relative z-10">Total Inscritos</h4>
                   <div className="flex items-end gap-3 relative z-10">
                     <span className="text-6xl lg:text-7xl font-black text-[#002B7F] tracking-tighter leading-none">{partidos.length}</span>
                     <span className="text-[#EF1C24] font-black uppercase text-sm mb-2">Oficiales</span>
                   </div>
                 </div>

                 <InfoTile label="Escalas Activas" value="Nac/Prov" icon={<Target size={28}/>} />
                 
                 <div className="bg-[#002B7F] p-8 rounded-[3rem] shadow-xl border border-blue-800 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-[#00174A] transition-colors relative overflow-hidden">
                    <Calendar size={32} className="text-[#EF1C24] mb-4" />
                    <h3 className="text-xl font-black text-white">Hitos 2026</h3>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mt-2">Ver Calendario</p>
                 </div>
              </div>
           </div>
        </div>

        {/* CONTROLES DE LA CUADRÍCULA */}
        <div className="flex justify-between items-center mb-10 px-2">
           <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Resultados: {processedPartidos.length}</h4>
           <button 
             onClick={() => setSortBy(sortBy === 'asc' ? 'desc' : 'asc')}
             className="bg-white p-3 rounded-xl shadow-sm text-[#002B7F] flex items-center gap-2 border border-slate-100 hover:shadow-md transition-all active:scale-95"
           >
             <span className="text-[10px] font-black uppercase tracking-widest">Orden {sortBy === 'asc' ? 'Z-A' : 'A-Z'}</span>
             {sortBy === 'asc' ? <ArrowDownAZ size={18} /> : <ArrowUpAZ size={18} />}
           </button>
        </div>

        {/* GRID DE PARTIDOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
          {processedPartidos.map(p => (
             <PartyCard 
               key={p.id} 
               party={p} 
               onClick={() => setSelectedParty(p)} 
             />
          ))}
        </div>
      </main>
    </div>
  );
};

const PartyCard = ({ party, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-[3rem] p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#002B7F]/10 transition-all duration-500 hover:-translate-y-4 group cursor-pointer border border-white hover:border-slate-100 flex flex-col h-[420px] relative overflow-hidden"
  >
    
    {/* Contenedor de bandera */}
    <div className="w-full h-56 rounded-[2rem] overflow-hidden shadow-inner mb-6 relative z-10 flex-shrink-0 bg-slate-100">
      <div className="absolute inset-0 bg-black/15 z-20 pointer-events-none group-hover:bg-black/0 transition-colors duration-700"></div>
      <div className="absolute inset-0 border border-black/10 z-30 pointer-events-none"></div>
      <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
        {party.imagen ? (
          <img src={party.imagen} alt={`Bandera de ${party.nombre}`} className="w-full h-full object-cover" />
        ) : (
          party.bandera
        )}
      </div>
    </div>

    <div className="px-2 flex flex-col items-center text-center flex-grow relative z-10 justify-center">
      <div className="bg-slate-50 px-5 py-2 rounded-xl group-hover:bg-[#002B7F] group-hover:text-white transition-colors duration-500 mb-4 shadow-sm">
        <span className="text-lg font-black tracking-tighter transition-colors duration-500 group-hover:!text-white" style={{ color: party.color }}>
          {party.siglas}
        </span>
      </div>
      <h3 className="text-2xl font-[1000] tracking-tighter text-slate-800 leading-[1.1] group-hover:text-[#002B7F] transition-colors duration-300">
        {party.nombre}
      </h3>
    </div>

    {/* Fondo decorativo */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

    {/* Botón flotante */}
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
      <div className="bg-[#EF1C24] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all cursor-pointer">
        <ChevronRight size={24} className="ml-0.5" />
      </div>
    </div>
  </div>
);

const InfoTile = ({ label, value, icon }) => (
  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50">
    <div className="text-slate-300 mb-4">{icon}</div>
    <div className="text-3xl font-black text-[#002B7F] tracking-tighter mb-1">{value}</div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</div>
  </div>
);

export default PartidosView;
