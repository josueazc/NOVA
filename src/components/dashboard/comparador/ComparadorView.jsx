import React, { useMemo, useState } from 'react';
import { Scale, Search, Sparkles, ArrowLeftRight, Map as MapIcon, LayoutList, ExternalLink } from 'lucide-react';
import { Badge, Button, Card, EmptyState, Select, Spinner, Tabs, useToast } from '@/components/ui';
import { partidosData } from '@/data/partidosData';
import { TOPICS, PROPOSALS_2026, IDEOLOGY_2026, candidateByParty, proposalsByTopic } from '@/data/elections2026';
import { compareProposals, hasAIConfig } from '@/services/ai';
import IdeologyMap from './IdeologyMap';
import StanceChart from './StanceChart';

const AXIS_LABELS = {
  educacion: ['+ inversión pública', '+ autonomía/mercado'],
  salud: ['+ CCSS pública', '+ participación privada'],
  economia: ['+ Estado', '+ mercado'],
  seguridad: ['+ prevención social', '+ mano dura'],
  ambiente: ['+ conservación', '+ aprovechamiento'],
  tecnologia: ['+ servicio público', '+ desregulación'],
  derechos: ['+ progresista', '+ conservador'],
};

const MODES = [
  { value: 'tema', label: 'Por tema' },
  { value: 'frente', label: 'Frente a frente' },
  { value: 'mapa', label: 'Mapa ideológico' },
];

const PARTY_IDS = Object.keys(IDEOLOGY_2026).filter((id) => partidosData[id]);

const PartyChip = ({ partyId }) => {
  const party = partidosData[partyId];
  if (!party) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: party.color }} />
      <span className="font-semibold text-ink">{party.siglas}</span>
    </span>
  );
};

