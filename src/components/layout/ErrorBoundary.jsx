import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary capturó:', error, info);
    // Sentry se engancha aquí cuando está configurado (ver services/analytics)
    if (window.__SENTRY__?.captureException) {
      window.__SENTRY__.captureException(error);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
          <div className="max-w-md text-center space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Error inesperado</p>
            <h1 className="font-black tracking-tight text-3xl text-ink">Algo salió mal</h1>
            <p className="text-sm text-muted leading-relaxed">
              Ocurrió un error al renderizar esta vista. Puedes recargar la página;
              si el problema persiste, repórtalo en la comunidad.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center font-medium rounded-md text-sm px-4 py-2.5 bg-ink text-canvas hover:bg-ink/85 transition-all active:scale-[0.98]"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
