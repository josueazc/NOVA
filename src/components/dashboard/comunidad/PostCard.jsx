import React, { useState } from 'react';
import {
  Heart, MessageSquare, Repeat, Bookmark, Trash2, Flag,
  BadgeCheck, UserPlus, UserCheck, ChevronUp, ChevronDown, Hash, EyeOff, SearchCheck,
} from 'lucide-react';
import { Avatar, Badge, Button, Modal, Select, Spinner, Textarea, useToast } from '@/components/ui';
import { partidosData } from '@/data/partidosData';
import { timeAgo } from '@/utils/text';
import { fetchComments, addComment, deleteComment } from '@/services/community';
import { factCheck, hasAIConfig } from '@/services/ai';
import { MOCK_BOTS_COMMENTS } from './mockData';

const isMock = (id) => String(id).startsWith('mock_') || String(id).includes('_mock');

const VERDICTS = {
  true: { label: 'Verdadero', tone: 'green' },
  mostly_true: { label: 'Mayormente cierto', tone: 'green' },
  mixed: { label: 'Mixto', tone: 'yellow' },
  mostly_false: { label: 'Mayormente falso', tone: 'red' },
  false: { label: 'Falso', tone: 'red' },
  unverifiable: { label: 'No verificable', tone: 'neutral' },
};

const REPORT_REASONS = [
  ['toxicity', 'Toxicidad o ataques'],
  ['spam', 'Spam'],
  ['misinformation', 'Desinformación'],
  ['harassment', 'Acoso'],
  ['sensitive', 'Contenido sensible'],
  ['other', 'Otro'],
];

const PartyPin = ({ partyId }) => {
  const data = partyId ? partidosData[partyId] : null;
  if (!data) return null;
  return (
    <span className="w-4.5 h-4.5 w-[18px] h-[18px] rounded-full overflow-hidden border border-line inline-block shrink-0" title={data.nombre}>
      {data.bandera}
    </span>
  );
};

