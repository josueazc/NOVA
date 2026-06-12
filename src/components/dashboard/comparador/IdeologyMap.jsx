import React, { useState } from 'react';
import { partidosData } from '@/data/partidosData';
import { IDEOLOGY_2026 } from '@/data/elections2026';

const W = 600;
const H = 480;
const PAD = 64;
const CX = W / 2;
const CY = H / 2;
const INNER_W = W - PAD * 2;
const INNER_H = H - PAD * 2;

const sx = (v) => PAD + ((v + 10) / 20) * INNER_W;
const sy = (v) => H - PAD - ((v + 10) / 20) * INNER_H;

// Quadrant labels
const QUADRANTS = [
  { x: PAD + 8, y: PAD + 18, label: 'IZQUIERDA', sub: 'Conservadora', color: 'rgb(213 16 32 / 0.7)' },
  { x: CX + 8, y: PAD + 18, label: 'DERECHA', sub: 'Conservadora', color: 'rgb(0 43 127 / 0.7)' },
  { x: PAD + 8, y: H - PAD - 8, label: 'IZQUIERDA', sub: 'Progresista', color: 'rgb(213 16 32 / 0.5)', anchor: 'start', baseline: 'auto' },
  { x: CX + 8, y: H - PAD - 8, label: 'DERECHA', sub: 'Progresista', color: 'rgb(0 43 127 / 0.5)', anchor: 'start', baseline: 'auto' },
];

