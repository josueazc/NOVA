import React from 'react';
import { Database, Server } from 'lucide-react';

const TableDefinition = ({ tableName, description, columns }) => (
  <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 mb-8 cursor-default">
    <div className="mb-6">
      <h3 className="text-2xl font-black text-[#002B7F] dark:text-blue-400 mb-2 transition-colors inline-flex items-center gap-2">
        <Server size={20} /> {tableName}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors">{description}</p>
    </div>
    
    <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest text-[10px]">
          <tr>
            <th className="px-6 py-4">Columna</th>
            <th className="px-6 py-4">Tipo de Dato</th>
            <th className="px-6 py-4">Restricción</th>
            <th className="px-6 py-4">Descripción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300 font-medium">
          {columns.map((col, idx) => (
            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{col.name}</td>
              <td className="px-6 py-4"><span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">{col.type}</span></td>
              <td className="px-6 py-4 text-xs">{col.constraint || '-'}</td>
              <td className="px-6 py-4">{col.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DatabaseTables = () => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg transition-colors"><Database size={24} /></div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Diccionario de Datos</h2>
      </div>

      <div className="space-y-8">
        <TableDefinition 
          tableName="profiles" 
          description="Extiende la tabla de autenticación nativa (auth.users). Almacena la información pública y política de cada ciudadano registrado en NOVA."
          columns={[
            { name: "id", type: "uuid", constraint: "Primary Key, FK a auth.users", desc: "Identificador único del usuario, gestionado por Supabase Auth." },
            { name: "full_name", type: "text", constraint: "Not Null", desc: "Nombre completo ingresado durante el registro." },
            { name: "provincia", type: "text", constraint: "Opcional", desc: "Lugar de residencia para filtrar noticias y diputados." },
            { name: "cedula", type: "text", constraint: "Único, Opcional", desc: "Cédula de identidad (para futura verificación de políticos)." },
            { name: "bio", type: "text", constraint: "Opcional", desc: "Pequeña biografía o descripción del usuario." },
            { name: "party", type: "text", constraint: "Opcional", desc: "Partido político al que simpatiza o está afiliado." },
            { name: "is_politician", type: "boolean", constraint: "Default: false", desc: "Bandera que indica si el usuario es una figura pública." },
            { name: "cargo", type: "text", constraint: "Opcional", desc: "Cargo público actual (si is_politician es true)." },
            { name: "badges", type: "text[]", constraint: "Array", desc: "Insignias y medallas obtenidas (Gamificación)." },
            { name: "points", type: "integer", constraint: "Default: 0", desc: "Puntos de reputación cívica." },
            { name: "level", type: "integer", constraint: "Default: 1", desc: "Nivel de usuario en el sistema de comunidad." },
            { name: "followers_count", type: "integer", constraint: "Default: 0", desc: "Cantidad de usuarios que lo siguen." },
            { name: "following_count", type: "integer", constraint: "Default: 0", desc: "Cantidad de usuarios que sigue." }
          ]}
        />

        <TableDefinition 
          tableName="posts" 
          description="Tabla principal del módulo 'Comunidad'. Almacena las publicaciones realizadas por los usuarios en el feed público."
          columns={[
            { name: "id", type: "uuid", constraint: "Primary Key, Auto", desc: "Identificador único de la publicación." },
            { name: "author_id", type: "uuid", constraint: "FK a profiles(id)", desc: "Referencia al usuario que creó la publicación." },
            { name: "text", type: "text", constraint: "Not Null", desc: "Contenido escrito de la publicación (tweet)." },
            { name: "media", type: "text", constraint: "Opcional", desc: "URL de la imagen almacenada en Supabase Storage Bucket." },
            { name: "likes", type: "integer", constraint: "Default: 0", desc: "Contador de me gustas." },
            { name: "created_at", type: "timestamp", constraint: "Default: now()", desc: "Fecha y hora exacta de la publicación." }
          ]}
        />

        <TableDefinition 
          tableName="followers" 
          description="Tabla de relación para el sistema de seguidores y seguidos."
          columns={[
            { name: "follower_id", type: "uuid", constraint: "PK, FK a profiles", desc: "Usuario que sigue a otra cuenta." },
            { name: "following_id", type: "uuid", constraint: "PK, FK a profiles", desc: "Usuario que está siendo seguido." },
            { name: "created_at", type: "timestamp", constraint: "Default: now()", desc: "Fecha de inicio del seguimiento." }
          ]}
        />

        <TableDefinition 
          tableName="comments" 
          description="Tabla para almacenar las respuestas (comentarios) anidadas dentro de las publicaciones (posts)."
          columns={[
            { name: "id", type: "uuid", constraint: "Primary Key, Auto", desc: "Identificador único del comentario." },
            { name: "post_id", type: "uuid", constraint: "FK a posts(id)", desc: "La publicación principal a la que pertenece este comentario." },
            { name: "author_id", type: "uuid", constraint: "FK a profiles(id)", desc: "El autor del comentario." },
            { name: "text", type: "text", constraint: "Not Null", desc: "El cuerpo del comentario." },
            { name: "created_at", type: "timestamp", constraint: "Default: now()", desc: "Fecha de creación del comentario." }
          ]}
        />
      </div>
    </section>
  );
};

export default DatabaseTables;
