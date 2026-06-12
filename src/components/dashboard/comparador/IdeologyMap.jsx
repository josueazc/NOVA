import React, { useState } from 'react';
import { partidosData } from '@/data/partidosData';
import { IDEOLOGY_2026 } from '@/data/elections2026';

// Mapa ideológico SVG: eje X economía (Estado <-> mercado),
// eje Y social (progresista <-> conservador).
const W = 560;
const H = 420;
const PAD = 56;

const sx = (v) => PAD + ((v + 10) / 20) * (W - PAD * 2);
const sy = (v) => H - PAD - ((v + 10) / 20) * (H - PAD * 2);

const IdeologyMap = ({ highlight = [] }) => {
  const [hovered, setHovered] = useState(null);
  const entries = Object.entries(IDEOLOGY_2026).filter(([id]) => partidosData[id]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Mapa ideológico de partidos: eje horizontal economía, eje vertical social"
        className="w-full max-w-[640px] mx-auto select-none"
      >
        {/* Cuadrantes */}
        <rect x={PAD} y={PAD} width={(W - PAD * 2) / 2} height={(H - PAD * 2) / 2} fill="rgb(var(--c-accent) / 0.03)" />
        <rect x={W / 2} y={H / 2} width={(W - PAD * 2) / 2} height={(H - PAD * 2) / 2} fill="rgb(var(--c-accent) / 0.03)" />

        {/* Ejes */}
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="rgb(var(--c-line))" strokeWidth="1" />
        <line x1={W / 2} y1={PAD} x2={W / 2} y2={H - PAD} stroke="rgb(var(--c-line))" strokeWidth="1" />

        {/* Etiquetas de ejes */}
        <text x={PAD} y={H / 2 - 8} fontSize="10" fill="rgb(var(--c-faint))" fontFamily="JetBrains Mono, monospace">+ ESTADO</text>
        <text x={W - PAD} y={H / 2 - 8} fontSize="10" fill="rgb(var(--c-faint))" textAnchor="end" fontFamily="JetBrains Mono, monospace">+ MERCADO</text>
        <text x={W / 2 + 8} y={PAD + 4} fontSize="10" fill="rgb(var(--c-faint))" fontFamily="JetBrains Mono, monospace">CONSERVADOR</text>
        <text x={W / 2 + 8} y={H - PAD} fontSize="10" fill="rgb(var(--c-faint))" fontFamily="JetBrains Mono, monospace">PROGRESISTA</text>

        {/* Puntos de partidos */}
        {entries.map(([id, pos]) => {
          const party = partidosData[id];
          const dim = highlight.length > 0 && !highlight.includes(id);
          const isHovered = hovered === id;
          return (
            <g
              key={id}
              opacity={dim ? 0.25 : 1}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default', transition: 'opacity 0.2s' }}
            >
              <circle
                cx={sx(pos.economia)}
                cy={sy(-pos.social)}
                r={isHovered ? 11 : 8}
                fill={party.color}
                stroke="rgb(var(--c-surface))"
                strokeWidth="2"
                style={{ transition: 'r 0.15s' }}
              />
              <text
                x={sx(pos.economia)}
                y={sy(-pos.social) - 14}
                fontSize={isHovered ? 13 : 11}
                fontWeight="600"
                fill="rgb(var(--c-ink))"
                textAnchor="middle"
              >
                {party.siglas}
              </text>
              {isHovered && (
                <text
                  x={sx(pos.economia)}
                  y={sy(-pos.social) + 26}
                  fontSize="9"
                  fill="rgb(var(--c-muted))"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                >
                  eco {pos.economia > 0 ? '+' : ''}{pos.economia} · soc {pos.social > 0 ? '+' : ''}{pos.social}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-faint mt-2">
        Estimación editorial con fines educativos — no es una medición oficial
      </p>
    </div>
  );
};

export default IdeologyMap;
