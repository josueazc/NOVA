// ============================================================================
// Analytics y observabilidad — PostHog (producto) + Sentry (errores).
// Ambos son opcionales: solo se cargan (import dinámico) si hay env vars.
// Además registra eventos propios en Supabase (analytics_events) para
// alimentar los dashboards ciudadanos sin depender de terceros.
// ============================================================================
import { supabase } from '@/lib/supabaseClient';

let posthog = null;

export async function initAnalytics() {
  const phKey = import.meta.env.VITE_POSTHOG_KEY;
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (phKey) {
    try {
      const mod = await import('posthog-js');
      posthog = mod.default;
      posthog.init(phKey, {
        api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
        capture_pageview: false, // pageviews manuales (routing por hash)
        persistence: 'localStorage',
      });
    } catch (err) {
      console.warn('PostHog no disponible:', err.message);
    }
  }

  if (sentryDsn) {
    try {
      const Sentry = await import('@sentry/react');
      Sentry.init({
        dsn: sentryDsn,
        tracesSampleRate: 0.2,
        environment: import.meta.env.MODE,
      });
      // Lo usa el ErrorBoundary global
      window.__SENTRY__ = { captureException: Sentry.captureException };
    } catch (err) {
      console.warn('Sentry no disponible:', err.message);
    }
  }
}

export function identify(user) {
  if (!user) return;
  posthog?.identify(user.id, {
    province: user.user_metadata?.province,
    is_politician: user.user_metadata?.is_politician || false,
  });
}

/** Evento de producto. Va a PostHog y a analytics_events (fire-and-forget). */
export function track(event, properties = {}, user = null) {
  posthog?.capture(event, properties);
  if (supabase) {
    supabase
      .from('analytics_events')
      .insert({
        user_id: user?.id || null,
        event,
        properties,
        province: user?.user_metadata?.province || null,
      })
      .then(({ error }) => error && console.debug('analytics_events:', error.message));
  }
}

export function pageView(route, user = null) {
  track('$pageview', { route }, user);
}
