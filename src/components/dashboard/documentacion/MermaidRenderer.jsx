import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

const MermaidRenderer = ({ chart }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      try {
        if (!chart) return;
        
        // Generar un id unico para cada renderizado para evitar colisiones
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: svgHtml } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvg(svgHtml);
        }
      } catch (error) {
        console.error("Error al renderizar diagrama de Mermaid:", error);
        if (isMounted) {
          setSvg(`<div class="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">Error al cargar el diagrama. Verifica la sintaxis.</div>`);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};

export default MermaidRenderer;