/** Texto con #hashtags resaltados y clicables. */
const RichText = ({ text, onHashtag }) => {
  const parts = text.split(/(#[\p{L}\p{N}_]{2,30})/gu);
  return (
    <p className="text-[15px] text-ink leading-relaxed whitespace-pre-wrap break-words">
      {parts.map((part, i) =>
        part.startsWith('#') ? (
          <button
            key={i}
            onClick={() => onHashtag?.(part.slice(1).toLowerCase())}
            className="text-accent hover:underline font-medium"
          >
            {part}
          </button>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </p>
  );
};

const ActionButton = ({ active, activeClass = '', icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-all active:scale-95
      ${active ? activeClass : 'text-muted hover:text-ink hover:bg-surface-2'}`}
  >
    {icon}
    {label != null && <span className="font-mono text-[11px]">{label}</span>}
  </button>
);

const PostCard = ({
  post, currentUserId, userName, reaction, isSaved, isFollowing, isOwn,
  onReact, onRepost, onSave, onFollow, onDelete, onReport, onOpenProfile, onHashtag,
}) => {
  const toast = useToast();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('toxicity');
  const [reportDetails, setReportDetails] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [factOpen, setFactOpen] = useState(false);
  const [factLoading, setFactLoading] = useState(false);
  const [factResult, setFactResult] = useState(null);

  const runFactCheck = async () => {
    setFactOpen(true);
    if (factResult || factLoading) return;
    setFactLoading(true);
    try {
      setFactResult(await factCheck(post.text));
    } catch (err) {
      toast.error(`Verificación no disponible: ${err.message}`);
      setFactOpen(false);
    } finally {
      setFactLoading(false);
    }
  };

  const loadComments = async () => {
    if (isMock(post.id)) {
      setComments(MOCK_BOTS_COMMENTS[post.id] || []);
      return;
    }
    try {
      setComments(await fetchComments(post.id));
    } catch (err) {
      toast.error(`No se pudieron cargar los comentarios: ${err.message}`);
      setComments([]);
    }
  };

  const toggleComments = () => {
    const next = !showComments;
    setShowComments(next);
    if (next && comments === null) loadComments();
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!currentUserId) {
      toast.error('Debes iniciar sesión para comentar.');
      return;
    }
    if (isMock(post.id)) {
      setComments((prev) => [
        ...(prev || []),
        { id: `local_${Date.now()}`, text: commentText, authorId: currentUserId, authorName: userName || 'Tú', createdAt: new Date() },
      ]);
      setCommentText('');
      return;
    }
    try {
      await addComment({ postId: post.id, userId: currentUserId, text: commentText });
      setCommentText('');
      loadComments();
    } catch (err) {
      toast.error(`Error al comentar: ${err.message}`);
    }
  };

  const removeComment = async (commentId) => {
    if (String(commentId).startsWith('local_')) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      return;
    }
    try {
      await deleteComment(commentId);
      loadComments();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const submitReport = async () => {
    const ok = await onReport({ postId: post.id, reason: reportReason, details: reportDetails });
    if (ok) {
      setReportOpen(false);
      setReportDetails('');
    }
  };

  // Post oculto por moderación comunitaria
  if (post.isHidden && !revealed) {
    return (
      <article className="bg-surface-2 border border-line rounded-xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-muted">
          <EyeOff size={16} />
          <p className="text-sm">Publicación oculta por reportes de la comunidad.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setRevealed(true)}>Ver de todos modos</Button>
      </article>
    );
  }

  return (
    <article className="bg-surface border border-line rounded-xl shadow-card hover:shadow-lift transition-shadow">
      <div className="p-5 space-y-3.5">
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => onOpenProfile(post.authorId)} aria-label={`Perfil de ${post.authorName}`}>
              <Avatar src={post.avatarUrl} name={post.authorName} size="md" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => onOpenProfile(post.authorId)}
                  className="font-semibold text-[15px] text-ink hover:text-accent transition-colors truncate"
                >
                  {post.authorName}
                </button>
                {post.isVerified && <BadgeCheck size={15} className="text-accent shrink-0" aria-label="Perfil verificado" />}
                <PartyPin partyId={post.party} />
                {post.badges?.map((b) => (
                  <Badge key={b} tone="neutral">{b}</Badge>
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint mt-0.5">
                {post.isBot ? 'Cuenta automatizada' : post.isPolitician ? post.cargo || 'Político' : 'Ciudadano'}
                {' · '}
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {post.topic && <Badge tone="blue" icon={<Hash size={10} />}>{post.topic}</Badge>}
            {!isOwn && currentUserId && (
              <button
                onClick={() => onFollow(post.authorId)}
                className={`text-[11px] font-semibold px-2 py-1 rounded-md transition-colors
                  ${isFollowing ? 'text-success hover:text-danger' : 'text-accent hover:bg-accent-soft'}`}
              >
                {isFollowing ? <span className="inline-flex items-center gap-1"><UserCheck size={12} /> Siguiendo</span>
                  : <span className="inline-flex items-center gap-1"><UserPlus size={12} /> Seguir</span>}
              </button>
            )}
          </div>
        </div>

        {/* Contenido */}
        <RichText text={post.text} onHashtag={onHashtag} />
        {post.media && (
          <div className="rounded-lg overflow-hidden border border-line">
            <img src={post.media} alt="" loading="lazy" className="w-full h-auto max-h-[480px] object-cover" />
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-1 pt-2 border-t border-line flex-wrap">
          <ActionButton
            active={reaction === 'like'}
            activeClass="text-danger bg-danger-soft"
            icon={<Heart size={15} className={reaction === 'like' ? 'fill-current' : ''} />}
            label={post.likes || 0}
            onClick={() => onReact(post.id, 'like')}
          />
          <ActionButton
            active={post.repostedBy?.includes(currentUserId)}
            activeClass="text-success bg-success-soft"
            icon={<Repeat size={15} />}
            label={post.reposts || 0}
            onClick={() => onRepost(post.id)}
          />
          <ActionButton
            active={isSaved}
            activeClass="text-accent-ink bg-accent-soft"
            icon={<Bookmark size={15} className={isSaved ? 'fill-current' : ''} />}
            onClick={() => onSave(post.id)}
          />
          <div className="flex-1" />
          {hasAIConfig() && (
            <ActionButton icon={<SearchCheck size={14} />} onClick={runFactCheck} />
          )}
          {isOwn ? (
            <ActionButton icon={<Trash2 size={14} />} onClick={() => onDelete(post.id)} />
          ) : (
            currentUserId && !isMock(post.id) && (
              <ActionButton icon={<Flag size={14} />} onClick={() => setReportOpen(true)} />
            )
          )}
          <ActionButton
            active={showComments}
            activeClass="text-ink bg-surface-2"
            icon={<MessageSquare size={15} />}
            label={`${post.commentCount || comments?.length || 0}`}
            onClick={toggleComments}
          />
          <button onClick={toggleComments} className="text-faint p-1" aria-label="Alternar comentarios">
            {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Comentarios */}
        {showComments && (
          <div className="space-y-3 pt-1 animate-fade-up">
            {comments === null ? (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-12 rounded-lg" />
                <div className="skeleton-shimmer h-12 rounded-lg" />
              </div>
            ) : comments.length === 0 ? (
              <p className="text-center text-xs text-faint py-3">Sé el primero en dar tu opinión</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="bg-surface-2 rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <button
                        onClick={() => onOpenProfile(c.authorId)}
                        className="text-xs font-semibold text-ink hover:text-accent transition-colors inline-flex items-center gap-1.5"
                      >
                        {c.authorName}
                        {c.isVerified && <BadgeCheck size={12} className="text-accent" />}
                        <PartyPin partyId={c.party} />
                      </button>
                      <div className="flex items-center gap-2">
                        {c.authorId === currentUserId && (
                          <button onClick={() => removeComment(c.id)} aria-label="Eliminar comentario" className="text-faint hover:text-danger transition-colors">
                            <Trash2 size={12} />
                          </button>
                        )}
                        <span className="font-mono text-[9px] uppercase text-faint">{timeAgo(c.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={submitComment} className="flex items-center gap-2.5">
              <Avatar name={userName} size="sm" />
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value.slice(0, 1000))}
                placeholder="Escribe tu respuesta…"
                className="flex-1 bg-surface border border-line rounded-md px-3.5 py-2.5 text-sm text-ink
                  placeholder:text-faint outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors"
              />
            </form>
          </div>
        )}
      </div>

      {/* Modal de fact-check */}
      <Modal open={factOpen} onClose={() => setFactOpen(false)} title="Verificación de datos (IA)">
        {factLoading ? (
          <div className="flex items-center gap-3 text-muted text-sm py-6 justify-center">
            <Spinner size={16} /> Analizando afirmaciones…
          </div>
        ) : factResult ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge tone={VERDICTS[factResult.verdict]?.tone || 'neutral'}>
                {VERDICTS[factResult.verdict]?.label || factResult.verdict}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">Confianza</span>
                <div className="w-24 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${Math.round((factResult.confidence || 0) * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted">
                  {Math.round((factResult.confidence || 0) * 100)}%
                </span>
              </div>
            </div>
            {factResult.claim_detectado && (
              <blockquote className="text-sm text-ink border-l-2 border-line pl-3 italic">
                “{factResult.claim_detectado}”
              </blockquote>
            )}
            <p className="text-sm text-muted leading-relaxed">{factResult.explanation}</p>
            {factResult.sources_suggested?.length > 0 && (
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint mb-1.5">Dónde verificar</p>
                <ul className="space-y-1">
                  {factResult.sources_suggested.map((s, i) => (
                    <li key={i} className="text-sm text-ink">· {s}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-[11px] text-faint leading-relaxed border-t border-line pt-3">
              Verificación automática con IA: puede contener errores y no sustituye el
              periodismo de verificación profesional.
            </p>
          </div>
        ) : null}
      </Modal>

      {/* Modal de reporte */}
      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Reportar publicación"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setReportOpen(false)}>Cancelar</Button>
            <Button variant="danger" size="sm" onClick={submitReport}>Enviar reporte</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select label="Motivo" value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
            {REPORT_REASONS.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Textarea
            label="Detalles (opcional)"
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            hint="Con 5 reportes la publicación se oculta automáticamente y pasa a revisión."
            placeholder="Describe el problema…"
          />
        </div>
      </Modal>
    </article>
  );
};

export default PostCard;
