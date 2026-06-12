import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { Button, Input, Select, Textarea } from '@/components/ui';
import { partidosData } from '@/data/partidosData';

const PROVINCES = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];

const Requirement = ({ met, text }) => (
  <span className={`inline-flex items-center gap-1 font-mono text-[10px] transition-colors ${met ? 'text-success' : 'text-faint'}`}>
    {met ? <CheckCircle2 size={11} /> : <XCircle size={11} className="opacity-60" />}
    {text}
  </span>
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

  const [validations, setValidations] = useState({ hasUpper: false, hasNumber: false, hasSpecial: false, minLength: false });

  useEffect(() => {
    setValidations({
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      minLength: password.length >= 8,
    });
  }, [password]);

  const isPasswordValid = Object.values(validations).every(Boolean);

  const onSubmit = (e) => {
    e.preventDefault();
    handleAuth({ isSignUp, firstName, lastName, email, password, province, dni, bio, party, isPolitician, cargo, cargoInfo, isPasswordValid, setIsSignUp });
  };

  const switchMode = (signUp) => {
    setIsSignUp(signUp);
    setMessage(null);
  };

  return (
    <div className="min-h-[100dvh] bg-canvas grid lg:grid-cols-[1fr_1.1fr]">
      {/* Panel editorial izquierdo */}
      <aside className="hidden lg:flex flex-col justify-between p-12 bg-surface-2 border-r border-line relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(80% 60% at 0% 100%, rgb(var(--c-accent) / 0.06), transparent)' }}
        />
        <div className="relative flex items-baseline gap-2">
          <span className="font-serif italic text-2xl text-ink">NOVA</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint border border-line rounded px-1.5 py-0.5">
            CR 2026
          </span>
        </div>
        <div className="relative space-y-6 max-w-md">
          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-ink">
            La democracia empieza con <em className="text-accent">información</em>.
          </h1>
          <p className="text-muted leading-relaxed">
            Compara propuestas, sigue a la Asamblea, debate con otros ciudadanos y
            decide con datos oficiales del TSE — todo en un solo lugar.
          </p>
          <ul className="space-y-2.5">
            {['Comparador de propuestas por tema', 'Comunidad política moderada', 'Asistente IA con fuentes oficiales'].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Libertad · Justicia · Pura vida
        </p>
      </aside>

      {/* Formulario */}
      <main className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-fade-up">
          {/* Marca en móvil */}
          <div className="lg:hidden flex items-baseline gap-2 mb-8">
            <span className="font-serif italic text-2xl text-ink">NOVA</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint border border-line rounded px-1.5 py-0.5">CR 2026</span>
          </div>

          <h2 className="font-serif text-3xl text-ink tracking-tight mb-1.5">
            {isSignUp ? 'Crea tu perfil ciudadano' : 'Bienvenido de vuelta'}
          </h2>
          <p className="text-sm text-muted mb-7">
            {isSignUp ? 'Únete al debate informado de cara a las elecciones.' : 'Inicia sesión para continuar al panel.'}
          </p>

          {/* Selector entrar/registro */}
          <div className="flex bg-surface-2 border border-line rounded-lg p-1 mb-6" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={!isSignUp}
              onClick={() => switchMode(false)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[13px] font-medium transition-all
                ${!isSignUp ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink'}`}
            >
              <LogIn size={14} /> Entrar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignUp}
              onClick={() => switchMode(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[13px] font-medium transition-all
                ${isSignUp ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink'}`}
            >
              <UserPlus size={14} /> Registro
            </button>
          </div>

          {message && (
            <div
              role="alert"
              className={`mb-5 px-4 py-3 rounded-lg flex items-start gap-2.5 text-sm animate-fade-up border
                ${message.type === 'success' ? 'bg-success-soft text-success border-success/20' : 'bg-danger-soft text-danger border-danger/20'}`}
            >
              {message.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            {isSignUp && (
              <div className="space-y-4 animate-fade-up">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nombre" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre" />
                  <Input label="Apellido" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select label="Provincia" required value={province} onChange={(e) => setProvince(e.target.value)}>
                    <option value="">Selecciona…</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </Select>
                  <Input label="Cédula" required value={dni} onChange={(e) => setDni(e.target.value)} placeholder="0-0000-0000" />
                </div>
                <Textarea label="Bio (opcional)" rows={2} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Cuéntanos sobre tus intereses ciudadanos…" />
                <Select
                  label="Preferencia política"
                  value={party}
                  required={isPolitician}
                  onChange={(e) => setParty(e.target.value)}
                >
                  <option value="">{isPolitician ? 'Selecciona un partido (obligatorio)' : 'Ninguna o independiente'}</option>
                  {Object.values(partidosData).map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </Select>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPolitician}
                    onChange={(e) => setIsPolitician(e.target.checked)}
                    className="w-4 h-4 rounded border-line text-accent focus:ring-accent/30"
                  />
                  <span className="text-sm text-ink">Soy funcionario político o candidato</span>
                </label>
                {isPolitician && (
                  <div className="grid sm:grid-cols-2 gap-4 animate-fade-up">
                    <Input label="Cargo" required value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Diputado, alcalde…" />
                    <Input label="Detalles del cargo" value={cargoInfo} onChange={(e) => setCargoInfo(e.target.value)} placeholder="San José, 2022-2026…" />
                  </div>
                )}
              </div>
            )}

            <Input
              label="Correo electrónico"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              autoComplete="email"
            />
            <div>
              <Input
                label="Contraseña"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              {!isSignUp ? (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => handleResetPassword(email)}
                    className="text-xs text-accent hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              ) : (
                <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  <Requirement met={validations.minLength} text="8+ caracteres" />
                  <Requirement met={validations.hasUpper} text="Mayúscula" />
                  <Requirement met={validations.hasNumber} text="Número" />
                  <Requirement met={validations.hasSpecial} text="Carácter especial" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              disabled={isSignUp && (!isPasswordValid || !firstName || !lastName || !province || !dni)}
              className="w-full !mt-6 group"
            >
              {isSignUp ? 'Crear perfil ciudadano' : 'Entrar a NOVA'}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AuthScreen;
