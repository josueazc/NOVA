import React from 'react';
import {
  Scale, Users2, MessagesSquare, BrainCircuit, Gavel, BookOpen,
  Landmark, Map, ArrowRight, Sparkles, Vote, PieChart, TrendingUp, FileText,
} from 'lucide-react';
import { Badge, Button, Card, Reveal } from '@/components/ui';
import { ELECTION, electionStage } from '@/data/electionInfo';
import { useI18n } from '@/i18n';

const fmt = new Intl.NumberFormat('es-CR');

const MODULES = [
  {
    id: 'comparador',
    icon: Scale,
    tone: 'blue',
    title: 'Comparador político',
    desc: 'Contrasta propuestas de partidos y candidatos por tema: educación, salud, economía, seguridad, ambiente y más.',
    size: 'lg',
    bg: 'bg-accent text-white',
  },
  {
    id: 'comunidad',
    icon: MessagesSquare,
    tone: 'red',
    title: 'Comunidad',
    desc: 'Debate con otros ciudadanos, sigue políticos verificados y participa en las conversaciones que definen el país.',
    size: 'lg',
    bg: 'bg-danger text-white',
  },
  { id: 'test', icon: BrainCircuit, tone: 'green', title: 'Test de afinidad', desc: 'Descubre qué propuestas resuenan con tu visión de país.' },
  { id: 'asamblea', icon: Gavel, tone: 'yellow', title: 'La Asamblea', desc: 'Votaciones, asistencias y proyectos de ley en curso.' },
  { id: 'planes', icon: BookOpen, tone: 'blue', title: 'Planes de gobierno', desc: 'Resúmenes inteligentes de cientos de páginas oficiales.' },
  { id: 'partidos', icon: Landmark, tone: 'red', title: 'Partidos', desc: 'Historia, ideología y candidaturas de cada agrupación.' },
  { id: 'ia', icon: Sparkles, tone: 'green', title: 'Asistente IA', desc: 'Respuestas neutrales basadas en documentos oficiales.', bg: 'bg-surface-2' },
  { id: 'abstencionismo', icon: Map, tone: 'yellow', title: 'Abstencionismo', desc: 'Participación histórica por provincia en el mapa.' },
];

const GUIDES = [
  '¿Qué hace un diputado?',
  '¿Cómo funciona la segunda ronda?',
  '¿Qué es la deuda política?',
  '¿Cuál es el papel del TSE?',
];

// Chip orbital: gira en sentido contrario para mantenerse legible
const OrbitChip = ({ icon: Icon, value, label, tone, position }) => (
  <div className={`absolute ${position} -translate-x-1/2 -translate-y-1/2 pointer-events-auto`}>
    <div className="animate-spin-reverse-slow bg-surface px-3 sm:px-4 py-2 rounded-2xl shadow-lift flex items-center gap-2.5 border border-line whitespace-nowrap hover:scale-105 transition-transform">
      <span className={`w-8 h-8 rounded-xl flex justify-center items-center shrink-0 ${tone}`}>
        <Icon size={15} />
      </span>
      <span className="hidden sm:block">
        <span className="block text-sm font-black text-ink leading-tight">{value}</span>
        <span className="block font-mono text-[8px] font-bold text-faint uppercase tracking-[0.15em]">{label}</span>
      </span>
    </div>
  </div>
);

