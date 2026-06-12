import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const KIND = {
  success: { icon: CheckCircle2, classes: 'border-success/20 text-success bg-success-soft' },
  error: { icon: AlertCircle, classes: 'border-danger/20 text-danger bg-danger-soft' },
  info: { icon: Info, classes: 'border-accent/20 text-accent-ink bg-accent-soft' },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, { kind = 'info', duration = 4000 } = {}) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev.slice(-3), { id, message, kind }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const api = {
    toast,
    success: (msg, opts) => toast(msg, { ...opts, kind: 'success' }),
    error: (msg, opts) => toast(msg, { ...opts, kind: 'error' }),
    info: (msg, opts) => toast(msg, { ...opts, kind: 'info' }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm"
      >
        {toasts.map(({ id, message, kind }) => {
          const { icon: Icon, classes } = KIND[kind] || KIND.info;
          return (
            <div
              key={id}
              className={`flex items-start gap-2.5 border rounded-lg px-4 py-3 shadow-lift
                bg-surface animate-fade-up text-sm ${classes}`}
            >
              <Icon size={16} className="mt-0.5 shrink-0" />
              <p className="flex-1 leading-snug text-ink">{message}</p>
              <button
                onClick={() => dismiss(id)}
                aria-label="Cerrar aviso"
                className="text-faint hover:text-ink transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
};
