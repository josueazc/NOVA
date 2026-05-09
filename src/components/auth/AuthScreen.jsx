import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, UserPlus, LogIn, ShieldCheck, CheckCircle, AlertCircle, XCircle, User, MapPin, CreditCard, Camera } from 'lucide-react';
import { partidosData } from '../../data/partidosData';

const Requirement = ({ met, text }) => (
  <div className={`flex items-center text-[9px] font-black transition-colors ${met ? 'text-green-600' : 'text-slate-400'}`}>
    {met ? <CheckCircle size={10} className="mr-1" /> : <XCircle size={10} className="mr-1 opacity-50" />}
    {text}
  </div>
);

const AuthScreen = ({ handleAuth, handleResetPassword, loading, message, setMessage }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [province, setProvince] = useState('');
  const [dni, setDni] = useState('');
  const [bio, setBio] = useState('');
  const [party, setParty] = useState('');
  const [isPolitician, setIsPolitician] = useState(false);
  const [cargo, setCargo] = useState('');
  const [cargoInfo, setCargoInfo] = useState('');

  const provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

  const [validations, setValidations] = useState({
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false
  });

  useEffect(() => {
    setValidations({
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      minLength: password.length >= 8
    });
  }, [password]);

  const isPasswordValid = Object.values(validations).every(v => v);

  const onSubmit = (e) => {
    e.preventDefault();
    handleAuth({ isSignUp, firstName, lastName, email, password, province, dni, bio, party, isPolitician, cargo, cargoInfo, isPasswordValid, setIsSignUp });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900 relative">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 my-8 animate-in zoom-in-95 duration-500">
        
        <div className="relative overflow-hidden">
          <div className="h-2 bg-[#EF1C24]"></div>
          <div className="bg-[#002B7F] p-8 text-white text-center relative">
            <div className="absolute -top-4 -right-4 opacity-10 rotate-12">
              <ShieldCheck size={120} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-1 drop-shadow-md">VoteOn</h1>
            <div className="flex items-center justify-center gap-2">
               <span className="h-px w-4 bg-white opacity-50"></span>
               <p className="text-white text-[10px] font-bold tracking-[0.2em]">PLATAFORMA CIUDADANA</p>
               <span className="h-px w-4 bg-white opacity-50"></span>
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-10">
          <div className="flex mb-8 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              type="button"
              onClick={() => { setIsSignUp(false); setMessage(null); }}
              className={`flex-1 flex items-center justify-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!isSignUp ? 'bg-white shadow-md text-[#002B7F]' : 'text-slate-500 hover:text-[#002B7F]'}`}
            >
              <LogIn size={16} className="mr-2" /> Entrar
            </button>
            <button 
              type="button"
              onClick={() => { setIsSignUp(true); setMessage(null); }}
              className={`flex-1 flex items-center justify-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isSignUp ? 'bg-white shadow-md text-[#002B7F]' : 'text-slate-500 hover:text-[#002B7F]'}`}
            >
              <UserPlus size={16} className="mr-2" /> Registro
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-2xl flex items-center text-sm font-medium animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-[#EF1C24] border border-red-100'}`}>
              {message.type === 'success' ? <CheckCircle size={18} className="mr-2 flex-shrink-0" /> : <AlertCircle size={18} className="mr-2 flex-shrink-0" />}
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            
            {isSignUp && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-[#002B7F] group-hover:text-[#002B7F] transition-all overflow-hidden">
                      <Camera size={32} />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#002B7F] text-white p-1 rounded-full border-2 border-white shadow-sm">
                      <UserPlus size={12} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Nombre</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        required={isSignUp}
                        placeholder="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Apellido</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required={isSignUp}
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Provincia</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <select 
                        required={isSignUp}
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value="">Seleccioná...</option>
                        {provincias.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Cédula</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        required={isSignUp}
                        placeholder="0-0000-0000"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Bio (Opcional)</label>
                  <textarea 
                    placeholder="Contanos un poco sobre tus intereses ciudadanos..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="2"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Preferencia Política</label>
                  <div className="relative">
                    <select 
                      value={party}
                      onChange={(e) => setParty(e.target.value)}
                      required={isSignUp && isPolitician}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                    >
                      <option value="">{isPolitician ? "Selecciona un Partido (Obligatorio)" : "Ninguna o Independiente"}</option>
                      {Object.values(partidosData).map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="group flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isPolitician"
                    checked={isPolitician}
                    onChange={(e) => setIsPolitician(e.target.checked)}
                    className="w-4 h-4 text-[#002B7F] rounded focus:ring-[#002B7F] border-slate-300"
                  />
                  <label htmlFor="isPolitician" className="text-sm font-bold text-slate-700">Soy Funcionario Político / Candidato</label>
                </div>

                {isPolitician && (
                  <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Cargo</label>
                      <input 
                        type="text" 
                        required={isSignUp && isPolitician}
                        placeholder="Ej: Diputado, Alcalde..."
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Detalles del Cargo</label>
                      <input 
                        type="text" 
                        placeholder="Ej: San José, 2022-2026..."
                        value={cargoInfo}
                        onChange={(e) => setCargoInfo(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1 group-focus-within:text-[#002B7F] transition-colors">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#002B7F] transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="ejemplo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1 group-focus-within:text-[#002B7F] transition-colors">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#002B7F] transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#002B7F] focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                />
              </div>
              
              {!isSignUp && (
                <div className="mt-2 text-right">
                  <button 
                    type="button" 
                    onClick={() => handleResetPassword(email)} 
                    className="text-[10px] font-bold text-[#002B7F] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}
              
              {isSignUp && (
                <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 px-1">
                  <Requirement met={validations.minLength} text="8+ caracteres" />
                  <Requirement met={validations.hasUpper} text="Mayúscula" />
                  <Requirement met={validations.hasNumber} text="Número" />
                  <Requirement met={validations.hasSpecial} text="Especial (@#$)" />
                </div>
              )}
            </div>

            <button 
              disabled={loading || (isSignUp && (!isPasswordValid || !firstName || !lastName || !province || !dni))}
              className="w-full bg-[#EF1C24] hover:bg-[#d11920] disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-100 transition-all flex items-center justify-center group active:scale-[0.98] mt-2 h-[60px]"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isSignUp ? 'Crear Perfil Ciudadano' : 'Entrar a VoteOn'}</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>

        </div>
        
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest">
            Libertad • Justicia • <span className="text-[#EF1C24]">Pura Vida</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
