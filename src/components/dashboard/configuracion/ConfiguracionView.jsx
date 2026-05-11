import React, { useState, useEffect } from 'react';
import { 
  Settings, Moon, Sun, Lock, ShieldCheck, 
  Trash2, AlertTriangle, KeyRound, Bell, EyeOff, CheckCircle2, AlertCircle
} from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

const ConfiguracionView = ({ user }) => {
  // --- ESTADOS ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  // Estados de Contraseña
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // --- EFECTOS ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // --- HANDLERS ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Las contraseñas no coinciden. Inténtalo de nuevo.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage(null);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    setPasswordLoading(false);

    if (error) {
      setPasswordMessage({ type: 'error', text: `Error: ${error.message}` });
    } else {
      setPasswordMessage({ type: 'success', text: '¡Contraseña actualizada con éxito!' });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("¡ADVERTENCIA CRÍTICA! ¿Estás completamente seguro de que deseas eliminar tu cuenta? Esta acción borrará todos tus datos de forma irrecuperable.")) {
       if (!supabase) return;
       const { error } = await supabase.rpc('delete_user');
       if (error) {
         alert("Error al intentar eliminar la cuenta: " + error.message + ". (Asegúrate de haber ejecutado el script SQL en Supabase).");
       } else {
         alert("Tu cuenta ha sido eliminada correctamente.");
         await supabase.auth.signOut();
         window.location.reload();
       }
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-white font-sans pb-24 animate-in fade-in duration-500 pt-8 transition-colors">
      
      <div className="max-w-4xl mx-auto px-6 mb-12 flex items-center gap-4">
        <div className="bg-[#001D4A] dark:bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
          <Settings size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#001D4A] dark:text-blue-400">Configuración</h2>
          <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase">Administra tu cuenta</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA (Ajustes Generales) */}
        <div className="md:col-span-2 space-y-8">
          
          {/* APARIENCIA */}
          <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#001D4A] dark:text-blue-400 mb-6 flex items-center gap-2">
              <Sun size={20} className="dark:hidden" />
              <Moon size={20} className="hidden dark:block" />
              Apariencia
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <div>
                <p className="font-bold text-sm">Modo Oscuro</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Activa el tema oscuro para proteger tu vista de noche.</p>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${isDarkMode ? 'bg-blue-500' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </section>

          {/* PRIVACIDAD Y NOTIFICACIONES */}
          <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#001D4A] dark:text-blue-400 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} />
              Privacidad y Alertas
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Bell className="text-slate-400" size={18} />
                  <div>
                    <p className="font-bold text-sm">Notificaciones por Correo</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mt-1">Recibir boletines semanales</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${notifications ? 'bg-green-500' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <EyeOff className="text-slate-400" size={18} />
                  <div>
                    <p className="font-bold text-sm">Perfil Privado</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mt-1">Ocultar mi información del Directorio</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPrivateProfile(!privateProfile)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${privateProfile ? 'bg-[#001D4A]' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${privateProfile ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* CAMBIAR CONTRASEÑA */}
          <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#001D4A] dark:text-blue-400 mb-6 flex items-center gap-2">
              <Lock size={20} />
              Actualizar Contraseña
            </h3>
            
            {passwordMessage && (
              <div className={`flex items-start gap-3 p-4 mb-6 rounded-2xl border text-sm font-medium ${
                passwordMessage.type === 'error' 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400' 
                  : 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-700 dark:text-green-400'
              }`}>
                {passwordMessage.type === 'error' ? <AlertCircle size={20} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={20} className="shrink-0 mt-0.5" />}
                <p>{passwordMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-2">Nueva Contraseña</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#001D4A] dark:focus:border-blue-500 transition-all text-sm font-medium"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-2">Confirmar Contraseña</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <ShieldCheck size={18} />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#001D4A] dark:focus:border-blue-500 transition-all text-sm font-medium"
                    placeholder="Repite la clave"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full bg-[#001D4A] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-md transition-all active:scale-95"
              >
                {passwordLoading ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
              </button>
            </form>
          </section>

        </div>

        {/* COLUMNA DERECHA (Zona de Peligro) */}
        <div>
          <section className="bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] p-8 border border-red-100 dark:border-red-900 shadow-sm relative overflow-hidden group h-full">
            <div className="absolute -right-8 -top-8 w-32 h-32 opacity-[0.03] dark:opacity-10 group-hover:scale-125 transition-transform text-red-600">
              <AlertTriangle size={128} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-red-600 dark:text-red-400 mb-2">Zona de Peligro</h3>
              <p className="text-red-800/60 dark:text-red-300/60 text-sm font-medium mb-8 leading-relaxed flex-grow">
                Al eliminar tu cuenta, todos tus comentarios, posts, perfil y configuraciones serán borrados permanentemente de nuestros servidores. Esta acción no se puede deshacer.
              </p>
              
              <button 
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Trash2 size={16} /> Eliminar Cuenta
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default ConfiguracionView;
