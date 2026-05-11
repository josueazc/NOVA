import React from 'react';
import { Microchip, ShieldCheck, Database, Terminal, Image as ImageIcon } from 'lucide-react';

const TechColumn = ({ title, items }) => (
  <div className="hover:-translate-y-2 transition-transform duration-300">
    <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{title}</h4>
    <div className="space-y-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="shrink-0 mt-0.5">{item.icon}</div>
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200 transition-colors leading-none">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors mt-2">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#EF1C24] text-white rounded-2xl flex items-center justify-center shadow-lg transition-colors"><Microchip size={24} /></div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Stack Tecnológico</h2>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
        <div className="grid md:grid-cols-3 gap-10">
          <TechColumn 
            title="Frontend (Cliente)"
            items={[
              { name: "React.js (Vite)", desc: "Librería UI y bundler ultra rápido.", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-5 h-5" alt="React" /> },
              { name: "Tailwind CSS v3", desc: "Framework de utilidades para estilos.", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-5 h-5" alt="Tailwind" /> },
              { name: "Lucide React", desc: "Biblioteca de iconos modernos.", icon: <ImageIcon className="text-slate-400 w-5 h-5" /> },
              { name: "PDF.js", desc: "Extracción de texto local en el navegador.", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-5 h-5" alt="JS" /> }
            ]}
          />
          <TechColumn 
            title="Backend (Supabase)"
            items={[
              { name: "Supabase Auth", desc: "Autenticación segura (Email/Password).", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" className="w-5 h-5" alt="Supabase" /> },
              { name: "PostgreSQL", desc: "Base de datos relacional robusta.", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-5 h-5" alt="PostgreSQL" /> },
              { name: "Supabase Storage", desc: "Almacenamiento de imágenes de la comunidad.", icon: <Database className="text-green-500 w-5 h-5" /> },
              { name: "Row Level Security", desc: "Políticas de seguridad a nivel de fila (RLS).", icon: <ShieldCheck className="text-blue-500 w-5 h-5" /> }
            ]}
          />
          <TechColumn 
            title="Inteligencia Artificial"
            items={[
              { name: "Google Gemini API", desc: "Modelo LLM para procesamiento de lenguaje natural.", icon: <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-5 h-5" alt="Gemini" /> },
              { name: "gemini-2.5-flash", desc: "Modelo ágil para análisis de planes y chatbot.", icon: <Microchip className="text-purple-500 w-5 h-5" /> },
              { name: "Prompt Engineering", desc: "Instrucciones de sistema estrictas (System Prompts).", icon: <Terminal className="text-slate-700 dark:text-slate-300 w-5 h-5" /> }
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