const HomeView = ({ userName, onNavigate }) => {
  const stage = electionStage();
  const { t } = useI18n();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* ================= HERO ================= */}
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-14 pb-20 sm:pt-20 sm:pb-24 relative">
        {/* Fondo decorativo azul/rojo sutil */}
        <div
          className="absolute -top-20 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.07), rgb(var(--c-danger) / 0.04) 55%, transparent 75%)' }}
        />

        <div className="space-y-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-accent-soft text-accent px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                {t('home.kicker')} {ELECTION.year}
              </span>
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-black text-5xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-accent">
              Tu país,
              <br />
              <span className="text-ink">tus datos,</span>
              <br />
              <span className="text-danger">tu decisión.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="w-24 h-1.5 bg-danger rounded-full" />
          </Reveal>
          <Reveal delay={180}>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              {userName ? `${userName.split(' ')[0]}, ${t('home.welcomeBack')} ` : ''}
              {t('home.heroCopy')}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button size="lg" variant="accent" onClick={() => onNavigate('test')}>
                {t('home.ctaTest')}
                <ArrowRight size={15} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('comparador')}>
                {t('home.ctaComparador')}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Sistema orbital */}
        <Reveal delay={200}>
          <div className="relative flex justify-center py-10">
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]">
              {/* Anillo */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-line" />
              {/* Centro */}
              <div className="absolute inset-6 sm:inset-8 bg-surface rounded-full shadow-lift border border-line flex flex-col items-center justify-center p-8 text-center">
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 30% 25%, rgb(var(--c-accent) / 0.06), transparent 60%)' }}
                />
                <PieChart size={72} className="text-accent/15 mb-4 sm:w-[92px] sm:h-[92px]" />
                <h3 className="text-lg sm:text-xl font-black text-accent uppercase tracking-tighter leading-none mb-2">
                  {t('home.monitor')}
                </h3>
                <Badge tone={stage.stage === 'post' ? 'green' : 'red'} icon={<Vote size={10} />}>
                  {stage.stage === 'post' ? t('home.concluded') : stage.label}
                </Badge>
              </div>
              {/* Órbita */}
              <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                <OrbitChip
                  icon={Users2}
                  value={fmt.format(ELECTION.deputies)}
                  label="Diputaciones"
                  tone="bg-accent-soft text-accent"
                  position="top-0 left-1/2"
                />
                <OrbitChip
                  icon={TrendingUp}
                  value={`${(ELECTION.registeredVoters / 1e6).toFixed(1)} M`}
                  label="Padrón nacional"
                  tone="bg-success-soft text-success"
                  position="top-[78%] left-[90%]"
                />
                <OrbitChip
                  icon={FileText}
                  value={fmt.format(ELECTION.parties)}
                  label="Partidos inscritos"
                  tone="bg-danger-soft text-danger"
                  position="top-[78%] left-[10%]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= MÓDULOS (bento con color) ================= */}
      <section className="py-14 sm:py-20">
        <Reveal>
          <div className="flex items-end gap-6 mb-10">
            <h2 className="font-black text-3xl sm:text-4xl text-accent tracking-tighter">
              {t('home.modulesTitle')}
            </h2>
            <div className="hidden md:block h-px bg-line flex-1 mb-2.5" />
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            const colored = mod.bg?.includes('text-white');
            return (
              <Reveal key={mod.id} delay={i * 60} className={mod.size === 'lg' ? 'sm:col-span-2' : ''}>
                <Card
                  hover
                  className={`h-full group relative overflow-hidden ${mod.bg || ''}`}
                  onClick={() => onNavigate(mod.id)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onNavigate(mod.id)}
                >
                  {colored && (
                    <Icon
                      size={120}
                      className="absolute -right-6 -top-6 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                    />
                  )}
                  <div className="flex flex-col h-full relative">
                    {colored ? (
                      <span className="inline-flex items-center gap-1.5 self-start mb-4 bg-white/15 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                        <Icon size={11} />
                        {mod.title}
                      </span>
                    ) : (
                      <Badge tone={mod.tone} className="self-start mb-4" icon={<Icon size={11} />}>
                        {mod.title}
                      </Badge>
                    )}
                    <p className={`leading-relaxed flex-1 ${mod.size === 'lg' ? 'text-base' : 'text-sm'} ${colored ? 'text-white/85' : 'text-muted'}`}>
                      {mod.desc}
                    </p>
                    <span className={`mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold group-hover:gap-3 transition-all ${colored ? 'text-white' : 'text-accent'}`}>
                      {t('common.open')} <ArrowRight size={13} />
                    </span>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= EDUCACIÓN CÍVICA ================= */}
      <section className="py-14 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="space-y-6">
            <h2 className="font-black text-3xl sm:text-4xl text-ink tracking-tighter leading-tight">
              ¿Confundido con la política?
              <br />
              <span className="text-accent">Empecemos por lo básico.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-md">{t('home.civicCopy')}</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {GUIDES.map((q, i) => (
                <button
                  key={q}
                  onClick={() => onNavigate('ia')}
                  className="stagger-item flex items-center justify-between gap-2 text-left text-sm font-medium text-ink
                    bg-surface border border-line rounded-xl px-4 py-3.5
                    hover:border-accent hover:shadow-lift hover:-translate-y-0.5 transition-all group"
                  style={{ '--index': i }}
                >
                  {q}
                  <span className="w-6 h-6 rounded-full bg-accent-soft text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                    <ArrowRight size={12} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          {/* Tarjeta azul de marca: el "dato del día" */}
          <div className="bg-accent text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden group shadow-lift">
            <Landmark size={190} className="absolute -right-8 -top-8 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative space-y-5">
              <span className="inline-block bg-white/15 px-3.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                {t('home.factOfDay')}
              </span>
              <p className="text-2xl sm:text-[1.65rem] font-black leading-snug tracking-tight">
                Durante las elecciones, el TSE adquiere el rango de un poder de la República,
                al mismo nivel que el Ejecutivo.
              </p>
              <p className="text-white/70 leading-relaxed text-sm">
                Esto garantiza la independencia absoluta de los procesos democráticos en Costa Rica.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= CTA COMUNIDAD ================= */}
      <Reveal>
        <section className="my-14 sm:my-20 rounded-3xl bg-surface-2 border border-line px-8 py-12 sm:px-14 sm:py-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(60% 90% at 50% 0%, rgb(var(--c-danger) / 0.05), transparent)' }}
          />
          <div className="relative space-y-5 max-w-xl mx-auto">
            <span className="w-12 h-12 rounded-2xl bg-danger text-white inline-flex items-center justify-center shadow-lift">
              <Users2 size={22} />
            </span>
            <h2 className="font-black text-3xl sm:text-4xl text-ink tracking-tighter">
              La democracia se construye <span className="text-danger">conversando</span>
            </h2>
            <p className="text-muted leading-relaxed">{t('home.ctaCommunityCopy')}</p>
            <Button size="lg" variant="accent" onClick={() => onNavigate('comunidad')}>
              {t('home.ctaCommunity')}
              <ArrowRight size={15} />
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default HomeView;
