import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Send, X } from 'lucide-react';
import { Avatar, Button, useToast } from '@/components/ui';
import { uploadMedia } from '@/services/community';

const TOPICS = ['Ambiente', 'Seguridad', 'Economía', 'Educación', 'Salud', 'Nacional', 'Política'];
const MAX_CHARS = 2000;

const Composer = ({ user, userName, onPublish }) => {
  const toast = useToast();
  const fileRef = useRef(null);
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [media, setMedia] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = null;
    if (!file) return;
    if (!user?.id) {
      toast.error('Debes iniciar sesión para subir imágenes.');
      return;
    }
    setUploading(true);
    try {
      setMedia(await uploadMedia({ userId: user.id, file }));
    } catch (err) {
      toast.error(`Error al subir imagen: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || publishing) return;
    setPublishing(true);
    const ok = await onPublish({ text, media: media || null, topic: topic || null });
    setPublishing(false);
    if (ok) {
      setText('');
      setTopic('');
      setMedia('');
    }
  };

  const remaining = MAX_CHARS - text.length;

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-xl p-5 space-y-4 shadow-card">
      <div className="flex gap-3">
        <Avatar name={userName} size="md" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          placeholder="¿Cuál es tu opinión sobre el acontecer nacional? Usa #hashtags para sumar al debate."
          rows={3}
          className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-faint outline-none resize-none leading-relaxed pt-1.5"
        />
      </div>

      {media && (
        <div className="relative rounded-lg overflow-hidden border border-line ml-[52px]">
          <img src={media} alt="Adjunto" className="w-full max-h-64 object-cover" />
          <button
            type="button"
            onClick={() => setMedia('')}
            aria-label="Quitar imagen"
            className="absolute top-2 right-2 bg-surface/90 backdrop-blur p-1.5 rounded-md text-muted hover:text-danger transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pl-[52px] flex-wrap">
        <div className="flex items-center gap-2">
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" ref={fileRef} onChange={handleFile} className="hidden" />
          <Button type="button" variant="ghost" size="sm" loading={uploading} onClick={() => fileRef.current?.click()}>
            <ImageIcon size={14} />
            Imagen
          </Button>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Tema de la publicación"
            className="bg-surface-2 text-muted text-xs font-medium rounded-md px-2.5 py-1.5 border border-line outline-none cursor-pointer hover:text-ink transition-colors"
          >
            <option value="">Tema (opcional)</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          {text.length > 0 && (
            <span className={`font-mono text-[10px] ${remaining < 100 ? 'text-warn' : 'text-faint'}`}>
              {remaining}
            </span>
          )}
          <Button type="submit" size="sm" disabled={!text.trim()} loading={publishing}>
            Publicar
            <Send size={13} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Composer;
