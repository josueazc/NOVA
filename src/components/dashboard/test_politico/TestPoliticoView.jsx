import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, ChevronRight, AlertCircle, RefreshCw, BarChart2,
  Shield, TrendingUp, Landmark, Users, Leaf, Gavel
} from 'lucide-react';
import { partidosData } from '../../../data/partidosData';

const QUESTIONS = [
  { id: 1, text: "Costa Rica debería aplicar políticas más duras contra el crimen.", category: "Seguridad" },
  { id: 2, text: "Se debería construir una mega cárcel como en El Salvador.", category: "Seguridad" },
  { id: 3, text: "Es válido limitar algunos derechos para mejorar la seguridad.", category: "Seguridad" },
  { id: 4, text: "El Estado debería intervenir más en la economía.", category: "Economía" },
  { id: 5, text: "Se deberían bajar impuestos a empresas.", category: "Economía" },
  { id: 6, text: "Las instituciones públicas deben fortalecerse.", category: "Estado" },
  { id: 7, text: "El matrimonio igualitario debe mantenerse.", category: "Derechos" },
  { id: 8, text: "La educación sexual debe ampliarse.", category: "Derechos" },
  { id: 9, text: "El aborto debería legalizarse en más casos.", category: "Derechos" },
  { id: 10, text: "Se debería reducir el tamaño del Estado.", category: "Estado" },
  { id: 11, text: "Los políticos tradicionales han fallado.", category: "Estado" },
  { id: 12, text: "Se necesitan líderes fuertes más que instituciones.", category: "Estado" },
  { id: 13, text: "Se debe priorizar el ambiente sobre crecimiento económico.", category: "Ambiente" },
  { id: 14, text: "Se debe limitar explotación de recursos naturales.", category: "Ambiente" },
  { id: 15, text: "Se deben endurecer penas por corrupción.", category: "Corrupción" },
  { id: 16, text: "Se necesita reformar el sistema político.", category: "Estado" },
  { id: 17, text: "Costa Rica debería alinearse más con EE.UU.", category: "Economía" },
  { id: 18, text: "Se debe restringir la inmigración.", category: "Seguridad" },
  { id: 19, text: "Se debería cambiar la Constitución.", category: "Estado" },
  { id: 20, text: "La seguridad debe estar sobre libertades.", category: "Seguridad" },
  { id: 21, text: "El gasto público debe reducirse.", category: "Economía" },
  { id: 22, text: "Las empresas privadas son clave.", category: "Economía" },
  { id: 23, text: "El Estado debe garantizar igualdad social.", category: "Derechos" },
  { id: 24, text: "Se deben impulsar políticas progresistas.", category: "Derechos" },
  { id: 25, text: "La democracia necesita cambios urgentes.", category: "Estado" }
];

const OPTIONS = [
  { value: 2, label: "Muy de acuerdo", color: "bg-green-600", hover: "hover:bg-green-700" },
  { value: 1, label: "De acuerdo", color: "bg-green-400", hover: "hover:bg-green-500" },
  { value: 0, label: "Neutral", color: "bg-slate-400", hover: "hover:bg-slate-500" },
  { value: -1, label: "En desacuerdo", color: "bg-red-400", hover: "hover:bg-red-500" },
  { value: -2, label: "Muy en desacuerdo", color: "bg-red-600", hover: "hover:bg-red-700" }
];

