import React, { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from './lib/supabaseClient';
import AuthScreen from './components/auth/AuthScreen';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
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
        setMessage({ type: 'success', text: 'Tu cuenta ha sido creada con éxito. Ya puedes iniciar sesión.' });
        setIsSignUp(false); // Pasamos a la pantalla de login
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
        // Supabase asignará la sesión automáticamente y el useEffect mostrará la pantalla de Dashboard
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMessage(null);
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
