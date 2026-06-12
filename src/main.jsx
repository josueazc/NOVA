import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { I18nProvider } from './i18n/index.jsx';
import { ToastProvider } from './components/ui/Toast.jsx';
import { initAnalytics } from './services/analytics.js';
import './styles.css';

initAnalytics();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
