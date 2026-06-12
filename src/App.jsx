import React, { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from './lib/supabaseClient';
import AuthScreen from './components/auth/AuthScreen';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [session, setSession] = useState(null);

  // Fallback programático para asegurar que el perfil exista en la base de datos con todos sus atributos
  const ensureProfile = async (sessionUser) => {
    if (!sessionUser) return;
    try {
      const meta = sessionUser.user_metadata || {};
      const profileData = {
        id: sessionUser.id,
        email: sessionUser.email,
        full_name: meta.full_name || '',
        province: meta.province || '',
        dni: meta.dni || '',
        bio: meta.bio || '',
        party: meta.party || '',
        is_politician: meta.is_politician || false,
        cargo: meta.cargo || '',
        cargo_info: meta.cargo_info || ''
      };

      // Forzar que todos los atributos se guarden en public.profiles
      const { error } = await supabase.from('profiles').upsert([profileData], { onConflict: 'id' });
      if (error) {
        console.warn("Advertencia de sincronización de perfil:", error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) await ensureProfile(data.session.user);
    });

    const { data } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) await ensureProfile(newSession.user);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const handleAuth = async ({ isSignUp, firstName, lastName, email, password, province, dni, bio, party, isPolitician, cargo, cargoInfo, isPasswordValid, setIsSignUp }) => {

    if (!hasSupabaseConfig) {
      setMessage({ type: 'error', text: 'Falta configurar Supabase en el archivo .env.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const redirectUrl = window.location.origin;

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: `${firstName} ${lastName}`.trim(),
            province,
            dni,
            bio,
            party,
            is_politician: isPolitician,
            cargo,
            cargo_info: cargoInfo
          }
        }
      });
      setLoading(false);

      if (error) {
        setMessage({ type: 'error', text: `Error al crear perfil: ${error.message}` });
      } else {
        setMessage({ type: 'success', text: '¡Cuenta creada con éxito! Por favor, inicia sesión con tu nueva cuenta.' });
        setIsSignUp(false);
      }
    } else {
      // INICIO DE SESIÓN DIRECTO CON CONTRASEÑA
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      setLoading(false);

      if (error) {
        setMessage({ type: 'error', text: error.message === 'Invalid login credentials' ? 'Contraseña o correo incorrecto.' : error.message });
      } else {
        setMessage({ type: 'success', text: 'Accediendo al sistema electoral...' });
      }
    }
  };

  const handleResetPassword = async (email) => {
    if (!hasSupabaseConfig) {
      setMessage({ type: 'error', text: 'Falta configurar Supabase en el archivo .env.' });
      return;
    }
    if (!email) {
      setMessage({ type: 'error', text: 'Por favor, ingresá tu correo electrónico para recuperar la contraseña.' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Revisa tu correo. Te enviamos un enlace de recuperación.' });
    }
  };

  const handleSignOut = () => {
    supabase.auth.signOut().catch(console.error);
    setSession(null);
    localStorage.clear();
    window.location.href = '/';
  };

  if (session) {
    const userName = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    return <Dashboard userName={userName} user={session.user} handleSignOut={handleSignOut} />;
  }

  return (
    <AuthScreen
      handleAuth={handleAuth}
      handleResetPassword={handleResetPassword}
      loading={loading}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default App;