// Mapeo manual de IDs del test (basados en el prompt) a las keys del partidosData
// PPSO: ppso, PLN: pln, FA: fa, PUSC: pusc, PLP: plp, PPSD: ppsd, PAC: pac, PNR: pnr, PT: pt (si no existe lo omitimos o mapeamos al más cercano), Agenda: agenda (si no existe lo omitimos)
const PARTIES_WEIGHTS = {
  ppso: { q1: 2, q2: 2, q3: 2, q4: -1, q5: 1, q6: -1, q7: -2, q8: -2, q9: -2, q10: 1, q11: 2, q12: 2, q13: -1, q14: -1, q15: 2, q16: 2, q17: 1, q18: 2, q19: 1, q20: 2, q21: 1, q22: 1, q23: -1, q24: -2, q25: 2 },
  pln: { q1: 1, q2: 0, q3: -1, q4: 1, q5: 0, q6: 2, q7: 1, q8: 1, q9: 0, q10: -1, q11: -2, q12: -2, q13: 1, q14: 1, q15: 1, q16: 0, q17: 1, q18: 0, q19: -1, q20: -1, q21: 0, q22: 1, q23: 1, q24: 1, q25: -1 },
  fa: { q1: -1, q2: -2, q3: -2, q4: 2, q5: -2, q6: 2, q7: 2, q8: 2, q9: 2, q10: -2, q11: 1, q12: -2, q13: 2, q14: 2, q15: 2, q16: 1, q17: -2, q18: -2, q19: 1, q20: -2, q21: -2, q22: -1, q23: 2, q24: 2, q25: 1 },
  pusc: { q1: 1, q2: 0, q3: -1, q4: -1, q5: 1, q6: 1, q7: 0, q8: 0, q9: -1, q10: 1, q11: -1, q12: -1, q13: 0, q14: 0, q15: 1, q16: 0, q17: 1, q18: 1, q19: -1, q20: 0, q21: 1, q22: 2, q23: 0, q24: -1, q25: 0 },
  plp: { q1: 1, q2: 0, q3: -1, q4: -2, q5: 2, q6: -1, q7: 1, q8: 1, q9: 1, q10: 2, q11: 1, q12: -1, q13: -1, q14: -1, q15: 1, q16: 1, q17: 2, q18: 0, q19: 1, q20: -1, q21: 2, q22: 2, q23: -1, q24: 1, q25: 1 },
  ppsd: { q1: 1, q2: 1, q3: 0, q4: 0, q5: 1, q6: 0, q7: 0, q8: 0, q9: 0, q10: 1, q11: 2, q12: 1, q13: 0, q14: -1, q15: 2, q16: 2, q17: 1, q18: 1, q19: 1, q20: 0, q21: 1, q22: 1, q23: 0, q24: 0, q25: 1 },
  pnr: { q1: 2, q2: 1, q3: 1, q4: -1, q5: 1, q6: 0, q7: -2, q8: -2, q9: -2, q10: 1, q11: 1, q12: 1, q13: -1, q14: -1, q15: 2, q16: 1, q17: 2, q18: 1, q19: 1, q20: 1, q21: 1, q22: 1, q23: -1, q24: -2, q25: 1 },
};

