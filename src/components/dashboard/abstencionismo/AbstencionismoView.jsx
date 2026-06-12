import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, TrendingDown, Users, AlertTriangle, MapPin, BarChart3,
  Frown, ShieldOff, Ban, HelpCircle, MoreHorizontal, GraduationCap,
  Monitor, Smartphone, MessageSquare, ClipboardCheck, Award, ChevronRight,
  ArrowRight, Lightbulb, Target, Activity, Eye, UserX, Map as MapIcon
} from 'lucide-react';

import {
  datosHistoricos, datosPorProvincia, razonesAbstencionismo,
  datosDemograficos, estrategiasPrevencion, estadisticasClave,
  comparativaMunicipalNacional
} from '../../../data/abstencionismoData';

const iconMap = { Frown, ShieldOff: ShieldOff, Ban, HelpCircle, MoreHorizontal, MapPinOff: MapPin, GraduationCap, Monitor, Smartphone, MessageSquare, ClipboardCheck, Award };
const getIcon = (name, size = 24) => { const I = iconMap[name] || HelpCircle; return <I size={size} />; };

const RevealOnScroll = ({ children }) => {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(e.target); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] transform ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>{children}</div>;
};

const AbstencionismoView = () => {
  const [provinciaActiva, setProvinciaActiva] = useState(null);
  const [animateChart, setAnimateChart] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimateChart(true); obs.unobserve(e.target); } }, { threshold: 0.2 });
    if (chartRef.current) obs.observe(chartRef.current);
    return () => obs.disconnect();
  }, []);

  const datosRecientes = datosHistoricos.filter(d => d.año >= 1998);
  const maxAbs = Math.max(...datosRecientes.map(d => d.abstencionismo));
  const provData = provinciaActiva ? datosPorProvincia[provinciaActiva] : null;

  return (
    <div className="w-full font-sans text-ink pb-24 pt-12 flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-24">

        {/* === HERO === */}
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-[#EF1C24] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 shadow-sm">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF1C24] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF1C24]"></span></span>
                Análisis Electoral
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[1000] tracking-tighter leading-[0.85] text-slate-900 dark:text-white">
                Abstencionismo<br />
                <span className="text-[#EF1C24]">Electoral</span>
              </h1>
              <div className="w-24 h-2 bg-[#EF1C24] rounded-full"></div>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed max-w-lg">
                El abstencionismo es la <strong className="text-slate-700 dark:text-slate-200">no participación</strong> de los ciudadanos en el ejercicio de su derecho al voto. En Costa Rica, esta problemática ha alcanzado niveles históricos, amenazando la legitimidad democrática del país.
              </p>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-5">
              {[
                { label: 'Abstención 2022', value: `${estadisticasClave.abstencionismo2022}%`, icon: <AlertTriangle size={20} />, color: '#EF1C24', bg: 'bg-red-50 dark:bg-red-900/20' },
                { label: 'Votos No Emitidos', value: '1.43M', icon: <UserX size={20} />, color: '#002B7F', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Incremento vs 2018', value: `+${estadisticasClave.incrementoVs2018}%`, icon: <TrendingUp size={20} />, color: '#EF1C24', bg: 'bg-red-50 dark:bg-red-900/20' },
                { label: 'Padrón Electoral', value: '3.54M', icon: <Users size={20} />, color: '#002B7F', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              ].map((s, i) => (
                <div key={i} className={`${s.bg} p-6 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all group`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-inner" style={{ backgroundColor: s.color + '15', color: s.color }}>{s.icon}</div>
                  <div className="text-2xl sm:text-3xl font-[1000] tracking-tighter" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === GRÁFICO HISTÓRICO === */}
        <RevealOnScroll>
          <section className="mb-24" ref={chartRef}>
            <div className="mb-12 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF1C24]">Serie Histórica</span>
              <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">Evolución del Abstencionismo</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">Primera ronda de elecciones presidenciales (1998–2022). Datos oficiales del TSE.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="flex items-end gap-3 sm:gap-5 h-72 sm:h-80">
                {datosRecientes.map((d, i) => {
                  const height = (d.abstencionismo / maxAbs) * 100;
                  const isMax = d.abstencionismo === maxAbs;
                  return (
                    <div key={d.año} className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer">
                      <div className="text-[10px] sm:text-xs font-black text-slate-500 dark:text-slate-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{d.abstencionismo}%</div>
                      <div
                        className={`w-full rounded-t-2xl transition-all duration-700 ease-out group-hover:brightness-110 ${isMax ? 'bg-gradient-to-t from-[#EF1C24] to-[#FF6B6B]' : 'bg-gradient-to-t from-[#002B7F] to-[#3B82F6]'}`}
                        style={{ height: animateChart ? `${height}%` : '0%', transitionDelay: `${i * 100}ms` }}
                      ></div>
                      <div className="mt-3 text-[10px] sm:text-xs font-black text-slate-400 dark:text-slate-500">{d.año}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#002B7F] to-[#3B82F6]"></div><span className="text-[10px] font-bold text-slate-400">Elección regular</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#EF1C24] to-[#FF6B6B]"></div><span className="text-[10px] font-bold text-slate-400">Máximo histórico</span></div>
              </div>
            </div>
          </section>
        </RevealOnScroll>



        {/* === RAZONES === */}
        <RevealOnScroll>
          <section className="mb-24">
            <div className="mb-12 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF1C24]">Diagnóstico</span>
              <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">¿Por qué no votan?</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">Principales razones identificadas por el TSE y el CIEP-UCR.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {razonesAbstencionismo.map((r) => (
                <div key={r.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 opacity-[0.04] group-hover:scale-125 transition-transform duration-700">{getIcon(r.icono, 120)}</div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: r.color + '15', color: r.color }}>{getIcon(r.icono, 28)}</div>
                    <div className="text-3xl font-[1000] tracking-tighter mb-2" style={{ color: r.color }}>{r.porcentaje}%</div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight mb-3">{r.razon}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{r.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* === POR PROVINCIA === */}
        <RevealOnScroll>
          <section className="mb-24">
            <div className="mb-12 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF1C24]">Geografía Electoral</span>
              <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">Abstención por Provincia</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">Resultados de la Primera Ronda Electoral 2022 por provincia.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="space-y-8">
                {Object.entries(datosPorProvincia).sort((a, b) => b[1].abstencionismo - a[1].abstencionismo).map(([nombre, d]) => (
                  <div key={nombre} className="group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-2">
                      <div className="flex-1">
                        <span className="text-xl font-black text-slate-800 dark:text-white tracking-tight block mb-1">{nombre}</span>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block max-w-xl leading-relaxed">{d.descripcion}</span>
                      </div>
                      <span className="text-3xl font-[1000] tracking-tighter shrink-0" style={{ color: d.color }}>{d.abstencionismo}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner mt-3">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(d.abstencionismo / 50) * 100}%`, backgroundColor: d.color }}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* === DEMOGRAFÍA === */}
        <RevealOnScroll>
          <section className="mb-24">
            <div className="mb-12 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF1C24]">Análisis Demográfico</span>
              <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">¿Quiénes no votan?</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Por Edad */}
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 lg:col-span-2">
                <h3 className="text-lg font-[1000] text-[#002B7F] dark:text-white tracking-tighter mb-8">Abstención por Grupo de Edad</h3>
                <div className="space-y-5">
                  {datosDemograficos.porEdad.map((g) => (
                    <div key={g.grupo} className="group">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{g.grupo} años <span className="text-slate-400 dark:text-slate-500 text-xs">({g.label})</span></span>
                        <span className="text-sm font-[1000] tracking-tighter" style={{ color: g.abstencionismo > 40 ? '#DC2626' : g.abstencionismo > 35 ? '#F97316' : '#22C55E' }}>{g.abstencionismo}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(g.abstencionismo / 55) * 100}%`, background: g.abstencionismo > 40 ? 'linear-gradient(90deg, #DC2626, #EF4444)' : g.abstencionismo > 35 ? 'linear-gradient(90deg, #F97316, #FB923C)' : 'linear-gradient(90deg, #22C55E, #4ADE80)' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Urbano vs Rural */}
              <div className="space-y-6">
                <div className="bg-[#002B7F] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10"><MapPin size={140} /></div>
                  <div className="relative z-10">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-4">Brecha Urbano / Rural</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-blue-200 text-xs font-bold mb-1">Urbano</div>
                        <div className="text-4xl font-[1000] tracking-tighter">{datosDemograficos.brechaUrbanoRural.urbano}%</div>
                      </div>
                      <div>
                        <div className="text-blue-200 text-xs font-bold mb-1">Rural</div>
                        <div className="text-4xl font-[1000] tracking-tighter text-[#EF1C24]">{datosDemograficos.brechaUrbanoRural.rural}%</div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-blue-200 text-xs font-bold">Diferencia</div>
                        <div className="text-2xl font-[1000] tracking-tighter text-[#FBBF24]">+{datosDemograficos.brechaUrbanoRural.diferencia}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Municipal vs Nacional</h3>
                  {comparativaMunicipalNacional.map(c => (
                    <div key={c.tipo} className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{c.tipo}</span>
                      <span className="text-sm font-[1000] tracking-tighter" style={{ color: c.abstencionismo > 60 ? '#DC2626' : c.abstencionismo > 35 ? '#F97316' : '#22C55E' }}>{c.abstencionismo}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* === PREVENCIÓN === */}
        <RevealOnScroll>
          <section className="mb-12">
            <div className="mb-12 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF1C24]">Soluciones</span>
              <h2 className="text-4xl sm:text-5xl font-[1000] text-[#002B7F] dark:text-white tracking-tighter">¿Cómo revertirlo?</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">Estrategias basadas en estudios del TSE, CIEP-UCR y experiencias internacionales.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {estrategiasPrevencion.map((e) => (
                <div key={e.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">{getIcon(e.icono, 100)}</div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-[#002B7F] dark:text-blue-400 flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform">{getIcon(e.icono, 28)}</div>
                    <h3 className="text-xl font-[1000] text-slate-800 dark:text-white tracking-tighter mb-3">{e.titulo}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">{e.descripcion}</p>
                    <div className="flex gap-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${e.impacto === 'Alto' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600'}`}>Impacto {e.impacto}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500">{e.plazo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Final */}
            <div className="mt-16 bg-gradient-to-br from-[#002B7F] to-[#001A4A] rounded-[3rem] p-10 sm:p-14 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10"><Lightbulb size={250} /></div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Tu voto importa</div>
                <h3 className="text-3xl sm:text-4xl font-[1000] leading-tight tracking-tighter mb-4">Informarte es el primer paso para participar.</h3>
                <p className="text-blue-200 font-medium text-lg leading-relaxed mb-8">VoteOn existe para que conozcas a los candidatos, sus propuestas y tomes una decisión informada. La democracia la construimos todos.</p>
                <div className="flex items-center gap-3 text-[#EF1C24] font-black text-xs uppercase tracking-widest">
                  Explora VoteOn <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

      </main>
    </div>
  );
};

export default AbstencionismoView;
