import React, { useState } from 'react';
import { ArrowLeft, BadgeCheck, Pencil, Save, X } from 'lucide-react';
import { Avatar, Badge, Button, Card, Input, Select, Textarea, useToast } from '@/components/ui';
import { partidosData } from '@/data/partidosData';
import { updateProfile } from '@/services/community';

const PROVINCES = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];

const TABS = [
  ['posts', 'Publicaciones'],
  ['replies', 'Respuestas'],
  ['followers', 'Seguidores'],
  ['following', 'Seguidos'],
  ['saved', 'Guardados'],
];

const ProfilePanel = ({
  user, userName, viewUserId, posts, following, savedCount,
  profileTab, onTab, onBack,
}) => {
  const toast = useToast();
  const isOwn = viewUserId === user?.id;
  const meta = user?.user_metadata || {};
  const viewedPost = posts.find((p) => p.authorId === viewUserId);

  const name = isOwn ? userName : viewedPost?.authorName || 'Usuario';
  const isPolitician = isOwn ? meta.is_politician : viewedPost?.isPolitician;
  const cargo = isOwn ? meta.cargo : viewedPost?.cargo;
  const isVerified = isOwn ? meta.is_verified : viewedPost?.isVerified;
  const badges = viewedPost?.badges || [];

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: meta.full_name || userName || '',
    province: meta.province || '',
    dni: meta.dni || '',
    bio: meta.bio || '',
    party: meta.party || '',
    cargo: meta.cargo || '',
    cargo_info: meta.cargo_info || '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ userId: user.id, fields: form });
      toast.success('Perfil actualizado.');
      setEditing(false);
    } catch (err) {
      toast.error(`Error al guardar el perfil: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const stats = {
    posts: posts.filter((p) => p.authorId === viewUserId || p.repostedBy?.includes(viewUserId)).length,
    followers: isOwn ? undefined : viewedPost?.followersCount || 0,
    following: isOwn ? following.length : viewedPost?.followingCount || 0,
    saved: savedCount,
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={15} />
        Volver al muro global
      </button>

      <Card padding="p-0" className="overflow-hidden">
        {/* Banda superior sobria */}
        <div className="h-20 bg-surface-2 border-b border-line relative">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(70% 120% at 20% 0%, rgb(var(--c-accent) / 0.06), transparent)' }}
          />
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <Avatar name={name} size="xl" className="ring-4 ring-surface" />
            {isOwn && !editing && (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Pencil size={13} />
                Editar perfil
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold text-ink">{name}</h2>
            {isVerified && <BadgeCheck size={18} className="text-accent" aria-label="Perfil verificado" />}
            {badges.map((b) => (
              <Badge key={b} tone="neutral">{b}</Badge>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-faint mt-1">
            {isPolitician ? cargo || 'Político' : 'Ciudadano registrado'}
            {isOwn && meta.province ? ` · ${meta.province}` : ''}
          </p>
          {(isOwn ? meta.bio : null) && <p className="text-sm text-muted leading-relaxed mt-3 max-w-lg">{meta.bio}</p>}

          {/* Edición */}
          {editing && (
            <div className="mt-5 border border-line rounded-lg p-5 bg-surface-2/50 space-y-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">Editar perfil</h3>
                <button onClick={() => setEditing(false)} aria-label="Cancelar edición" className="text-muted hover:text-danger transition-colors">
                  <X size={16} />
                </button>
              </div>
              <Input label="Nombre completo" value={form.full_name} onChange={set('full_name')} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Provincia" value={form.province} onChange={set('province')}>
                  <option value="">Selecciona…</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
                <Input label="Cédula" value={form.dni} onChange={set('dni')} />
              </div>
              <Textarea label="Biografía" rows={2} value={form.bio} onChange={set('bio')} />
              <Select label="Preferencia política" value={form.party} onChange={set('party')}>
                <option value="">Ninguna o independiente</option>
                {Object.values(partidosData).map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </Select>
              {meta.is_politician && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Cargo" value={form.cargo} onChange={set('cargo')} />
                  <Input label="Detalles del cargo" value={form.cargo_info} onChange={set('cargo_info')} />
                </div>
              )}
              <Button onClick={handleSave} loading={saving} className="w-full">
                <Save size={14} />
                Guardar cambios
              </Button>
            </div>
          )}

          {/* Tabs de stats */}
          <div className="flex gap-1 mt-6 pt-5 border-t border-line overflow-x-auto">
            {TABS.filter(([key]) => key !== 'saved' || isOwn).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onTab(key)}
                className={`px-3.5 py-2 rounded-md text-center transition-colors shrink-0
                  ${profileTab === key ? 'bg-surface-2 text-ink' : 'text-muted hover:text-ink'}`}
              >
                <span className="block text-lg font-semibold tracking-tight">
                  {key === 'posts' && stats.posts}
                  {key === 'replies' && '·'}
                  {key === 'followers' && (stats.followers ?? '·')}
                  {key === 'following' && stats.following}
                  {key === 'saved' && stats.saved}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePanel;