const ProposalCard = ({ proposal }) => {
  const party = partidosData[proposal.partyId];
  const candidate = candidateByParty(proposal.partyId);
  return (
    <Card padding="p-5" className="h-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <PartyChip partyId={proposal.partyId} />
        {candidate && (
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint truncate">
            {candidate.name}
          </span>
        )}
      </div>
      <h4 className="text-[15px] font-semibold text-ink leading-snug">{proposal.title}</h4>
      <p className="text-sm text-muted leading-relaxed flex-1">{proposal.summary}</p>
      {proposal.sourceUrl ? (
        <a
          href={proposal.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
        >
          Plan oficial <ExternalLink size={11} />
        </a>
      ) : (
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">Resumen editorial</span>
      )}
    </Card>
  );
};

const ComparadorView = () => {
  const toast = useToast();
  const [mode, setMode] = useState('tema');
  const [topic, setTopic] = useState('educacion');
  const [query, setQuery] = useState('');
  const [partyA, setPartyA] = useState('pln');
  const [partyB, setPartyB] = useState('plp');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState('economia');

  const topicProposals = useMemo(() => {
    let list = proposalsByTopic(topic);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          partidosData[p.partyId]?.nombre.toLowerCase().includes(q)
      );
    }
    return list;
  }, [topic, query]);

  const faceToFace = useMemo(
    () =>
      TOPICS.map((t) => ({
        topic: t,
        a: PROPOSALS_2026.find((p) => p.topic === t.id && p.partyId === partyA),
        b: PROPOSALS_2026.find((p) => p.topic === t.id && p.partyId === partyB),
      })),
    [partyA, partyB]
  );

  const runAIComparison = async () => {
    const a = PROPOSALS_2026.find((p) => p.topic === aiTopic && p.partyId === partyA);
    const b = PROPOSALS_2026.find((p) => p.topic === aiTopic && p.partyId === partyB);
    if (!a || !b) {
      toast.error('No hay propuestas registradas para ese tema.');
      return;
    }
    setAiLoading(true);
    setAiResult(null);
    try {
      const result = await compareProposals(
        [
          { name: partidosData[partyA].siglas, text: `${a.title}. ${a.summary}` },
          { name: partidosData[partyB].siglas, text: `${b.title}. ${b.summary}` },
        ],
        TOPICS.find((t) => t.id === aiTopic)?.label || aiTopic
      );
      setAiResult(result);
    } catch (err) {
      toast.error(`Análisis IA no disponible: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Encabezado */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-accent-soft text-accent-ink flex items-center justify-center">
            <Scale size={18} />
          </span>
          <div>
            <h1 className="font-serif text-3xl text-ink tracking-tight leading-none">Comparador político</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mt-1">
              Elecciones 2026 · {PARTY_IDS.length} partidos · {TOPICS.length} temas
            </p>
          </div>
        </div>
      </header>

      <Tabs tabs={MODES} active={mode} onChange={setMode} className="mb-8" />

      {/* ============ MODO: POR TEMA ============ */}
      {mode === 'tema' && (
        <div className="space-y-6 animate-fade-up">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all
                    ${topic === t.id ? 'bg-ink text-canvas border-ink' : 'bg-surface text-muted border-line hover:text-ink hover:border-faint'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar propuesta o partido…"
                className="bg-surface border border-line rounded-md pl-9 pr-3.5 py-2 text-sm text-ink
                  placeholder:text-faint outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors w-64"
              />
            </div>
          </div>

          <Card padding="p-5 sm:p-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
              Posiciones en {TOPICS.find((t) => t.id === topic)?.label}
            </h3>
            <StanceChart
              proposals={proposalsByTopic(topic)}
              leftLabel={AXIS_LABELS[topic]?.[0]}
              rightLabel={AXIS_LABELS[topic]?.[1]}
            />
          </Card>

          {topicProposals.length === 0 ? (
            <EmptyState
              icon={<Search size={22} />}
              title="Sin resultados"
              description="Ninguna propuesta coincide con tu búsqueda en este tema."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topicProposals.map((p, i) => (
                <div key={`${p.partyId}-${p.topic}`} className="stagger-item" style={{ '--index': i }}>
                  <ProposalCard proposal={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============ MODO: FRENTE A FRENTE ============ */}
      {mode === 'frente' && (
        <div className="space-y-6 animate-fade-up">
          <Card padding="p-5">
            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <Select label="Partido A" value={partyA} onChange={(e) => setPartyA(e.target.value)}>
                {PARTY_IDS.map((id) => (
                  <option key={id} value={id}>{partidosData[id].nombre}</option>
                ))}
              </Select>
              <div className="hidden sm:flex items-center justify-center pb-2.5 text-faint">
                <ArrowLeftRight size={18} />
              </div>
              <Select label="Partido B" value={partyB} onChange={(e) => setPartyB(e.target.value)}>
                {PARTY_IDS.map((id) => (
                  <option key={id} value={id}>{partidosData[id].nombre}</option>
                ))}
              </Select>
            </div>

            {/* Candidatos */}
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {[partyA, partyB].map((pid) => {
                const c = candidateByParty(pid);
                const party = partidosData[pid];
                return (
                  <div key={pid} className="flex items-center gap-3 bg-surface-2 rounded-lg px-4 py-3">
                    <span className="w-9 h-9 rounded-full shrink-0 border-2 border-surface shadow-card" style={{ backgroundColor: party.color }} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">{c ? c.name : 'Sin candidatura registrada'}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint truncate">
                        {party.siglas} {c ? `· ${c.background}` : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Análisis IA */}
          <Card padding="p-5" className="border-accent/20">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-accent" />
                <h3 className="text-sm font-semibold text-ink">Análisis comparativo con IA</h3>
                <Badge tone="blue">Neutral</Badge>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  aria-label="Tema para análisis IA"
                  className="bg-surface-2 text-muted text-xs font-medium rounded-md px-2.5 py-1.5 border border-line outline-none cursor-pointer"
                >
                  {TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                <Button size="sm" onClick={runAIComparison} loading={aiLoading} disabled={!hasAIConfig()}>
                  Analizar
                </Button>
              </div>
            </div>
            {!hasAIConfig() && (
              <p className="text-xs text-faint mt-2">Configura VITE_GEMINI_API_KEY para habilitar el análisis.</p>
            )}
            {aiLoading && (
              <div className="flex items-center gap-2 text-muted text-sm mt-4">
                <Spinner size={14} /> Comparando propuestas…
              </div>
            )}
            {aiResult && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4 animate-fade-up">
                <div className="space-y-2">
                  <Badge tone="green">Similitudes</Badge>
                  <ul className="space-y-1.5">
                    {(aiResult.similitudes || []).map((s, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed pl-3 border-l-2 border-success/30">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <Badge tone="red">Diferencias</Badge>
                  <ul className="space-y-1.5">
                    {(aiResult.diferencias || []).map((d, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed pl-3 border-l-2 border-danger/30">
                        <span className="font-medium text-ink">{d.aspecto}:</span>{' '}
                        {Object.entries(d.posiciones || {}).map(([k, v]) => `${k} — ${v}`).join(' · ')}
                      </li>
                    ))}
                  </ul>
                </div>
                {aiResult.explicacion_simple && (
                  <p className="sm:col-span-2 text-sm text-ink bg-accent-soft/50 rounded-lg px-4 py-3 leading-relaxed">
                    {aiResult.explicacion_simple}
                  </p>
                )}
              </div>
            )}
          </Card>

          {/* Tabla comparativa por tema */}
          <div className="space-y-4">
            {faceToFace.map(({ topic: t, a, b }) => (
              <Card key={t.id} padding="p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-3">{t.label}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[a, b].map((prop, idx) =>
                    prop ? (
                      <div key={idx} className="space-y-1.5">
                        <PartyChip partyId={prop.partyId} />
                        <p className="text-sm font-medium text-ink">{prop.title}</p>
                        <p className="text-sm text-muted leading-relaxed">{prop.summary}</p>
                      </div>
                    ) : (
                      <p key={idx} className="text-sm text-faint italic">Sin propuesta registrada.</p>
                    )
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ============ MODO: MAPA IDEOLÓGICO ============ */}
      {mode === 'mapa' && (
        <div className="space-y-6 animate-fade-up">
          <Card padding="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapIcon size={15} className="text-accent" />
              <h3 className="text-sm font-semibold text-ink">¿Dónde se ubica cada partido?</h3>
            </div>
            <IdeologyMap />
          </Card>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PARTY_IDS.map((id) => {
              const party = partidosData[id];
              const pos = IDEOLOGY_2026[id];
              return (
                <Card key={id} padding="p-4" className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg shrink-0 border border-line" style={{ backgroundColor: party.color }} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{party.siglas}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                      eco {pos.economia > 0 ? '+' : ''}{pos.economia} · soc {pos.social > 0 ? '+' : ''}{pos.social}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Nota metodológica */}
      <p className="flex items-start gap-2 text-xs text-faint leading-relaxed mt-10 max-w-2xl">
        <LayoutList size={13} className="mt-0.5 shrink-0" />
        Los resúmenes y posiciones son síntesis editoriales neutrales con fines educativos,
        elaboradas a partir de los planes de gobierno públicos. Consulta siempre los documentos
        oficiales en el sitio del TSE antes de decidir tu voto.
      </p>
    </div>
  );
};

export default ComparadorView;
