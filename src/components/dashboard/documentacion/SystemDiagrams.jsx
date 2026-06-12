import React from 'react';
import { FolderGit2 } from 'lucide-react';
import MermaidRenderer from './MermaidRenderer';

const SystemDiagrams = () => {
 const erDiagram = `
erDiagram
  AUTH_USERS {
    uuid id PK "Identificador único"
    string email "Correo del usuario"
  }
  PROFILES {
    uuid id PK "FK a auth.users"
    string full_name "Nombre completo"
    string provincia "Lugar de residencia"
    string party "Afiliación (opcional)"
    boolean is_politician "Rol"
    string cargo "Cargo público"
  }
  POSTS {
    uuid id PK "ID del post"
    uuid author_id FK "Creador del post"
    text text "Contenido escrito"
    string media "URL de imagen"
    int likes "Conteo de likes"
  }
  COMMENTS {
    uuid id PK "ID del comentario"
    uuid post_id FK "Post padre"
    uuid author_id FK "Creador"
    text text "Respuesta"
  }

  AUTH_USERS ||--|| PROFILES : "1 a 1 (Trigger)"
  PROFILES ||--o{ POSTS : "1 a N (Publica)"
  PROFILES ||--o{ COMMENTS : "1 a N (Responde)"
  POSTS ||--o{ COMMENTS : "1 a N (Contiene)"
 `;

 const flowDiagram = `
flowchart TD
  classDef start fill:#1e293b,stroke:#000,color:#fff,rx:20px,font-weight:bold
  classDef auth fill:#3b82f6,stroke:#1d4ed8,color:#fff,rx:10px
  classDef module fill:#ef4444,stroke:#991b1b,color:#fff,rx:10px
  classDef sub fill:#f8fafc,stroke:#cbd5e1,color:#0f172a,rx:5px

  A([Entrada a NOVA]):::start --> B{¿Autenticado?}
  B -- No --> C[Página de Registro / Login]:::auth
  C --> D[Creación de Perfil en BD]:::sub
  B -- Sí --> E[Dashboard Principal]:::start
  D --> E

  E --> M1(Test Político):::module
  E --> M2(Planes de Gobierno):::module
  E --> M3(La Asamblea):::module
  E --> M4(Comunidad):::module
  E --> M5(Asistente IA):::module

  M4 --> C1[Ver Feed Global]:::sub
  C1 --> C2{Interacción}
  C2 -->|Crear Post| C3[Se guarda en BD]:::sub
  C2 -->|Subir Foto| C4[Va a Storage]:::sub
  C2 -->|Comentar| C5[Comentario Anidado]:::sub
 `;

 const archDiagram = `
flowchart LR
  classDef react fill:#00d8ff,stroke:#000,color:#000,font-weight:bold,rx:10px
  classDef supabase fill:#3ecf8e,stroke:#000,color:#000,font-weight:bold,rx:10px
  classDef gemini fill:#8b5cf6,stroke:#000,color:#fff,font-weight:bold,rx:10px
  classDef user fill:#cbd5e1,stroke:#334155,color:#000,rx:30px
  classDef ext fill:#f1f5f9,stroke:#94a3b8,stroke-dasharray: 5 5

  U((Usuario)):::user

  subgraph CLIENTE [Frontend Web]
    R[React.js / Vite]:::react
    PDF[PDF.js]:::ext
  end

  subgraph BACKEND [Supabase BaaS]
    AUTH[Auth]:::supabase
    DB[(PostgreSQL)]:::supabase
    ST[Storage]:::supabase
  end

  subgraph IA [Google]
    G[Gemini API]:::gemini
  end

  U -->|Navega| R
  R -->|Extrae texto local| PDF
  
  R <-->|JWT Tokens| AUTH
  R <-->|Consultas SQL vía API| DB
  R <-->|Imágenes| ST

  R <-->|Prompt + Documento| G
 `;

 return (
  <section>
   <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center shadow-lg transition-colors"><FolderGit2 size={24} /></div>
    <h2 className="text-4xl font-black text-ink tracking-tighter transition-colors">Diagramas del Sistema</h2>
   </div>

   <div className="space-y-12">
    
    {/* Diagrama Arquitectónico */}
    <div className="bg-surface rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-line cursor-default">
     <h3 className="text-2xl font-black text-accent mb-2 transition-colors">1. Arquitectura de Integración</h3>
     <p className="text-muted mb-8 font-medium transition-colors">Cómo interactúa el Frontend (React) con los servicios BaaS (Supabase) y la Inteligencia Artificial (Google Gemini).</p>
     <div className="bg-surface-2/50 p-6 rounded-2xl border border-line overflow-hidden transition-colors">
      <MermaidRenderer chart={archDiagram} />
     </div>
    </div>

    {/* Diagrama de Flujo */}
    <div className="bg-surface rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-line cursor-default">
     <h3 className="text-2xl font-black text-accent mb-2 transition-colors">2. Flujo de Usuario (User Journey)</h3>
     <p className="text-muted mb-8 font-medium transition-colors">La ruta de navegación desde la autenticación hasta los módulos interactivos clave.</p>
     <div className="bg-surface-2/50 p-6 rounded-2xl border border-line overflow-hidden transition-colors">
      <MermaidRenderer chart={flowDiagram} />
     </div>
    </div>

    {/* Diagrama Entidad Relacion */}
    <div className="bg-surface rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-line cursor-default">
     <h3 className="text-2xl font-black text-accent mb-2 transition-colors">3. Diagrama Entidad-Relación (ERD)</h3>
     <p className="text-muted mb-8 font-medium transition-colors">Esquema relacional implementado en Supabase PostgreSQL.</p>
     <div className="bg-surface-2/50 p-6 rounded-2xl border border-line overflow-hidden transition-colors">
      <MermaidRenderer chart={erDiagram} />
     </div>
    </div>

   </div>
  </section>
 );
};

export default SystemDiagrams;
