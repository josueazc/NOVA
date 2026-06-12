import React from 'react';
import {
  Scale, Users2, MessagesSquare, BrainCircuit, Gavel, BookOpen,
  Landmark, Map, ArrowRight, Sparkles, CalendarDays, Vote,
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
  },
  {
    id: 'comunidad',
    icon: MessagesSquare,
    tone: 'red',
    title: 'Comunidad',
    desc: 'Debate con otros ciudadanos, sigue políticos verificados y participa en las conversaciones que definen el país.',
    size: 'lg',
  },
  { id: 'test', icon: BrainCircuit, tone: 'green', title: 'Test de afinidad', desc: 'Descubre qué propuestas resuenan con tu visión de país.' },
  { id: 'asamblea', icon: Gavel, tone: 'yellow', title: 'La Asamblea', desc: 'Votaciones, asistencias y proyectos de ley en curso.' },
  { id: 'planes', icon: BookOpen, tone: 'blue', title: 'Planes de gobierno', desc: 'Resúmenes inteligentes de cientos de páginas oficiales.' },
  { id: 'partidos', icon: Landmark, tone: 'red', title: 'Partidos', desc: 'Historia, ideología y candidaturas de cada agrupación.' },
  { id: 'ia', icon: Sparkles, tone: 'green', title: 'Asistente IA', desc: 'Respuestas neutrales basadas en documentos oficiales.' },
  { id: 'abstencionismo', icon: Map, tone: 'yellow', title: 'Abstencionismo', desc: 'Participación histórica por provincia en el mapa.' },
];

const STATS = [
  { key: 'stats.registeredParties', value: fmt.format(ELECTION.parties) },
  { key: 'stats.deputies', value: fmt.format(ELECTION.deputies) },
  { key: 'stats.voters', value: `${(ELECTION.registeredVoters / 1e6).toFixed(1)} M` },
  { key: 'stats.provinces', value: fmt.format(ELECTION.provinces) },
];

const GUIDES = [
  '¿Qué hace un diputado?',
  '¿Cómo funciona la segunda ronda?',
  '¿Qué es la deuda política?',
  '¿Cuál es el papel del TSE?',
];

const HomeView = ({ userName, onNavigate }) => {
  const stage = electionStage();
  const { t } = useI18n();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* ================= HERO ================= */}
      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center py-20 sm:py-28">
        <div className="space-y-7">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              {t('home.kicker')} {ELECTION.year}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-black tracking-tight text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-ink">
              {t('home.heroLine1')}
              <br />
              <span className="text-accent">{t('home.heroLine2')}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              {userName ? `${userName.split(' ')[0]}, ${t('home.welcomeBack')} ` : ''}
              {t('home.heroCopy')}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" onClick={() => onNavigate('test')}>
                {t('home.ctaTest')}
                <ArrowRight size={15} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('comparador')}>
                {t('home.ctaComparador')}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Tarjeta de datos del proceso */}
        <Reveal delay={200}>
          <Card padding="p-0" className="overflow-hidden">
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                {t('home.monitor')}
              </span>
              <Badge tone={stage.stage === 'post' ? 'green' : 'blue'} icon={<Vote size={10} />}>
                {stage.stage === 'post' ? t('home.concluded') : t('home.ongoing')}
              </Badge>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-accent-soft text-accent-ink flex items-center justify-center shrink-0">
                  <CalendarDays size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{stage.label}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {t('home.rounds')}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-line rounded-lg overflow-hidden border border-line">
                {STATS.map(({ key, value }) => (
                  <div key={key} className="bg-surface px-4 py-3.5">
                    <p className="text-xl font-semibold text-ink tracking-tight">{value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-faint mt-0.5">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ================= MÓDULOS (bento) ================= */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted mb-3">{t('home.modules')}</p>
              <h2 className="font-black tracking-tight text-3xl sm:text-4xl text-ink tracking-tight">
                {t('home.modulesTitle')}
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <Reveal key={mod.id} delay={i * 60} className={mod.size === 'lg' ? 'sm:col-span-2' : ''}>
                <Card
                  hover
                  className="h-full group"
                  onClick={() => onNavigate(mod.id)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onNavigate(mod.id)}
                >
                  <div className="flex flex-col h-full">
                    <Badge tone={mod.tone} className="self-start mb-4" icon={<Icon size={11} />}>
                      {mod.title}
                    </Badge>
                    <p className={`text-muted leading-relaxed flex-1 ${mod.size === 'lg' ? 'text-base' : 'text-sm'}`}>
                      {mod.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink group-hover:gap-3 transition-all">
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
      <section className="py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="space-y-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t('home.civicEd')}</p>
            <h2 className="font-black tracking-tight text-3xl sm:text-4xl text-ink tracking-tight leading-tight">
              {t('home.civicTitle1')}
              <br />
              <span className="text-accent">{t('home.civicTitle2')}</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-md">{t('home.civicCopy')}</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {GUIDES.map((q, i) => (
                <button
                  key={q}
                  onClick={() => onNavigate('ia')}
                  className="stagger-item flex items-center justify-between gap-2 text-left text-sm text-ink
                    bg-surface border border-line rounded-lg px-4 py-3
                    hover:border-accent/40 hover:shadow-lift transition-all group"
                  style={{ '--index': i }}
                >
                  {q}
                  <ArrowRight size={13} className="text-faint group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Card padding="p-8 sm:p-10" className="relative overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.05), transparent 70%)' }}
            />
            <Badge tone="yellow" className="mb-5">{t('home.factOfDay')}</Badge>
            <blockquote className="font-black tracking-tight text-2xl sm:text-[1.7rem] leading-snug text-ink">
              “Durante las elecciones, el TSE adquiere el rango de un poder de la República,
              al mismo nivel que el Ejecutivo.”
            </blockquote>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              Esto garantiza la independencia absoluta de los procesos democráticos en Costa Rica.
            </p>
          </Card>
        </Reveal>
      </section>

      {/* ================= CTA COMUNIDAD ================= */}
      <Reveal>
        <section className="my-16 sm:my-24 border border-line rounded-2xl bg-surface px-8 py-12 sm:px-14 sm:py-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgb(var(--c-accent) / 0.04), transparent)' }}
          />
          <div className="relative space-y-5 max-w-xl mx-auto">
            <span className="w-11 h-11 rounded-xl bg-danger-soft text-danger inline-flex items-center justify-center">
              <Users2 size={20} />
            </span>
            <h2 className="font-black tracking-tight text-3xl sm:text-4xl text-ink tracking-tight">
              {t('home.ctaCommunityTitle1')} <span className="text-accent">{t('home.ctaCommunityTitle2')}</span>
            </h2>
            <p className="text-muted leading-relaxed">
              {t('home.ctaCommunityCopy')}
            </p>
            <Button size="lg" onClick={() => onNavigate('comunidad')}>
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