const IdeologyMap = ({ highlight = [] }) => {
  const [hovered, setHovered] = useState(null);
  const entries = Object.entries(IDEOLOGY_2026).filter(([id]) => partidosData[id]);

  const hoveredParty = hovered ? partidosData[hovered] : null;
  const hoveredPos = hovered ? IDEOLOGY_2026[hovered] : null;

  return (
    <div className="w-full">
      <div className="relative w-full overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Brújula ideológica: eje horizontal economía (izquierda↔derecha), eje vertical valores (conservador↔progresista)"
          className="w-full max-w-[640px] mx-auto select-none block"
        >
          <defs>
            <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(0 43 127)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="rgb(0 43 127)" stopOpacity="0" />
            </radialGradient>

            {/* Quadrant fills */}
            <clipPath id="q1"><rect x={PAD} y={PAD} width={INNER_W/2} height={INNER_H/2} /></clipPath>
            <clipPath id="q2"><rect x={CX} y={PAD} width={INNER_W/2} height={INNER_H/2} /></clipPath>
            <clipPath id="q3"><rect x={PAD} y={CY} width={INNER_W/2} height={INNER_H/2} /></clipPath>
            <clipPath id="q4"><rect x={CX} y={CY} width={INNER_W/2} height={INNER_H/2} /></clipPath>

            {/* Party glow filters */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-lg" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={PAD} y={PAD} width={INNER_W} height={INNER_H} fill="rgb(var(--c-surface-2))" rx="4" />

          {/* Quadrant tints */}
          <rect x={PAD} y={PAD} width={INNER_W/2} height={INNER_H/2} fill="rgb(213 16 32 / 0.04)" />
          <rect x={CX} y={PAD} width={INNER_W/2} height={INNER_H/2} fill="rgb(0 43 127 / 0.04)" />
          <rect x={PAD} y={CY} width={INNER_W/2} height={INNER_H/2} fill="rgb(213 16 32 / 0.07)" />
          <rect x={CX} y={CY} width={INNER_W/2} height={INNER_H/2} fill="rgb(0 43 127 / 0.07)" />

          {/* Radial center glow */}
          <ellipse cx={CX} cy={CY} rx={INNER_W*0.4} ry={INNER_H*0.4} fill="url(#glow-center)" />

          {/* Grid lines (subtle) */}
          {[-6,-4,-2,2,4,6].map(v => (
            <React.Fragment key={v}>
              <line x1={sx(v)} y1={PAD} x2={sx(v)} y2={H-PAD}
                stroke="rgb(var(--c-line))" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.5" />
              <line x1={PAD} y1={sy(v)} x2={W-PAD} y2={sy(v)}
                stroke="rgb(var(--c-line))" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.5" />
            </React.Fragment>
          ))}

          {/* Main axes */}
          <line x1={PAD} y1={CY} x2={W-PAD} y2={CY}
            stroke="rgb(var(--c-ink))" strokeWidth="1.5" opacity="0.25" />
          <line x1={CX} y1={PAD} x2={CX} y2={H-PAD}
            stroke="rgb(var(--c-ink))" strokeWidth="1.5" opacity="0.25" />

          {/* Axis arrows */}
          <polygon points={`${W-PAD},${CY-4} ${W-PAD+8},${CY} ${W-PAD},${CY+4}`}
            fill="rgb(var(--c-muted))" opacity="0.5" />
          <polygon points={`${PAD},${CY-4} ${PAD-8},${CY} ${PAD},${CY+4}`}
            fill="rgb(var(--c-muted))" opacity="0.5" />
          <polygon points={`${CX-4},${PAD} ${CX},${PAD-8} ${CX+4},${PAD}`}
            fill="rgb(var(--c-muted))" opacity="0.5" />
          <polygon points={`${CX-4},${H-PAD} ${CX},${H-PAD+8} ${CX+4},${H-PAD}`}
            fill="rgb(var(--c-muted))" opacity="0.5" />

          {/* Axis Labels */}
          <text x={PAD + 10} y={CY - 10} fontSize="9" fill="rgb(var(--c-muted))" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="0.15em">+ ESTADO</text>
          <text x={W - PAD - 10} y={CY - 10} fontSize="9" fill="rgb(var(--c-muted))" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="0.15em" textAnchor="end">+ MERCADO</text>
          <text x={CX + 8} y={PAD + 12} fontSize="9" fill="rgb(var(--c-muted))" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="0.15em">CONSERVADOR</text>
          <text x={CX + 8} y={H - PAD - 8} fontSize="9" fill="rgb(var(--c-muted))" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="0.15em">PROGRESISTA</text>

          {/* Center cross */}
          <circle cx={CX} cy={CY} r={3} fill="rgb(var(--c-faint))" />

          {/* Party dots */}
          {entries.map(([id, pos]) => {
            const party = partidosData[id];
            const dim = highlight.length > 0 && !highlight.includes(id);
            const isHovered = hovered === id;
            const x = sx(pos.economia);
            const y = sy(-pos.social);

            return (
              <g
                key={id}
                opacity={dim ? 0.2 : 1}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
              >
                {/* Outer glow ring when hovered */}
                {isHovered && (
                  <circle cx={x} cy={y} r={22}
                    fill={party.color} opacity="0.15"
                    style={{ filter: 'blur(6px)' }} />
                )}
                {/* Glow aura */}
                <circle cx={x} cy={y} r={isHovered ? 13 : 9}
                  fill={party.color} opacity={isHovered ? 0.3 : 0.2}
                  style={{ filter: 'blur(4px)' }} />
                {/* Main dot */}
                <circle cx={x} cy={y} r={isHovered ? 11 : 8}
                  fill={party.color}
                  stroke="rgb(var(--c-surface))"
                  strokeWidth={isHovered ? 2.5 : 2}
                  style={{ transition: 'r 0.15s, stroke-width 0.15s' }}
                />
                {/* Label */}
                <text
                  x={x}
                  y={y - (isHovered ? 17 : 14)}
                  fontSize={isHovered ? 12 : 10}
                  fontWeight="800"
                  fill={isHovered ? party.color : 'rgb(var(--c-ink))'}
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  style={{ transition: 'font-size 0.15s' }}
                >
                  {party.siglas}
                </text>
              </g>
            );
          })}

          {/* Hover tooltip inside SVG */}
          {hoveredParty && hoveredPos && (() => {
            const tx = sx(hoveredPos.economia);
            const ty = sy(-hoveredPos.social);
            const tooltipW = 150;
            const tooltipH = 52;
            const ox = tx + 16 + tooltipW > W - 8 ? -tooltipW - 12 : 16;
            const oy = ty - tooltipH / 2;
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={tx + ox - 6} y={Math.max(PAD, Math.min(H - PAD - tooltipH, oy)) - 6}
                  width={tooltipW + 12} height={tooltipH + 12}
                  rx="10" fill="rgb(var(--c-surface))"
                  stroke={hoveredParty.color} strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
                />
                <text
                  x={tx + ox}
                  y={Math.max(PAD, Math.min(H - PAD - tooltipH, oy)) + 11}
                  fontSize="11" fontWeight="800"
                  fill={hoveredParty.color}
                  fontFamily="system-ui, sans-serif"
                >
                  {hoveredParty.siglas}
                </text>
                <text
                  x={tx + ox}
                  y={Math.max(PAD, Math.min(H - PAD - tooltipH, oy)) + 26}
                  fontSize="9" fill="rgb(var(--c-ink))"
                  fontFamily="system-ui, sans-serif" fontWeight="600"
                >
                  {hoveredParty.nombre.length > 22 ? hoveredParty.nombre.slice(0, 22) + '…' : hoveredParty.nombre}
                </text>
                <text
                  x={tx + ox}
                  y={Math.max(PAD, Math.min(H - PAD - tooltipH, oy)) + 40}
                  fontSize="8" fill="rgb(var(--c-muted))"
                  fontFamily="JetBrains Mono, monospace"
                >
                  eco {hoveredPos.economia > 0 ? '+' : ''}{hoveredPos.economia}  ·  soc {hoveredPos.social > 0 ? '+' : ''}{hoveredPos.social}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {entries.map(([id]) => {
          const party = partidosData[id];
          return (
            <button
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all
                ${hovered === id ? 'border-current shadow-sm scale-105' : 'border-line bg-surface text-muted hover:text-ink'}`}
              style={hovered === id ? { borderColor: party.color, color: party.color, background: party.color + '10' } : {}}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: party.color }} />
              {party.siglas}
            </button>
          );
        })}
      </div>

      <p className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-faint mt-3">
        Estimación editorial con fines educativos — no es una medición oficial
      </p>
    </div>
  );
};

export default IdeologyMap;
