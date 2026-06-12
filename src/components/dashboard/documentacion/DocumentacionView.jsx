import React from 'react';
import { Landmark } from 'lucide-react';
import ManualUsuario from './ManualUsuario';
import TechStack from './TechStack';
import SystemDiagrams from './SystemDiagrams';
import DatabaseTables from './DatabaseTables';

const DocumentacionView = () => {
  return (
    <div className="w-full font-sans pb-24 animate-in fade-in duration-500 transition-colors">
      
      {/* Header (VOTEON) */}
      <div className="bg-[#001D4A] dark:bg-slate-950 text-white py-16 px-6 lg:px-24 rounded-b-[3rem] shadow-xl relative overflow-hidden shrink-0 transition-colors">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#EF1C24] rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Landmark size={48} className="text-[#EF1C24]" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">VOTEON</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-200 font-medium max-w-3xl leading-relaxed">
            Documentación Técnica Integral y Manual de Usuario
          </p>
        </div>
      </div>

      {/* Main Content Area - Separated from Header by -mt-8 to overlap slightly and create depth */}
      <div className="max-w-[1200px] mx-auto px-6 mt-12 relative z-20 space-y-24">
        
        {/* 1. MANUAL DE USUARIO */}
        <ManualUsuario />

        {/* 2. TECNOLOGÍAS UTILIZADAS */}
        <TechStack />

        {/* 3. DICCIONARIO DE DATOS (TABLAS) */}
        <DatabaseTables />

        {/* 4. DIAGRAMAS DE ARQUITECTURA */}
        <SystemDiagrams />

      </div>
    </div>
  );
};

export default DocumentacionView;
