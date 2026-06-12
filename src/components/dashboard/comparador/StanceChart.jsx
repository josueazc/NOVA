import React from 'react';
import { partidosData } from '@/data/partidosData';

// Barra horizontal divergente: posición de cada partido en el eje del tema.
const StanceChart = ({ proposals, leftLabel, rightLabel }) => {
  const sorted = [...proposals].sort((a, b) => a.stance - b.stance);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-faint px-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="space-y-1">
        {sorted.map((p) => {
          const party = partidosData[p.partyId];
          if (!party) return null;
          const pct = ((p.stance + 10) / 20) * 100;
          return (
            <div key={p.partyId} className="relative h-7 bg-surface-2 rounded-md overflow-hidden" title={`${party.siglas}: ${p.title}`}>
              {/* Línea central */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line" />
              {/* Marcador */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-500"
                style={{ left: `${pct}%` }}
              >
                <span className="w-3.5 h-3.5 rounded-full border-2 border-surface shadow-card shrink-0" style={{ backgroundColor: party.color }} />
              </div>
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-[11px] font-semibold text-ink whitespace-nowrap ${pct > 50 ? 'pr-2' : 'pl-2'}`}
                style={pct > 50 ? { right: `${100 - pct + 3}%` } : { left: `${pct + 3}%` }}
              >
                {party.siglas}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StanceChart;
