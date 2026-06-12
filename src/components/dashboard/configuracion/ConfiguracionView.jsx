import React, { useState } from 'react';
import {
  Settings, Moon, Sun, Lock, ShieldCheck, Trash2, AlertTriangle,
  Bell, EyeOff, Monitor,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, Input, Modal, useToast } from '@/components/ui';

const Toggle = ({ checked, onChange, label }) => (
  <button
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 shrink-0
      ${checked ? 'bg-accent' : 'bg-line'}`}
  >
    <span
      className={`block bg-surface w-5 h-5 rounded-full shadow-card transform transition-transform duration-300
        ${checked ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const SettingRow = ({ icon: Icon, title, hint, children }) => (
  <div className="flex items-center justify-between gap-4 bg-surface-2 rounded-lg px-4 py-3.5">
    <div className="flex items-center gap-3 min-w-0">
      {Icon && <Icon size={16} className="text-faint shrink-0" />}
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{title}</p>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
    </div>
    {children}
  </div>
);

const THEME_OPTIONS = [
  ['light', 'Claro', Sun],
  ['dark', 'Oscuro', Moon],
  ['system', 'Sistema', Monitor],
];

const ConfiguracionView = ({ user }) => {
  const toast = useToast();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);
    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success('Contraseña actualizada.');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDeleteAccount = async () => {
    if (!supabase) return;
    const { error } = await supabase.rpc('delete_user');
    if (error) {
      toast.error(`Error al eliminar la cuenta: ${error.message}`);
    } else {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <header className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 rounded-xl bg-surface-2 text-muted flex items-center justify-center">
          <Settings size={18} />
        </span>
        <div>
          <h1 className="font-black tracking-tight text-3xl text-ink tracking-tight leading-none">Configuración</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mt-1">
            {user?.email || 'Administra tu cuenta'}
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
        <div className="space-y-6">
          {/* Apariencia */}
          <Card>
            <h3 className="text-sm font-semibold text-ink mb-4">Apariencia</h3>
            <div className="grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map(([value, label, Icon]) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  aria-pressed={theme === value}
                  className={`flex flex-col items-center gap-2 rounded-lg border px-3 py-4 transition-all
                    ${theme === value ? 'border-accent bg-accent-soft/40 text-ink' : 'border-line text-muted hover:text-ink hover:border-faint'}`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Privacidad y alertas */}
          <Card>
            <h3 className="text-sm font-semibold text-ink mb-4">Privacidad y alertas</h3>
            <div className="space-y-2.5">
              <SettingRow icon={Bell} title="Notificaciones por correo" hint="Recibir boletines semanales">
                <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} label="Notificaciones por correo" />
              </SettingRow>
              <SettingRow icon={EyeOff} title="Perfil privado" hint="Ocultar mi información del directorio">
                <Toggle checked={privateProfile} onChange={() => setPrivateProfile(!privateProfile)} label="Perfil privado" />
              </SettingRow>
            </div>
          </Card>

          {/* Contraseña */}
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
              <Lock size={14} className="text-faint" />
              Actualizar contraseña
            </h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <Input
                label="Nueva contraseña"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la clave"
                autoComplete="new-password"
              />
              <Button type="submit" loading={passwordLoading}>
                <ShieldCheck size={14} />
                Guardar nueva contraseña
              </Button>
            </form>
          </Card>
        </div>

        {/* Zona de peligro */}
        <Card className="border-danger/20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-lg bg-danger-soft text-danger flex items-center justify-center">
              <AlertTriangle size={15} />
            </span>
            <h3 className="text-sm font-semibold text-danger">Zona de peligro</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-5">
            Al eliminar tu cuenta se borran permanentemente tus publicaciones, comentarios,
            perfil y configuraciones. Esta acción no se puede deshacer.
          </p>
          <Button variant="danger" onClick={() => setDeleteOpen(true)} className="w-full">
            <Trash2 size={14} />
            Eliminar cuenta
          </Button>
        </Card>
      </div>

      {/* Confirmación de borrado */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Eliminar cuenta permanentemente"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              size="sm"
              disabled={deleteConfirmText !== 'ELIMINAR'}
              onClick={handleDeleteAccount}
            >
              Eliminar definitivamente
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            Esta acción borra todos tus datos de forma irrecuperable. Escribe{' '}
            <kbd>ELIMINAR</kbd> para confirmar.
          </p>
          <Input
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
            placeholder="ELIMINAR"
            aria-label="Confirmación de borrado"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ConfiguracionView;