const TestPoliticoView = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => setStarted(true);

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestion].id]: value }));
    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Seguridad': return <Shield size={20} className="text-blue-500" />;
      case 'Economía': return <TrendingUp size={20} className="text-green-500" />;
      case 'Estado': return <Landmark size={20} className="text-slate-500" />;
      case 'Derechos': return <Users size={20} className="text-purple-500" />;
      case 'Ambiente': return <Leaf size={20} className="text-emerald-500" />;
      case 'Corrupción': return <Gavel size={20} className="text-red-500" />;
      default: return <AlertCircle size={20} />;
    }
  };

  const results = useMemo(() => {
    if (!showResults) return null;

    const scores = {};
    const maxScores = {};

    Object.keys(PARTIES_WEIGHTS).forEach(partyKey => {
      let score = 0;
      let maxScore = 0;
      
      QUESTIONS.forEach(q => {
        const userAns = answers[q.id] || 0;
        const partyWeight = PARTIES_WEIGHTS[partyKey][`q${q.id}`];
        
        // Si la respuesta del usuario y el partido coinciden en signo, suma puntos.
        // maxScore es si el usuario hubiera respondido exactamente igual al partido
        score += partyWeight * userAns;
        maxScore += Math.abs(partyWeight * 2); // 2 es el max input
      });

      // Evitar divisiones por 0 o negativos raros, normalizamos a porcentaje (0 a 100)
      // Normalización estandar de cosine similarity o interpolacion lineal
      // maximo posible: maxScore. Mínimo posible: -maxScore
      // (score - min) / (max - min) * 100
      let percentage = ((score - (-maxScore)) / (maxScore - (-maxScore))) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      scores[partyKey] = percentage;
    });

    const sortedParties = Object.keys(scores)
      .filter(k => partidosData[k]) // Solo los que existen en la base de datos local
      .map(key => ({
        id: key,
        data: partidosData[key],
        score: scores[key]
      }))
      .sort((a, b) => b.score - a.score);

    return sortedParties;
  }, [answers, showResults]);

  const generateIdeologyProfile = () => {
    let profile = "";
    const sumSecurity = (answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0);
    const sumEconomy = (answers[4] || 0) - (answers[5] || 0) - (answers[22] || 0); // + izq, - der
    const sumRights = (answers[7] || 0) + (answers[8] || 0) + (answers[9] || 0);

    if (sumSecurity > 2) profile += "Priorizas fuertemente el orden y la seguridad sobre algunas libertades. ";
    else if (sumSecurity < -2) profile += "Defiendes firmemente las garantías individuales frente al autoritarismo. ";
    else profile += "Mantienes un equilibrio entre seguridad y derechos civiles. ";

    if (sumEconomy > 2) profile += "Apoyas un Estado fuerte con mayor intervención en la economía. ";
    else if (sumEconomy < -2) profile += "Favoreces el libre mercado y la reducción de la intervención estatal. ";
    else profile += "Prefieres una economía mixta con un rol balanceado del Estado. ";

    if (sumRights > 2) profile += "Tienes una postura progresista en derechos sociales. ";
    else if (sumRights < -2) profile += "Mantienes una visión tradicional sobre los valores sociales. ";
    
    return profile;
  };

  const getExplanation = (winnerId) => {
    if (winnerId === 'ppso') return "Tus respuestas se alinean con políticas de mano dura, un liderazgo centralizado y un rechazo al sistema político tradicional.";
    if (winnerId === 'pln') return "Tus respuestas reflejan una postura de centro, favoreciendo la institucionalidad democrática y una economía mixta balanceada.";
    if (winnerId === 'fa') return "Coincides fuertemente con la defensa de un Estado robusto, derechos sociales amplios y un enfoque progresista.";
    if (winnerId === 'pusc') return "Tu perfil es de centro-derecha, combinando valores institucionales con un enfoque más conservador y pro-empresa.";
    if (winnerId === 'plp') return "Tus valores se acercan al liberalismo: defiendes las libertades individuales, el libre mercado y un Estado más reducido.";
    if (winnerId === 'ppsd') return "Buscas reformas tecnocráticas, mano dura contra la corrupción y cambios al sistema sin desmantelarlo completamente.";
    if (winnerId === 'pnr') return "Te alineas fuertemente con valores tradicionales, políticas de seguridad estrictas y conservadurismo social.";
    return "Tus respuestas muestran una combinación de ideologías.";
  };

  if (!started) {
    return (
      <div className="w-full h-full min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-2xl text-center space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
          <div className="w-24 h-24 bg-gradient-to-br from-[#001D4A] to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <BarChart2 size={40} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-[1000] text-[#001D4A] tracking-tighter uppercase italic mb-4">VotoMetro <span className="text-red-600">CR 2026</span></h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              Descubre qué partido político se alinea realmente con tus ideales y valores para las próximas elecciones en Costa Rica.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto py-6">
            <div className="flex items-center gap-3"><Shield size={20} className="text-blue-500" /> <span className="font-bold text-sm text-slate-600 uppercase">Seguridad</span></div>
            <div className="flex items-center gap-3"><TrendingUp size={20} className="text-green-500" /> <span className="font-bold text-sm text-slate-600 uppercase">Economía</span></div>
            <div className="flex items-center gap-3"><Users size={20} className="text-purple-500" /> <span className="font-bold text-sm text-slate-600 uppercase">Derechos</span></div>
            <div className="flex items-center gap-3"><Landmark size={20} className="text-slate-500" /> <span className="font-bold text-sm text-slate-600 uppercase">Estado</span></div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-[#001D4A] text-white py-5 rounded-full text-lg font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
          >
            Iniciar Test <ChevronRight size={24} />
          </button>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-6">25 Preguntas • 3 Minutos</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const winner = results[0];
    return (
      <div className="w-full max-w-4xl mx-auto p-6 py-12 animate-in slide-in-from-bottom-10 duration-700">
        
        <div className="text-center mb-12">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Resultados del Análisis</h2>
          <h1 className="text-4xl md:text-5xl font-[1000] text-[#001D4A] tracking-tighter uppercase italic">Tu Afinidad <span className="text-red-600">Política</span></h1>
        </div>

        {/* WINNER CARD */}
        <div className="bg-gradient-to-br from-[#001D4A] to-blue-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-40 h-40 flex-shrink-0 bg-white rounded-full flex items-center justify-center border-8 border-white/20 shadow-2xl overflow-hidden">
               {winner.data.bandera}
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-800/50 px-4 py-1.5 rounded-full border border-blue-500/30 mb-4">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-xs font-black uppercase tracking-widest text-blue-100">Partido Más Afín</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[1000] mb-2">{winner.data.nombre}</h2>
              <p className="text-5xl font-black text-green-400 mb-6">{Math.round(winner.score)}%</p>
              
              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-200 mb-2">🧠 Por qué coincides:</h3>
                <p className="text-blue-50 leading-relaxed font-medium">{getExplanation(winner.id)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* PERFIL IDEOLÓGICO */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-100 mb-12">
          <h3 className="text-xl font-black text-[#001D4A] uppercase tracking-tighter italic mb-6 flex items-center gap-3">
            <User size={24} className="text-red-600" /> 📍 Tu Perfil Ideológico
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {generateIdeologyProfile()}
          </p>
        </div>

        {/* RANKING COMPLETO */}
        <h3 className="text-xl font-black text-[#001D4A] uppercase tracking-tighter italic mb-6 ml-2">📊 Ranking Completo</h3>
        <div className="space-y-4">
          {results.map((result, idx) => (
            <div key={result.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-blue-200">
                {result.data.bandera}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="font-bold text-slate-800">{result.data.nombre}</h4>
                  <span className="font-black text-[#001D4A]">{Math.round(result.score)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'bg-green-500' : 'bg-[#001D4A]'}`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              setAnswers({});
              setCurrentQuestion(0);
              setShowResults(false);
              setStarted(false);
            }}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#001D4A] font-black text-sm uppercase tracking-widest transition-colors"
          >
            <RefreshCw size={16} /> Volver a tomar el test
          </button>
        </div>

      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 py-12 animate-in fade-in duration-500">
      {/* HEADER & PROGRESS */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pregunta {currentQuestion + 1} de {QUESTIONS.length}</span>
          <span className="text-xs font-black text-[#001D4A] uppercase tracking-widest">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#001D4A] to-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center relative mb-12 animate-in slide-in-from-right-8 duration-300" key={question.id}>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-50 px-6 py-2 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
          {getCategoryIcon(question.category)}
          <span className="text-xs font-black uppercase tracking-widest text-slate-600">{question.category}</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-[#001D4A] leading-tight mt-6 mb-12">
          "{question.text}"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`py-4 px-2 rounded-2xl text-white font-bold text-sm md:text-xs xl:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 ${opt.color} ${opt.hover}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

// Se requiere agregar import de User (lucide-react)
import { User } from 'lucide-react';

export default TestPoliticoView;
