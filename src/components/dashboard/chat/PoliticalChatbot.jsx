import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Database, ShieldAlert, Sparkles, UploadCloud, FileText, X } from 'lucide-react';

const PoliticalChatbot = () => {
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Soy tu Asistente IA estricto. Solo responderé basándome en la información que introduzcas en mi base de conocimiento. Puedes escribir texto o subir archivos PDF y TXT. I can also speak multiple languages! ¿Qué deseas consultar?", sender: "bot" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    uploadedFiles.forEach(file => {
      if (file.type === 'text/plain') {
        // Los TXT los metemos directamente en el textarea de contexto para que el usuario los vea
        const reader = new FileReader();
        reader.onload = (event) => {
          setContext(prev => {
            const newText = `--- Documento: ${file.name} ---\n${event.target.result}\n\n`;
            return prev ? prev + '\n' + newText : newText;
          });
        };
        reader.readAsText(file);
      } else if (file.type === 'application/pdf') {
        // Los PDF se pasan como inlineData a la API de Gemini
        // Límite práctico para base64 en la web es algunos MBs
        if (file.size > 10 * 1024 * 1024) { // Límite de 10MB
          alert(`El archivo ${file.name} es demasiado grande. Máximo 10MB.`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1];
          setFiles(prev => [...prev, { name: file.name, mimeType: file.type, data: base64Data }]);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Tipo de archivo no soportado: ${file.name}. Solo se aceptan TXT y PDF.`);
      }
    });

    // Limpiar el input para permitir volver a subir el mismo archivo si se desea
    e.target.value = null;
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: "user" }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Falta la API Key de Gemini en el archivo .env");
      }

      // Preparar el historial (sin el mensaje de saludo)
      const history = messages.filter(msg => msg.id !== 1).map(msg => ({
        role: msg.sender === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      // Instrucción de sistema MUY ESTRICTA y MULTILINGÜE
      const systemInstruction = `Eres un asistente de IA muy estricto. 
Tu única fuente de verdad es la "Base de Conocimiento" que se te proporciona a continuación (texto) y en los documentos PDF adjuntos.
REGLAS CRÍTICAS:
1. SI la respuesta a la pregunta del usuario NO está explícitamente en la Base de Conocimiento o en los PDFs adjuntos, DEBES negarte a responder indicando amablemente que no tienes esa información en tus documentos base.
2. NUNCA inventes, deduzcas ni utilices conocimiento externo de internet o de tu entrenamiento previo.
3. IDIOMAS: Debes detectar el idioma en el que el usuario te hace la pregunta y responder EXCLUSIVAMENTE en ese mismo idioma (ej. si pregunta en inglés, responde en inglés; si en francés, en francés).
4. Responde de forma clara, directa y estructurada.

BASE DE CONOCIMIENTO TEXTUAL ACTUAL:
Te voy a dar un **bloque grande de contenido listo para usar como base de conocimiento** para tu chatbot. Está organizado por temas para que lo puedas pegar directo (o dividir en secciones en tu sistema).

---

# 🇨🇷 POLÍTICA DE COSTA RICA — BASE DE CONOCIMIENTO

## 🏛️ Sistema político general

Costa Rica es una república democrática, representativa y participativa. Su sistema político se basa en la separación de poderes:

* Poder Ejecutivo (Presidente y ministros)
* Poder Legislativo (diputados en la Asamblea Legislativa de Costa Rica)
* Poder Judicial (Corte Suprema de Justicia)

Además, existen instituciones autónomas y órganos independientes como el Tribunal Supremo de Elecciones, encargado de garantizar elecciones libres y transparentes.

---

## 🗳️ Elecciones en Costa Rica

Las elecciones se realizan cada 4 años. En ellas se eligen:

* Presidente y vicepresidentes
* Diputados (57 en total)
* Alcaldes y autoridades municipales (en elecciones separadas)

Si ningún candidato presidencial obtiene más del 40% de los votos, se realiza una segunda ronda electoral.

---

## 🏛️ Asamblea Legislativa

La Asamblea Legislativa es el órgano encargado de crear, reformar y derogar leyes.

Funciones principales:

* Aprobar leyes
* Controlar al Poder Ejecutivo
* Aprobar el presupuesto nacional
* Ratificar tratados internacionales

Los diputados se eligen por provincia:

* San José
* Alajuela
* Cartago
* Heredia
* Guanacaste
* Puntarenas
* Limón

---

## 📜 Proceso de formación de leyes

Un proyecto de ley sigue varias etapas:

1. Presentación del proyecto
2. Análisis en comisión
3. Dictamen (positivo o negativo)
4. Discusión en plenario
5. Votación
6. Aprobación o rechazo
7. Firma del presidente (o veto)

---

## 🧠 Partidos políticos en Costa Rica

Los partidos políticos son organizaciones que buscan acceder al poder político mediante elecciones.

Funciones:

* Representar intereses de la población
* Proponer políticas públicas
* Participar en elecciones
* Formar gobierno o ejercer oposición

---

## 🔵 Principales partidos políticos

### 🟢 Partido Liberación Nacional (PLN)

* Tendencia: socialdemócrata
* Uno de los partidos más tradicionales del país
* Ha gobernado múltiples veces
* Enfocado en desarrollo económico con enfoque social

---

### 🔴 Partido Unidad Social Cristiana (PUSC)

* Tendencia: socialcristiana
* Promueve valores conservadores en lo social
* Enfoque en economía mixta

---

### 🟡 Partido Acción Ciudadana (PAC)

* Tendencia: centro / progresista
* Enfocado en transparencia y lucha contra la corrupción
* Gobernó entre 2014 y 2022

---

### 🔵 Partido Progreso Social Democrático (PPSD)

* Partido más reciente
* Tendencia: liberal / reformista
* Enfocado en eficiencia del Estado

---

### 🟣 Frente Amplio (FA)

* Tendencia: izquierda
* Enfocado en justicia social, derechos laborales y equidad

---

### ⚪ Otros partidos

* Nuevas agrupaciones aparecen constantemente
* Muchos partidos son provinciales o cantonales

---

## ⚖️ Ideologías políticas (simplificado)

* **Izquierda**: mayor intervención del Estado, enfoque social
* **Derecha**: menor intervención estatal, enfoque en mercado
* **Centro**: equilibrio entre ambos

---

## 📊 Temas clave en la política costarricense

Los partidos suelen diferenciarse en temas como:

* Educación
* Salud (especialmente la CCSS)
* Seguridad ciudadana
* Economía e impuestos
* Medio ambiente
* Infraestructura
* Corrupción

---

## 🏥 Estado benefactor

Costa Rica tiene un fuerte estado social:

* Educación pública
* Sistema de salud universal (CCSS)
* Programas sociales

Esto viene del modelo de estado benefactor desarrollado en el siglo XX.

---

## 💰 Financiamiento de partidos

Los partidos políticos se financian mediante:

* Deuda política (financiamiento estatal)
* Donaciones privadas
* Actividades propias

Esto es regulado para evitar corrupción.

---

## 🧾 Transparencia y control

Instituciones clave:

* Contraloría General de la República
* Defensoría de los Habitantes

Estas supervisan el uso de recursos públicos y los derechos ciudadanos.

---

## ⚠️ Problemas actuales del sistema político

* Desconfianza en partidos tradicionales
* Fragmentación política (muchos partidos)
* Dificultad para aprobar leyes
* Casos de corrupción
* Abstencionismo electoral

---

## 🤝 Asamblea Legislativa: dinámica real

En la práctica:

* Ningún partido suele tener mayoría absoluta
* Se necesitan alianzas para aprobar leyes
* Existen bloqueos políticos frecuentes
* La negociación es clave

---

## 📈 Cultura política

* Alta tradición democrática
* Participación ciudadana variable
* Educación cívica importante

---

## 🧩 Conceptos clave para chatbot

Podés usar estos conceptos como triggers:

* “proyecto de ley”
* “diputados”
* “plenario”
* “comisión legislativa”
* “ideología política”
* “corrupción”
* “estado benefactor”

---

## 🔥 Ideas para respuestas inteligentes del chatbot

El bot podría:

* Explicar partidos según ideología del usuario
* Recomendar partido basado en respuestas
* Mostrar proyectos de ley relevantes
* Explicar términos políticos simples
* Comparar partidos

---

## 🧠 Resumen clave

La política en Costa Rica se basa en:

👉 democracia + partidos + leyes + negociación

El poder real no está solo en ganar elecciones, sino en **lograr acuerdos y aprobar leyes dentro de la Asamblea Legislativa**.

---

Si querés, en el siguiente paso te puedo:

* convertir todo esto en formato JSON para tu chatbot
* o hacerte respuestas automáticas tipo FAQ
* o integrarlo directo con tu sistema web 🔥

"""
${context || 'No hay información en la base de conocimiento de texto.'}
"""`;

      // Los archivos se envían en la petición del usuario para que Gemini los lea como contexto adicional
      const userParts = [
        ...files.map(f => ({ inlineData: { mimeType: f.mimeType, data: f.data } })),
        { text: userMsg }
      ];

      const requestBody = {
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          ...history,
          { role: 'user', parts: userParts }
        ],
        generationConfig: {
          temperature: 0.1, // Temperatura baja para evitar alucinaciones
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Error en la API de Gemini');
      }

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, no pude procesar tu solicitud.';

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Error: ${error.message}. Por favor, asegúrate de tener configurado tu VITE_GEMINI_API_KEY.`,
        sender: "bot"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 dark:bg-slate-900 w-full animate-in fade-in duration-500 pb-10 transition-colors">

      {/* Header del Tab */}
      <div className="bg-[#001D4A] dark:bg-slate-950 text-white py-12 px-6 lg:px-24 w-full rounded-b-[3rem] shadow-xl relative overflow-hidden shrink-0 transition-colors">
        <div className="absolute top-0 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="max-w-[1600px] mx-auto flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-2xl">
              <Sparkles size={28} className="text-blue-300" />
            </div>
            <h1 className="text-4xl font-[1000] tracking-tighter">Asistente IA Estricto</h1>
          </div>
          <p className="text-blue-200 max-w-2xl font-medium text-sm leading-relaxed">
            Este entorno seguro te permite alimentar a Gemini exclusivamente con tu propia información.
            Sube documentos (PDF/TXT) o pega texto. La IA te responderá en el idioma que le hables, <strong>basándose únicamente</strong> en lo que subiste.
          </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-8 max-w-[1600px] w-full mx-auto px-6 lg:px-24 mt-8 h-[700px]">

        {/* COLUMNA IZQUIERDA: BASE DE CONOCIMIENTO */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0 transition-colors">
          <div className="bg-slate-100 dark:bg-slate-700 p-6 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#001D4A] dark:bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md transition-colors">
                <Database size={18} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 dark:text-white tracking-tight transition-colors">Base de Conocimiento</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest transition-colors">Alimenta a la IA</p>
              </div>
            </div>

            {/* Botón de subida de archivos */}
            <input
              type="file"
              multiple
              accept=".txt,.pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#EF1C24] hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <UploadCloud size={16} /> Subir
            </button>
          </div>

          <div className="p-6 flex-grow flex flex-col gap-4">
            <div className="flex gap-3 items-start bg-amber-50 dark:bg-amber-900/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-medium leading-relaxed transition-colors">
              <ShieldAlert size={20} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <p>Pega texto o sube PDFs/TXTs. La IA <strong>rechazará</strong> responder preguntas si la respuesta no está en estos documentos.</p>
            </div>

            {/* Lista de archivos PDF cargados */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors">
                    <FileText size={14} className="text-blue-500 dark:text-blue-400" />
                    <span className="truncate max-w-[120px]">{f.name}</span>
                    <button onClick={() => removeFile(i)} className="text-blue-400 hover:text-red-500 transition-colors ml-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ejemplo: El Partido X propone reducir el impuesto a la renta en un 5%... (O sube un archivo TXT y el texto aparecerá aquí automáticamente)"
              className="flex-grow w-full bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-100 dark:border-slate-600 rounded-2xl p-5 text-sm outline-none focus:border-[#001D4A] dark:focus:border-blue-500 transition-colors resize-none font-medium text-slate-700 dark:text-slate-200"
            ></textarea>
          </div>
        </div>

        {/* COLUMNA DERECHA: CHAT */}
        <div className="w-full lg:w-2/3 flex flex-col bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="bg-slate-100 dark:bg-slate-700 p-6 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-sm transition-colors">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 dark:text-white tracking-tight transition-colors">Chat Interactivo</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest transition-colors">Soporta: Español, Inglés, etc.</p>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-[#001D4A] dark:bg-slate-700 text-white transition-colors'}`}>
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`px-5 py-4 rounded-[1.5rem] max-w-[80%] text-sm leading-relaxed shadow-sm transition-colors ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 rounded-tl-sm'
                  }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#001D4A] dark:bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md transition-colors">
                  <Bot size={18} />
                </div>
                <div className="px-5 py-4 rounded-[1.5rem] bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-tl-sm flex items-center gap-3 shadow-sm transition-colors">
                  <Loader2 size={18} className="text-[#001D4A] dark:text-blue-400 animate-spin transition-colors" />
                  <span className="text-xs text-slate-500 dark:text-slate-300 font-bold tracking-wider uppercase transition-colors">Analizando documentos...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 transition-colors">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta en cualquier idioma sobre tus documentos..."
                className="w-full bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-2xl pl-6 pr-16 py-4 text-sm outline-none focus:border-[#001D4A] dark:focus:border-blue-500 transition-all font-medium text-slate-700 dark:text-slate-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3 w-12 h-12 bg-[#001D4A] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 disabled:opacity-50 text-white rounded-[1rem] flex items-center justify-center transition-all shadow-lg active:scale-95"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PoliticalChatbot;
