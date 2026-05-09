import React, { useState, useEffect } from 'react';
import { 
  Search, Twitter, Facebook, Instagram, Youtube, ArrowRight, 
  Globe, FileText, ChevronRight, Users, Building2, Landmark, 
  BookOpen, Gavel, PieChart, BrainCircuit, TrendingUp, Calendar, 
  HelpCircle, LogOut
} from 'lucide-react';
import PartidosView from './partidos/PartidosView';
import PlanesView from './planes/PlanesView';
import AsambleaView from './asamblea/AsambleaView';
import ComunidadView from './comunidad/ComunidadView';
import TestPoliticoView from './test_politico/TestPoliticoView';
import PoliticalChatbot from './chat/PoliticalChatbot';

const Dashboard = ({ userName, user, handleSignOut }) => {
  const [activeTab, setActiveTab] = useState('Inicio');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

// ... (omito el resto hasta el renderizado condicional, usaré startLine: 1, endLine: 15 para el import, luego otro call para el render)

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans selection:bg-[#EF1C24] selection:text-white flex flex-col relative animate-in fade-in duration-500 overflow-x-hidden">
      
      {/* SECCIÓN 1: HERO & NAV (A LO ANCHO) */}
      <div className="w-full bg-white relative flex flex-col">
        
        {/* Redes Sociales Sidebar (Fija a la pantalla) */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#002B7F] to-[#EF1C24] w-14 py-10 flex-col items-center gap-8 text-white rounded-r-[2.5rem] z-50 shadow-xl border-y border-r border-white/20 hidden sm:flex">
          <Twitter size={18} className="cursor-pointer hover:scale-125 transition-all" />
          <Facebook size={18} className="cursor-pointer hover:scale-125 transition-all" />
          <Instagram size={18} className="cursor-pointer hover:scale-125 transition-all" />
          <Youtube size={18} className="cursor-pointer hover:scale-125 transition-all" />
        </div>

        {/* Navbar */}
        <header className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-8 flex items-center justify-between relative z-20 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('Inicio')}>
            <div className="bg-[#002B7F] p-2.5 rounded-2xl text-white shadow-lg group-hover:rotate-6 transition-all">
              <Landmark size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-[1000] tracking-tighter leading-none text-[#002B7F]">VOTEON</h2>
              <p className="text-[9px] font-black tracking-[0.4em] text-[#EF1C24] uppercase">Costa Rica Informada</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 mx-8">
            {['Inicio', 'Test Político', 'La Asamblea', 'Planes', 'Partidos Políticos', 'Comunidad', 'Mi Perfil', 'Asistente IA'].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === item ? 'text-[#002B7F] border-b-2 border-[#EF1C24] pb-1' : 'text-slate-400 hover:text-[#002B7F]'}`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleSignOut}
              className="bg-[#EF1C24] text-white px-6 py-3.5 rounded-full text-[12px] font-black flex items-center gap-2 shadow-xl hover:bg-red-700 transition-all active:scale-95"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </header>

        {/* Renderizado condicional del Hero sólo si está en Inicio */}
        {activeTab === 'Inicio' && (
          <main className="flex-grow flex flex-col px-6 sm:px-10 md:px-16 lg:px-24 relative max-w-[1600px] mx-auto w-full pt-6 pb-20">
            
            {/* Fondos Decorativos */}
            <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-gradient-to-br from-[#EF1C24]/5 via-[#002B7F]/5 to-transparent rounded-full -z-0 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
            <div className="absolute right-10 top-10 w-[600px] h-[600px] bg-gradient-to-tr from-[#002B7F]/10 to-[#EF1C24]/10 rounded-full z-0 blur-3xl opacity-80 hidden lg:block pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center flex-grow relative z-10">
              {/* Texto Izquierdo */}
              <div className="space-y-8 animate-in slide-in-from-left-10 duration-700">
                <div className="inline-flex items-center gap-3 bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100">
                  <span className="w-2 h-2 bg-[#EF1C24] rounded-full animate-pulse"></span>
                  <h4 className="text-[#002B7F] font-black text-[10px] uppercase tracking-[0.2em]">Bienvenido, {userName}</h4>
                </div>
                
                <h1 className="text-5xl sm:text-6xl xl:text-8xl font-[1000] text-[#002B7F] leading-[0.9] tracking-tighter">
                  Tu país, <br />
                  <span className="text-slate-800">Tus datos</span>, <br />
                  <span className="text-[#EF1C24]">Tu decisión.</span>
                </h1>
                
                <div className="w-32 h-2 bg-[#EF1C24] rounded-full"></div>
                
                <p className="text-slate-500 max-w-md text-xl leading-relaxed font-medium">
                  Información oficial y digerible sobre la Asamblea Legislativa, candidatos y propuestas políticas de Costa Rica.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => setActiveTab('Test Político')} className="bg-[#002B7F] text-white px-10 py-5 rounded-3xl font-black text-sm shadow-2xl hover:bg-[#001f5c] transition-all flex items-center gap-3 group">
                    Realizar Test de Afinidad <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Ilustración Derecha */}
              <div className="relative flex justify-center lg:justify-end pr-0 lg:pr-10 mt-10 lg:mt-0 animate-in zoom-in duration-1000">
                <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px]">
                  <div className="absolute inset-0 bg-white rounded-full border-[10px] sm:border-[15px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002B7F] to-transparent"></div>
                    <PieChart size={100} className="text-[#002B7F]/10 mb-6 sm:w-[120px] sm:h-[120px]" />
                    <h3 className="text-xl sm:text-2xl font-black text-[#002B7F] uppercase tracking-tighter leading-none mb-2">Monitor Nacional</h3>
                    <p className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-relaxed">Datos del TSE y la Asamblea en tiempo real</p>
                  </div>
                  
                  {/* Iconos Flotantes */}
                  <div className="absolute -left-4 sm:-left-10 top-[20%] w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#EF1C24] rotate-[-10deg] animate-bounce duration-[4s]">
                    <BrainCircuit size={32} />
                  </div>
                  <div className="absolute left-4 bottom-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#002B7F] rounded-2xl shadow-xl flex items-center justify-center text-white rotate-12">
                    <Gavel size={24} />
                  </div>
                  <div className="absolute -right-4 sm:-right-6 top-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-[#EF1C24] rounded-full shadow-lg flex items-center justify-center text-white">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Renderizado Condicional del Resto del Dashboard */}
      {activeTab === 'Inicio' && (
        <>
          {/* SECCIÓN 2: ESTADÍSTICAS RÁPIDAS */}
          <section className="py-12 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto w-full -mt-8 relative z-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatBox label="Partidos Inscritos" value="32" icon={<Building2 size={18} />} />
              <StatBox label="Diputados" value="57" icon={<Users size={18} />} />
              <StatBox label="Proyectos en Curso" value="+120" icon={<FileText size={18} />} />
              <StatBox label="Días para Elección" value="640" icon={<Calendar size={18} />} />
            </div>
          </section>

          {/* SECCIÓN 3: LOS 4 PILARES PRINCIPALES */}
          <section className="py-20 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] tracking-tighter">¿Cómo quieres informarte hoy?</h2>
                <p className="text-[#EF1C24] font-bold uppercase text-xs tracking-[0.3em]">Explora nuestros módulos interactivos</p>
              </div>
              <div className="bg-slate-200 h-px flex-grow mx-8 hidden md:block mb-4"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <PillarCard 
                icon={<BrainCircuit size={44} />}
                title="Test de Afinidad"
                subtitle="Brújula Ideológica"
                desc="Responde a temas de actualidad y descubre qué propuestas partidarias resuenan más con tu visión de país."
                btnText="Iniciar Test"
                color="#EF1C24"
                lightColor="#FEF2F2"
                onClick={() => setActiveTab('Test Político')}
              />
              <PillarCard 
                icon={<Gavel size={44} />}
                title="La Asamblea"
                subtitle="Control Legislativo"
                desc="Consulta qué votan tus diputados, sus asistencias y los proyectos de ley que impactan tu provincia."
                btnText="Ver Asamblea"
                color="#002B7F"
                lightColor="#EFF6FF"
                onClick={() => setActiveTab('La Asamblea')}
              />
              <PillarCard 
                icon={<BookOpen size={44} />}
                title="Planes de Gobierno"
                subtitle="Resúmenes Inteligentes"
                desc="Comparamos los planes de gobierno por temas (economía, seguridad, salud) para que no tengas que leer cientos de páginas."
                btnText="Comparar Planes"
                color="#002B7F"
                lightColor="#EFF6FF"
                onClick={() => setActiveTab('Planes')}
              />
              <PillarCard 
                icon={<Users size={44} />}
                title="Directorio de Políticos"
                subtitle="Transparencia de Perfiles"
                desc="Conoce la trayectoria académica, profesional y el historial político de quienes aspiran a representarte."
                btnText="Explorar Perfiles"
                color="#EF1C24"
                lightColor="#FEF2F2"
                onClick={() => setActiveTab('Partidos Políticos')}
              />
            </div>
          </section>

          {/* SECCIÓN 4: ACTUALIDAD Y NOTICIAS */}
          <section className="py-20 bg-white border-y border-slate-100 w-full">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-24">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl sm:text-4xl font-[1000] text-[#002B7F] tracking-tighter">Lo último en la política</h2>
                <button className="text-[#EF1C24] font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                  Ver todas <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                <NewsCard 
                  category="Asamblea"
                  title="Aprobado en primer debate ley de fortalecimiento municipal"
                  date="Hace 2 horas"
                  image="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800"
                />
                <NewsCard 
                  category="Partidos"
                  title="Nuevas agrupaciones solicitan inscripción ante el TSE"
                  date="Hace 5 horas"
                  image="https://images.unsplash.com/photo-1540910419892-f0c742a45301?auto=format&fit=crop&q=80&w=800"
                />
                <NewsCard 
                  category="Educación"
                  title="¿Cómo se financian los partidos políticos en CR?"
                  date="Ayer"
                  image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN 5: EDUCACIÓN CÍVICA */}
          <section className="py-20 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-blue-50 text-[#002B7F] rounded-2xl flex items-center justify-center">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-4xl font-[1000] text-[#002B7F] leading-tight tracking-tighter">
                ¿Confundido con la política? <br /> Empecemos por lo básico.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Entender el sistema electoral no tiene por qué ser aburrido. Hemos preparado guías visuales sobre cómo funciona el Estado Costarricense.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GuideItem text="¿Qué hace un diputado?" />
                <GuideItem text="¿Cómo se eligen alcaldes?" />
                <GuideItem text="El papel del TSE" />
                <GuideItem text="¿Qué es la Deuda Política?" />
              </div>
              <button className="bg-[#002B7F] text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-[#001f5c] transition-all">
                Ir al Glosario Político
              </button>
            </div>
            <div className="bg-[#002B7F] rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                 <Landmark size={200} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Dato del día</div>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">¿Sabías que el TSE tiene el mismo rango que el Poder Ejecutivo durante elecciones?</h3>
                <p className="text-white/60 font-medium">Esto garantiza la independencia absoluta de los procesos democráticos en el país.</p>
                <button className="flex items-center gap-2 text-[#EF1C24] font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Leer más curiosidades <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Renderizado Condicional de la vista de Partidos Políticos */}
      {activeTab === 'Partidos Políticos' && (
        <PartidosView />
      )}

      {/* Renderizado Condicional de la vista de Planes */}
      {activeTab === 'Planes' && (
        <PlanesView />
      )}

      {/* Renderizado Condicional de la vista de Asamblea */}
      {activeTab === 'La Asamblea' && (
        <AsambleaView />
      )}

      {/* Renderizado Condicional de la vista de Comunidad */}
      {(activeTab === 'Comunidad' || activeTab === 'Mi Perfil') && (
        <ComunidadView userName={userName} user={user} defaultView={activeTab === 'Mi Perfil' ? 'profile' : 'feed'} />
      )}

      {/* Renderizado Condicional de la vista de Test Político */}
      {activeTab === 'Test Político' && (
        <TestPoliticoView />
      )}

      {/* Renderizado Condicional del Asistente IA */}
      {activeTab === 'Asistente IA' && (
        <PoliticalChatbot />
      )}

      {/* Placeholder para otras pestañas */}
      {activeTab !== 'Inicio' && activeTab !== 'Partidos Políticos' && activeTab !== 'Planes' && activeTab !== 'La Asamblea' && activeTab !== 'Comunidad' && activeTab !== 'Mi Perfil' && activeTab !== 'Test Político' && activeTab !== 'Asistente IA' && (
        <div className="flex-grow flex items-center justify-center p-20 animate-in fade-in zoom-in duration-500">
           <div className="text-center space-y-4">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-[#002B7F]">
                <HelpCircle size={40} />
             </div>
             <h2 className="text-3xl font-black text-slate-800 tracking-tighter">En Construcción</h2>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">El módulo de "{activeTab}" estará disponible pronto.</p>
           </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#00174A] py-20 px-6 sm:px-10 lg:px-24 text-white w-full border-t-[8px] border-[#EF1C24]">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-4 gap-12 lg:gap-16 mb-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Landmark size={24} className="text-[#EF1C24]" />
              <h3 className="text-2xl font-black tracking-tighter">VOTEON</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed font-medium">
              Herramienta independiente de fiscalización ciudadana en Costa Rica. Datos abiertos para una democracia más sólida.
            </p>
          </div>
          <FooterLinks title="Ecosistema" links={['Test Político', 'Monitor Asamblea', 'Planes 2026', 'Directorio']} />
          <FooterLinks title="Recursos" links={['Datos Abiertos', 'Glosario Cívico', 'Metodología', 'Newsletter']} />
          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-300">Suscríbete</h4>
            <div className="relative">
              <input type="text" placeholder="Tu correo" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#EF1C24] transition-all text-white placeholder:text-blue-300" />
              <button className="absolute right-2 top-2 bottom-2 bg-[#EF1C24] px-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2024 VOTEON COSTA RICA</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <span className="cursor-pointer hover:text-white transition-colors">Privacidad</span>
            <span className="cursor-pointer hover:text-white transition-colors">Términos</span>
            <span className="cursor-pointer hover:text-white transition-colors">Contacto</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const StatBox = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
    <div className="w-10 h-10 bg-blue-50 text-[#002B7F] rounded-xl flex items-center justify-center shadow-inner shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-xl sm:text-2xl font-black text-[#002B7F] tracking-tighter">{value}</div>
      <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

const PillarCard = ({ icon, title, subtitle, desc, btnText, color, lightColor, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden cursor-pointer">
    <div className="absolute -right-8 -top-8 w-32 h-32 opacity-[0.03] group-hover:scale-125 transition-transform" style={{ color }}>{icon}</div>
    <div 
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-8 sm:mb-10 shadow-lg group-hover:rotate-6 transition-all shrink-0"
      style={{ backgroundColor: lightColor, color: color }}
    >
      {icon}
    </div>
    <div className="mb-6">
      <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color }}>{subtitle}</span>
      <h3 className="text-3xl sm:text-4xl font-[1000] text-slate-900 tracking-tighter mt-2">{title}</h3>
    </div>
    <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed mb-10 flex-grow">
      {desc}
    </p>
    <button 
      className="w-full py-4 sm:py-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest text-white shadow-xl transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3"
      style={{ backgroundColor: color }}
    >
      {btnText} <ChevronRight size={18} />
    </button>
  </div>
);

const NewsCard = ({ category, title, date, image }) => (
  <div className="group cursor-pointer">
    <div className="relative h-56 sm:h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-lg">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
      <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-[#002B7F] uppercase tracking-widest shadow-lg">
        {category}
      </div>
    </div>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">{date}</span>
    <h4 className="text-lg sm:text-xl font-black text-[#002B7F] group-hover:text-[#EF1C24] transition-colors leading-tight">
      {title}
    </h4>
  </div>
);

const GuideItem = ({ text }) => (
  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 hover:border-[#002B7F] transition-colors cursor-pointer group shadow-sm hover:shadow-md">
    <div className="w-6 h-6 bg-blue-50 text-[#002B7F] rounded-full flex items-center justify-center group-hover:bg-[#002B7F] group-hover:text-white transition-all shrink-0">
      <ChevronRight size={14} />
    </div>
    <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#002B7F]">{text}</span>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div className="space-y-6">
    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-300">{title}</h4>
    <ul className="space-y-4">
      {links.map(l => (
        <li key={l} className="text-sm font-bold text-blue-100 hover:text-white cursor-pointer transition-colors">{l}</li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
