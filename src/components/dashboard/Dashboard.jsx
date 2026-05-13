import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Twitter, Facebook, Instagram, Youtube, ArrowRight, 
  Globe, FileText, ChevronRight, Users, Building2, Landmark, 
  BookOpen, Gavel, PieChart, BrainCircuit, TrendingUp, Calendar, 
  HelpCircle, LogOut, Settings, Activity, Menu, X, Home
} from 'lucide-react';
import PartidosView from './partidos/PartidosView';
import PlanesView from './planes/PlanesView';
import AsambleaView from './asamblea/AsambleaView';
import ComunidadView from './comunidad/ComunidadView';
import TestPoliticoView from './test_politico/TestPoliticoView';
import PoliticalChatbot from './chat/PoliticalChatbot';
import ConfiguracionView from './configuracion/ConfiguracionView';
import DocumentacionView from './documentacion/DocumentacionView';
import AbstencionismoView from './abstencionismo/AbstencionismoView';

const Dashboard = ({ userName, user, handleSignOut }) => {
  const [activeTab, setActiveTab] = useState('Inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

// ... (omito el resto hasta el renderizado condicional, usaré startLine: 1, endLine: 15 para el import, luego otro call para el render)

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 font-sans selection:bg-[#EF1C24] selection:text-white flex flex-col relative animate-in fade-in duration-500 overflow-x-hidden transition-colors">
      
      {/* SECCIÓN 1: HERO & NAV (A LO ANCHO) */}
      <div className="w-full bg-white dark:bg-slate-900 relative flex flex-col transition-colors">
        
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

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 mx-8 relative">
            {['Inicio', 'Test Político', 'La Asamblea', 'Planes', 'Partidos Políticos', 'Comunidad', 'Asistente IA'].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === item ? 'text-[#002B7F] dark:text-blue-400 border-b-2 border-[#EF1C24] pb-1' : 'text-slate-400 hover:text-[#002B7F] dark:hover:text-blue-300'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="relative group">
              <button className={`text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-1 py-1 ${['Mi Perfil', 'Abstencionismo', 'Documentación'].includes(activeTab) ? 'text-[#002B7F] dark:text-blue-400 border-b-2 border-[#EF1C24]' : 'text-slate-400 hover:text-[#002B7F] dark:hover:text-blue-300'}`}>
                Otros <ChevronRight size={14} className="rotate-90 group-hover:-rotate-90 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden py-2 z-50">
                {['Mi Perfil', 'Abstencionismo', 'Documentación'].map(subItem => (
                  <button 
                    key={subItem}
                    onClick={() => setActiveTab(subItem)}
                    className={`text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-colors ${activeTab === subItem ? 'bg-slate-50 dark:bg-slate-700/50 text-[#002B7F] dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 hover:text-[#002B7F] dark:hover:bg-slate-700/50 dark:hover:text-white'}`}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('Configuración')}
              className={`p-3.5 rounded-full shadow-xl transition-all active:scale-95 flex items-center justify-center ${activeTab === 'Configuración' ? 'bg-[#001D4A] dark:bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#001D4A] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              title="Configuración"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={handleSignOut}
              className="bg-[#EF1C24] text-white px-6 py-3.5 rounded-full text-[12px] font-black flex items-center gap-2 shadow-xl hover:bg-red-700 transition-all active:scale-95"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
          <button 
            className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[#002B7F] dark:text-white" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Menú Móvil Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-slate-900 z-[100] flex flex-col p-6 overflow-y-auto animate-in fade-in zoom-in duration-300 lg:hidden">
             <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                 <div className="bg-[#002B7F] p-2 rounded-xl text-white">
                   <Landmark size={24} />
                 </div>
                 <h2 className="text-xl font-[1000] tracking-tighter text-[#002B7F] dark:text-white">VOTEON</h2>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
                 <X size={24} />
               </button>
             </div>
             <div className="flex flex-col gap-4">
               {['Inicio', 'Test Político', 'La Asamblea', 'Planes', 'Partidos Políticos', 'Comunidad', 'Asistente IA', 'Mi Perfil', 'Abstencionismo', 'Documentación', 'Configuración'].map((item) => (
                 <button 
                   key={item}
                   onClick={() => { setActiveTab(item); setIsMobileMenuOpen(false); }}
                   className={`text-left px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === item ? 'bg-[#002B7F] dark:bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                 >
                   {item}
                 </button>
               ))}
             </div>
             <button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="mt-8 bg-[#EF1C24] text-white px-6 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2">
               <LogOut size={18} /> Salir
             </button>
          </div>
        )}

        {/* Renderizado condicional del Hero sólo si está en Inicio */}
        {activeTab === 'Inicio' && (
          <main className="flex-grow flex flex-col px-6 sm:px-10 md:px-16 lg:px-24 relative max-w-[1600px] mx-auto w-full pt-6 pb-20">
            
            {/* Fondos Decorativos */}
            <div className="absolute right-0 top-0 w-[800px] h-[800px] max-w-[100vw] bg-gradient-to-br from-[#EF1C24]/5 via-[#002B7F]/5 to-transparent rounded-full -z-0 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
            <div className="absolute right-10 top-10 w-[600px] h-[600px] max-w-[80vw] bg-gradient-to-tr from-[#002B7F]/10 to-[#EF1C24]/10 rounded-full z-0 blur-3xl opacity-80 hidden lg:block pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center flex-grow relative z-10">
              {/* Texto Izquierdo */}
              <div className="space-y-8 animate-in slide-in-from-left-10 duration-700">
                <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-900 transition-colors">
                  <span className="w-2 h-2 bg-[#EF1C24] rounded-full animate-pulse"></span>
                  <h4 className="text-[#002B7F] dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] transition-colors">Bienvenido, {userName}</h4>
                </div>
                
                <h1 className="text-5xl sm:text-6xl xl:text-8xl font-[1000] text-[#002B7F] dark:text-white leading-[0.9] tracking-tighter transition-colors">
                  Tu país, <br />
                  <span className="text-slate-800 dark:text-slate-200 transition-colors">Tus datos</span>, <br />
                  <span className="text-[#EF1C24]">Tu decisión.</span>
                </h1>
                
                <div className="w-32 h-2 bg-[#EF1C24] rounded-full"></div>
                
                <p className="text-slate-500 dark:text-slate-400 max-w-md text-xl leading-relaxed font-medium transition-colors">
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
                <div className="relative w-[280px] h-[280px] sm:w-[450px] sm:h-[450px]">
                  <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full border-[10px] sm:border-[15px] border-white dark:border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center justify-center p-8 text-center transition-colors">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002B7F] to-transparent"></div>
                    <PieChart size={100} className="text-[#002B7F]/10 dark:text-blue-400/20 mb-6 sm:w-[120px] sm:h-[120px]" />
                    <h3 className="text-xl sm:text-2xl font-black text-[#002B7F] dark:text-white uppercase tracking-tighter leading-none mb-2 transition-colors">Monitor Nacional</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-relaxed transition-colors">Datos del TSE y la Asamblea en tiempo real</p>
                  </div>
                  
                  {/* Sistema Orbital */}
                  <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                    
                    {/* Item 1: Top (12 o'clock) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform cursor-pointer">
                      <div className="animate-spin-reverse-slow bg-white dark:bg-slate-800 px-3 sm:px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                         <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#002B7F] dark:text-blue-400 flex justify-center items-center shrink-0"><Users size={16}/></div>
                         <div className="hidden sm:block">
                           <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">57 Diputados</div>
                           <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">En la Asamblea</div>
                         </div>
                      </div>
                    </div>

                    {/* Item 2: Bottom Right (4 o'clock) */}
                    <div className="absolute top-[85%] left-[85%] sm:top-[75%] sm:left-[93.3%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform cursor-pointer">
                       <div className="animate-spin-reverse-slow bg-white dark:bg-slate-800 px-3 sm:px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                         <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 flex justify-center items-center shrink-0"><TrendingUp size={16}/></div>
                         <div className="hidden sm:block">
                           <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">3.5M Electores</div>
                           <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Padrón Nacional</div>
                         </div>
                      </div>
                    </div>

                    {/* Item 3: Bottom Left (8 o'clock) */}
                    <div className="absolute top-[85%] left-[15%] sm:top-[75%] sm:left-[6.7%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform cursor-pointer">
                       <div className="animate-spin-reverse-slow bg-white dark:bg-slate-800 px-3 sm:px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                         <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/30 text-[#EF1C24] flex justify-center items-center shrink-0"><Gavel size={16}/></div>
                         <div className="hidden sm:block">
                           <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">+120 Proyectos</div>
                           <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">En discusión</div>
                         </div>
                      </div>
                    </div>

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
          <RevealOnScroll>
            <section className="py-12 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto w-full -mt-8 relative z-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatBox label="Partidos Inscritos" value="32" icon={<Building2 size={18} />} />
                <StatBox label="Diputados" value="57" icon={<Users size={18} />} />
                <StatBox label="Proyectos en Curso" value="+120" icon={<FileText size={18} />} />
                <StatBox label="Días para Elección" value="640" icon={<Calendar size={18} />} />
              </div>
            </section>
          </RevealOnScroll>

          {/* SECCIÓN 3: LOS 4 PILARES PRINCIPALES */}
          <RevealOnScroll>
            <section className="py-20 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto w-full">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">¿Cómo quieres informarte hoy?</h2>
                  <p className="text-[#EF1C24] font-bold uppercase text-xs tracking-[0.3em]">Explora nuestros módulos interactivos</p>
                </div>
                <div className="bg-slate-200 dark:bg-slate-800 h-px flex-grow mx-8 hidden md:block mb-4 transition-colors"></div>
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
          </RevealOnScroll>

          {/* SECCIÓN 4: ACTUALIDAD Y NOTICIAS */}
          <RevealOnScroll>
            <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 w-full transition-colors">
              <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-24">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl sm:text-4xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">Lo último en la política</h2>
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
          </RevealOnScroll>

          {/* SECCIÓN 5: EDUCACIÓN CÍVICA */}
          <RevealOnScroll>
            <section className="py-20 px-6 sm:px-10 lg:px-24 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-[#002B7F] dark:text-blue-400 rounded-2xl flex items-center justify-center transition-colors">
                  <HelpCircle size={32} />
                </div>
                <h2 className="text-4xl font-[1000] text-[#002B7F] dark:text-white leading-tight tracking-tighter">
                  ¿Confundido con la política? <br /> Empecemos por lo básico.
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium transition-colors">
                  Entender el sistema electoral no tiene por qué ser aburrido. Hemos preparado guías visuales sobre cómo funciona el Estado Costarricense.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GuideItem text="¿Qué hace un diputado?" onClick={() => setActiveTab('Asistente IA')} />
                  <GuideItem text="¿Cómo se eligen alcaldes?" onClick={() => setActiveTab('Asistente IA')} />
                  <GuideItem text="El papel del TSE" onClick={() => setActiveTab('Asistente IA')} />
                  <GuideItem text="¿Qué es la Deuda Política?" onClick={() => setActiveTab('Asistente IA')} />
                </div>
                <button onClick={() => setActiveTab('Asistente IA')} className="bg-[#002B7F] dark:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-[#001f5c] dark:hover:bg-blue-500 transition-all shadow-lg active:scale-95">
                  Consultarle a la IA Cívica
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
          </RevealOnScroll>
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

      {/* Renderizado Condicional de Configuración */}
      {activeTab === 'Configuración' && (
        <ConfiguracionView user={user} />
      )}

      {/* Renderizado Condicional de Documentación */}
      {activeTab === 'Documentación' && (
        <DocumentacionView />
      )}

      {/* Renderizado Condicional de Abstencionismo */}
      {activeTab === 'Abstencionismo' && (
        <AbstencionismoView />
      )}

      {/* Placeholder para otras pestañas */}
      {activeTab !== 'Inicio' && activeTab !== 'Partidos Políticos' && activeTab !== 'Planes' && activeTab !== 'La Asamblea' && activeTab !== 'Comunidad' && activeTab !== 'Mi Perfil' && activeTab !== 'Test Político' && activeTab !== 'Asistente IA' && activeTab !== 'Configuración' && activeTab !== 'Documentación' && activeTab !== 'Abstencionismo' && (
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
      <footer className="bg-[#00174A] dark:bg-slate-950 py-20 px-6 sm:px-10 lg:px-24 text-white w-full border-t-[8px] border-[#EF1C24] transition-colors relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[800px] h-[800px] max-w-[100vw] bg-gradient-to-br from-[#EF1C24]/10 via-[#002B7F]/10 to-transparent rounded-full z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-4 gap-12 lg:gap-16 mb-16 text-center md:text-left relative z-10">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Landmark size={24} className="text-[#EF1C24]" />
              <h3 className="text-2xl font-black tracking-tighter text-white">VOTEON</h3>
            </div>
            <p className="text-blue-200 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Tu herramienta independiente para la fiscalización ciudadana. Nuestro objetivo es fortalecer la democracia en Costa Rica conectando a los votantes con los datos abiertos oficiales del TSE y la Asamblea Legislativa de forma transparente y sin sesgos.
            </p>
          </div>
          <FooterLinks title="Módulos" links={['Test de Afinidad IA', 'Monitor de Asamblea', 'Planes de Gobierno', 'Directorio de Perfiles']} />
          <FooterLinks title="Transparencia" links={['Datos Abiertos (API)', 'Código Ético de Algoritmos', 'Metodología', 'Fuentes del TSE']} />
          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-300 dark:text-blue-500">Inteligencia Ciudadana</h4>
            <div className="relative group">
              <input type="text" placeholder="Tu correo electrónico" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#EF1C24] transition-all text-white placeholder:text-blue-300 dark:bg-slate-900/50" />
              <button className="absolute right-2 top-2 bottom-2 bg-[#EF1C24] px-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center group-hover:scale-105">
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-bold mt-2">Mantente al tanto de proyectos de ley importantes.</p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">© {new Date().getFullYear()} VOTEON COSTA RICA. PROYECTO CÍVICO.</p>
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
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:shadow-md transition-all">
    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-[#002B7F] dark:text-blue-400 rounded-xl flex items-center justify-center shadow-inner shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-xl sm:text-2xl font-black text-[#002B7F] dark:text-white tracking-tighter">{value}</div>
      <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

const PillarCard = ({ icon, title, subtitle, desc, btnText, color, lightColor, onClick }) => (
  <div onClick={onClick} className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden cursor-pointer">
    <div className="absolute -right-8 -top-8 w-32 h-32 opacity-[0.03] dark:opacity-10 group-hover:scale-125 transition-transform" style={{ color }}>{icon}</div>
    <div 
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-8 sm:mb-10 shadow-lg group-hover:rotate-6 transition-all shrink-0"
      style={{ backgroundColor: lightColor, color: color }}
    >
      {icon}
    </div>
    <div className="mb-6">
      <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color }}>{subtitle}</span>
      <h3 className="text-3xl sm:text-4xl font-[1000] text-slate-900 dark:text-white tracking-tighter mt-2">{title}</h3>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed mb-10 flex-grow">
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
      <div className="absolute top-6 left-6 bg-white dark:bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black text-[#002B7F] dark:text-blue-400 uppercase tracking-widest shadow-lg transition-colors">
        {category}
      </div>
    </div>
    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">{date}</span>
    <h4 className="text-lg sm:text-xl font-black text-[#002B7F] dark:text-white group-hover:text-[#EF1C24] dark:group-hover:text-[#EF1C24] transition-colors leading-tight">
      {title}
    </h4>
  </div>
);

const GuideItem = ({ text, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-[#002B7F] dark:hover:border-blue-500 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
    <div className="w-6 h-6 bg-blue-50 dark:bg-blue-900/30 text-[#002B7F] dark:text-blue-400 rounded-full flex items-center justify-center group-hover:bg-[#002B7F] dark:group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
      <ChevronRight size={14} />
    </div>
    <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#002B7F] dark:group-hover:text-white transition-colors">{text}</span>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div className="space-y-6">
    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-300 dark:text-blue-500">{title}</h4>
    <ul className="space-y-4">
      {links.map(l => (
        <li key={l} className="text-sm font-bold text-blue-100 dark:text-slate-400 hover:text-white cursor-pointer transition-colors">{l}</li>
      ))}
    </ul>
  </div>
);

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}
    >
      {children}
    </div>
  );
};

export default Dashboard;
