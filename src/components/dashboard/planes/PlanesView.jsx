import React, { useState, useEffect, useRef } from 'react';
import { 
  Loader2, Dribbble, HeartPulse, GraduationCap, BarChart3, 
  ShieldAlert, Leaf, HardHat, Cpu, CheckCircle2, AlertCircle,
  BrainCircuit, FileUp, Target, Zap, ChevronDown, XCircle, 
  FileText, Search, ShieldCheck
} from 'lucide-react';
import { partidosData } from '../../../data/partidosData';

const PDF_JS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
const PDF_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const PARTIDOS_CR = Object.values(partidosData).map(p => ({
  id: p.id,
  name: p.nombre,
  short: p.siglas,
  color: p.color,
  light: `${p.color}15`
}));

const PlanesView = () => {
  const [planText, setPlanText] = useState("");
  const [selectedParty, setSelectedParty] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPdfLib, setLoadingPdfLib] = useState(false);
  
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);
  const dropdownRef = useRef(null);
  const apiKey = ""; 

  useEffect(() => {
    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = PDF_JS_URL;
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
      };
      document.head.appendChild(script);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const areasTematicas = [
    { id: 'economia', label: 'Economía', icon: <BarChart3 /> },
    { id: 'salud', label: 'Salud', icon: <HeartPulse /> },
    { id: 'educacion', label: 'Educación', icon: <GraduationCap /> },
    { id: 'seguridad', label: 'Seguridad', icon: <ShieldAlert /> },
    { id: 'ambiente', label: 'Ambiente', icon: <Leaf /> },
    { id: 'deportes', label: 'Deportes', icon: <Dribbble /> },
    { id: 'infraestructura', label: 'Infraestructura', icon: <HardHat /> },
    { id: 'tecnologia', label: 'Tecnología', icon: <Cpu /> }
  ];

  const extractTextFromPdf = async (file) => {
    setLoadingPdfLib(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      const numPages = Math.min(pdf.numPages, 40);
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + "\n";
      }
      return fullText;
    } catch (err) {
      throw new Error("No se pudo leer el PDF.");
    } finally {
      setLoadingPdfLib(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setError(null);
    try {
      if (file.type === "application/pdf") {
        if (!window.pdfjsLib) throw new Error("Cargando librerías PDF, intenta de nuevo en un segundo.");
        const text = await extractTextFromPdf(file);
        setPlanText(text);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => setPlanText(e.target.result);
        reader.readAsText(file);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnalyze = async () => {
    if (!planText.trim()) {
      setError("Carga un archivo primero.");
      return;
    }
    if (!selectedParty) {
      setError("Selecciona un partido político.");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSelectedArea(null);
    
    const systemPrompt = `SOS UN ANALISTA ELECTORAL DE COSTA RICA. 
    Analiza el texto del plan de gobierno de ${selectedParty.name}.
    - SOLO usa el texto provisto.
    - Si no hay propuestas en un área, devuelve [].
    - Extrae máximo 5 propuestas por área.
    - DEVUELVE SOLO JSON: {"economia":[], "salud":[], "educacion":[], "seguridad":[], "ambiente":[], "deportes":[], "infraestructura":[], "tecnologia":[]}.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `TEXTO DEL PLAN:\n\n${planText.substring(0, 35000)}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      
      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      setAnalysisResult(result);
      const firstWithContent = Object.keys(result).find(key => result[key].length > 0);
      setSelectedArea(firstWithContent || 'economia');
    } catch (err) {
      setError("Error en el análisis de IA.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const accentColor = selectedParty ? selectedParty.color : '#002B7F';
  const lightAccent = selectedParty ? selectedParty.light : '#f1f5f9';

  return (
    <div className="w-full pb-20 animate-in fade-in zoom-in-95 duration-500 mt-10">
      <main className="container mx-auto px-6 max-w-6xl">
        
        {/* Card de Configuración */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 md:p-12 mb-12 relative overflow-visible transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-4xl font-black tracking-tighter leading-tight">
                  Analizá el <span style={{ color: accentColor }}>Plan de Gobierno</span>
                </h2>
                {selectedParty && (
                  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full shadow-sm border border-slate-100 animate-in fade-in zoom-in">
                     <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: accentColor }}>
                       {selectedParty.short[0]}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{selectedParty.name}</span>
                  </div>
                )}
              </div>
              
              {/* Selector tipo Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Selecciona el Partido</label>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 flex items-center justify-between transition-all ${isDropdownOpen ? 'border-slate-300 ring-4 ring-slate-100' : 'border-slate-100'}`}
                >
                  {selectedParty ? (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black" style={{ backgroundColor: selectedParty.color }}>
                        {selectedParty.short}
                      </div>
                      <span className="font-bold text-slate-700">{selectedParty.name}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 font-bold text-sm italic">Elige un partido político...</span>
                  )}
                  <ChevronDown className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                </button>

                {/* Lista Desplegable */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[300px] overflow-y-auto p-2">
                      {PARTIDOS_CR.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedParty(p);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm" style={{ backgroundColor: p.color }}>
                            {p.short}
                          </div>
                          <div className="text-left">
                            <p className="font-black text-slate-700 leading-none mb-1">{p.short}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div 
                onClick={() => fileInputRef.current.click()}
                className={`border-4 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${fileName ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.txt" className="hidden" />
                {loadingPdfLib ? (
                  <div className="flex flex-col items-center gap-2 text-blue-500 py-4">
                    <Loader2 className="animate-spin" size={32} />
                    <span className="text-[10px] font-black uppercase">Leyendo PDF...</span>
                  </div>
                ) : fileName ? (
                  <div className="flex items-center justify-center gap-3 py-4">
                    <FileText className="text-green-500" />
                    <span className="font-bold text-slate-700 truncate max-w-[200px]">{fileName}</span>
                  </div>
                ) : (
                  <div className="text-slate-400 flex flex-col items-center gap-2 py-4">
                    <FileUp size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Subir archivo del Plan</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-center h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 flex-shrink-0" style={{ backgroundColor: accentColor }}>
                   <Zap />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600 leading-tight">Procesaremos el texto del documento para encontrar propuestas reales.</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Basado en Inteligencia Artificial</p>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-xs font-bold">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !planText || !selectedParty}
                className="w-full text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 shadow-xl"
                style={{ backgroundColor: accentColor }}
              >
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                {isAnalyzing ? "Escrutinio..." : "Analizar Fielmente"}
              </button>
            </div>
          </div>
        </div>

        {/* Grid de Categorías */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areasTematicas.map((area) => (
              <button
                key={area.id}
                onClick={() => {
                  if (analysisResult) {
                    setSelectedArea(area.id);
                    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
                  }
                }}
                disabled={!analysisResult}
                className={`aspect-square rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all border-2 ${
                  !analysisResult ? 'opacity-30 cursor-not-allowed bg-white border-slate-100' :
                  selectedArea === area.id 
                    ? 'text-white border-transparent shadow-2xl scale-105 z-10' 
                    : 'bg-white text-slate-400 border-white hover:border-slate-100'
                }`}
                style={{ backgroundColor: selectedArea === area.id ? accentColor : 'white' }}
              >
                <div className={`p-4 rounded-2xl ${selectedArea === area.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                  {React.cloneElement(area.icon, { size: 32 })}
                </div>
                <div className="text-center">
                  <span className="font-black text-[10px] uppercase tracking-widest block">{area.label}</span>
                  {analysisResult && (
                    <span className={`text-[9px] font-bold ${selectedArea === area.id ? 'text-white/60' : 'text-slate-300'}`}>
                      {analysisResult[area.id]?.length || 0} propuestas
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Panel de Resultados */}
        <div ref={resultsRef} className="min-h-[200px]">
          {analysisResult && selectedArea ? (
            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10">
              <div className="p-8 md:p-12 border-b border-slate-50 flex items-center justify-between" style={{ backgroundColor: lightAccent }}>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] text-white flex items-center justify-center shadow-lg" style={{ backgroundColor: accentColor }}>
                    {React.cloneElement(areasTematicas.find(a => a.id === selectedArea).icon, { size: 32 })}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase">{areasTematicas.find(a => a.id === selectedArea).label}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Datos verificados del plan oficial</p>
                  </div>
                </div>
                <Target className="text-slate-200" size={40} />
              </div>

              <div className="p-8 md:p-12 space-y-4">
                {analysisResult[selectedArea]?.length > 0 ? (
                  analysisResult[selectedArea].map((prop, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-slate-50 hover:bg-white border-2 border-transparent hover:border-slate-100 transition-all group">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs text-white shadow-md" style={{ backgroundColor: accentColor }}>
                        {i + 1}
                      </div>
                      <p className="font-bold text-slate-700 text-lg leading-relaxed">{prop}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <XCircle size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No se hallaron propuestas sobre este tema en el PDF.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
             <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[3rem] py-24 flex flex-col items-center justify-center text-slate-300">
               <Search size={48} className="mb-4 opacity-20" />
               <p className="font-black uppercase tracking-[0.4em] text-xs text-center">Selecciona un partido y sube su PDF para ver los resultados</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlanesView;
