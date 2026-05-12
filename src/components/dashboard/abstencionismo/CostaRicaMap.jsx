import React, { useState } from 'react';

// Componente: Mapa interactivo SVG de Costa Rica por provincias
// Cada provincia es un path clickeable con hover y tooltip

const CostaRicaMap = ({ datosPorProvincia, onProvinciaSelect, provinciaActiva }) => {
  const [hoveredProvincia, setHoveredProvincia] = useState(null);

  // Paths simplificados de las 7 provincias de Costa Rica
  const provincias = [
    {
      nombre: 'San José',
      path: 'M 245,195 L 260,180 L 280,175 L 300,178 L 315,185 L 325,200 L 330,218 L 325,235 L 310,245 L 290,250 L 270,248 L 255,240 L 242,228 L 238,212 Z',
    },
    {
      nombre: 'Alajuela',
      path: 'M 180,110 L 200,95 L 225,88 L 255,90 L 280,95 L 295,108 L 300,125 L 295,145 L 280,160 L 260,175 L 245,190 L 240,210 L 230,215 L 215,208 L 200,195 L 185,180 L 172,160 L 165,140 L 168,125 Z',
    },
    {
      nombre: 'Cartago',
      path: 'M 300,178 L 315,170 L 335,165 L 350,172 L 360,185 L 365,200 L 360,215 L 350,228 L 335,238 L 325,235 L 330,218 L 325,200 L 315,185 Z',
    },
    {
      nombre: 'Heredia',
      path: 'M 245,130 L 260,118 L 278,112 L 295,108 L 300,125 L 295,145 L 280,160 L 260,175 L 245,190 L 242,180 L 248,162 L 250,145 Z',
    },
    {
      nombre: 'Guanacaste',
      path: 'M 80,60 L 105,45 L 130,38 L 155,42 L 175,55 L 188,72 L 195,90 L 200,95 L 180,110 L 168,125 L 155,145 L 140,162 L 125,172 L 110,178 L 95,170 L 80,155 L 68,135 L 60,115 L 58,95 L 62,78 Z',
    },
    {
      nombre: 'Puntarenas',
      path: 'M 95,170 L 110,178 L 125,172 L 140,162 L 155,145 L 165,140 L 172,160 L 185,180 L 200,195 L 215,208 L 230,215 L 240,228 L 255,240 L 270,248 L 290,250 L 310,245 L 325,235 L 335,238 L 340,255 L 335,275 L 320,290 L 300,300 L 275,308 L 250,310 L 225,305 L 200,295 L 175,280 L 150,265 L 128,248 L 110,230 L 98,210 L 90,190 Z',
    },
    {
      nombre: 'Limón',
      path: 'M 295,108 L 310,100 L 335,92 L 360,88 L 385,90 L 405,100 L 420,115 L 430,135 L 435,158 L 430,180 L 420,200 L 405,218 L 390,232 L 372,242 L 355,248 L 340,255 L 335,238 L 350,228 L 360,215 L 365,200 L 360,185 L 350,172 L 335,165 L 315,170 L 300,178 L 300,158 L 300,138 L 300,125 Z',
    },
  ];

  // Función para obtener color basado en el porcentaje de abstencionismo
  const getColor = (nombre, isHovered, isActive) => {
    const datos = datosPorProvincia[nombre];
    if (!datos) return '#94A3B8';

    const abstencionismo = datos.abstencionismo;

    if (isActive) return '#002B7F';
    if (isHovered) return '#1D4ED8';

    // Escala de rojo según intensidad
    if (abstencionismo >= 43) return '#991B1B';
    if (abstencionismo >= 36) return '#DC2626';
    if (abstencionismo >= 28) return '#F97316';
    if (abstencionismo >= 25) return '#FBBF24';
    return '#22C55E';
  };

  const getStroke = (nombre, isHovered, isActive) => {
    if (isActive) return '#EF1C24';
    if (isHovered) return '#002B7F';
    return '#FFFFFF';
  };

  // Posiciones de las etiquetas de cada provincia
  const labelPositions = {
    'San José': { x: 278, y: 215 },
    'Alajuela': { x: 228, y: 150 },
    'Cartago': { x: 340, y: 200 },
    'Heredia': { x: 268, y: 148 },
    'Guanacaste': { x: 125, y: 110 },
    'Puntarenas': { x: 210, y: 275 },
    'Limón': { x: 375, y: 170 },
  };

  return (
    <div className="relative w-full">
      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-3 mb-6 justify-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Escala:</span>
        {[
          { color: '#22C55E', label: '< 25%' },
          { color: '#FBBF24', label: '25-28%' },
          { color: '#F97316', label: '28-36%' },
          { color: '#DC2626', label: '36-43%' },
          { color: '#991B1B', label: '> 43%' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: item.color }}></div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Mapa SVG */}
      <svg
        viewBox="40 20 420 310"
        className="w-full h-auto max-h-[500px] mx-auto drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
      >
        {/* Sombra del mapa */}
        <defs>
          <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" floodColor="#002B7F" />
          </filter>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#DBEAFE', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#93C5FD', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Provincias */}
        {provincias.map((prov) => {
          const isHovered = hoveredProvincia === prov.nombre;
          const isActive = provinciaActiva === prov.nombre;
          const datos = datosPorProvincia[prov.nombre];

          return (
            <g key={prov.nombre}>
              <path
                d={prov.path}
                fill={getColor(prov.nombre, isHovered, isActive)}
                stroke={getStroke(prov.nombre, isHovered, isActive)}
                strokeWidth={isHovered || isActive ? 3 : 1.5}
                className="cursor-pointer"
                style={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: `${labelPositions[prov.nombre].x}px ${labelPositions[prov.nombre].y}px`,
                  opacity: provinciaActiva && !isActive ? 0.5 : 1,
                }}
                onMouseEnter={() => setHoveredProvincia(prov.nombre)}
                onMouseLeave={() => setHoveredProvincia(null)}
                onClick={() => onProvinciaSelect(prov.nombre)}
              />

              {/* Etiqueta de la provincia */}
              <text
                x={labelPositions[prov.nombre].x}
                y={labelPositions[prov.nombre].y - 6}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  fontSize: isHovered || isActive ? '9px' : '7.5px',
                  fontWeight: 900,
                  fill: isHovered || isActive ? '#FFFFFF' : '#FFFFFF',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.05em',
                }}
              >
                {prov.nombre}
              </text>

              {/* Porcentaje */}
              {datos && (
                <text
                  x={labelPositions[prov.nombre].x}
                  y={labelPositions[prov.nombre].y + 8}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: isHovered || isActive ? '11px' : '9px',
                    fontWeight: 900,
                    fill: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {datos.abstencionismo}%
                </text>
              )}
            </g>
          );
        })}

        {/* Labels del mar */}
        <text x="55" y="40" style={{ fontSize: '6px', fill: '#93C5FD', fontWeight: 700, letterSpacing: '0.15em', fontStyle: 'italic', opacity: 0.6 }}>
          OCÉANO PACÍFICO
        </text>
        <text x="380" y="60" style={{ fontSize: '6px', fill: '#93C5FD', fontWeight: 700, letterSpacing: '0.15em', fontStyle: 'italic', opacity: 0.6 }}>
          MAR CARIBE
        </text>
      </svg>

      {/* Tooltip flotante */}
      {hoveredProvincia && datosPorProvincia[hoveredProvincia] && !provinciaActiva && (
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-2xl border border-slate-100 dark:border-slate-700 max-w-[220px] animate-in fade-in zoom-in-95 duration-200 z-20">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#EF1C24] mb-1">Provincia</div>
          <h4 className="text-lg font-[1000] text-[#002B7F] dark:text-white tracking-tighter">{hoveredProvincia}</h4>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Abstención</span>
              <span className="text-sm font-black text-[#EF1C24]">{datosPorProvincia[hoveredProvincia].abstencionismo}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IDH</span>
              <span className="text-sm font-black text-slate-700 dark:text-slate-200">{datosPorProvincia[hoveredProvincia].idh}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Urbano</span>
              <span className="text-sm font-black text-slate-700 dark:text-slate-200">{datosPorProvincia[hoveredProvincia].urbano}%</span>
            </div>
          </div>
          <div className="mt-3 text-[10px] font-bold text-blue-500 uppercase tracking-wider">Click para más detalles →</div>
        </div>
      )}
    </div>
  );
};

export default CostaRicaMap;
