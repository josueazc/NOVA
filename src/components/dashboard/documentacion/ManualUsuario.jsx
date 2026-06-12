import React from 'react';
import { Users, Landmark, Compass, FileText, MessageSquare, Bot } from 'lucide-react';

const FeatureCard = ({ icon, title, desc, borderColor }) => (
 <div className={`bg-surface rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-y border-r border-line cursor-pointer ${borderColor}`}>
  <div className="flex items-center gap-3 mb-4">
   {icon}
   <h3 className="text-xl font-black text-ink transition-colors">{title}</h3>
  </div>
  <p className="text-muted text-sm leading-relaxed font-medium transition-colors">{desc}</p>
 </div>
);

const ManualUsuario = () => {
 return (
  <section>
   <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg transition-colors"><Users size={24} /></div>
    <h2 className="text-4xl font-black text-ink tracking-tighter transition-colors">Manual de Usuario</h2>
   </div>
   
   <div className="grid md:grid-cols-2 gap-6">
    <FeatureCard 
     icon={<Landmark className="text-accent" size={24} />}
     title="Dashboard Principal"
     desc="Es el centro de control. Aquí puedes ver estadísticas rápidas (partidos inscritos, diputados), navegar por atajos a las funciones principales y leer un resumen de las noticias políticas recientes o datos curiosos."
     borderColor="border-l-[#002B7F] dark:border-l-blue-500"
    />
    <FeatureCard 
     icon={<Compass className="text-green-500" size={24} />}
     title="Test Político (VotoMetro)"
     desc="Un formulario de 25 preguntas sobre seguridad, economía y derechos. Al terminar, un algoritmo matemático calcula tu porcentaje de afinidad con los partidos políticos reales de Costa Rica y te da un perfil ideológico."
     borderColor="border-l-green-500"
    />
    <FeatureCard 
     icon={<FileText className="text-purple-500" size={24} />}
     title="Planes de Gobierno"
     desc="Seleccionas un partido y subes un documento PDF de su plan de gobierno. El sistema extrae el texto de forma local y lo envía a la IA (Gemini) para categorizar y resumir las propuestas en áreas como Salud, Educación, etc."
     borderColor="border-l-purple-500"
    />
    <FeatureCard 
     icon={<Users className="text-amber-500" size={24} />}
     title="La Asamblea"
     desc="Un visor interactivo del hemiciclo legislativo. Puedes buscar diputados, ver a qué partido pertenecen, y consultar información estadística como su asistencia a sesiones y en qué comisiones participan."
     borderColor="border-l-amber-500"
    />
    <FeatureCard 
     icon={<MessageSquare className="text-danger" size={24} />}
     title="Comunidad (DebateCR)"
     desc="Un foro social interactivo. Puedes publicar opiniones, subir imágenes, dar likes, republicar y debatir. Existe un 'Filtro de Palabras' que censura insultos automáticamente."
     borderColor="border-l-[#EF1C24]"
    />
    <FeatureCard 
     icon={<Bot className="text-cyan-500" size={24} />}
     title="Asistente IA (Chatbot)"
     desc="Un chatbot 'estricto'. Tú le provees documentos (TXT, PDF) y él solo puede responder preguntas basándose en esos archivos. Previene la desinformación al no inventar datos externos."
     borderColor="border-l-cyan-500"
    />
   </div>
  </section>
 );
};

export default ManualUsuario;
