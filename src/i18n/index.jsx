import React, { createContext, useCallback, useContext, useState } from 'react';
import es from './es';
import en from './en';

// Sistema i18n ligero sin dependencias. Para agregar un idioma:
// 1) crear src/i18n/<código>.js  2) registrarlo en LANGUAGES.
const LANGUAGES = { es, en };

export const AVAILABLE_LANGS = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

const STORAGE_KEY = 'lang';

const I18nContext = createContext(null);

const lookup = (dict, path) =>
  path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), dict);

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES[saved]) return saved;
    return navigator.language?.startsWith('en') ? 'en' : 'es';
  });

  const setLang = useCallback((code) => {
    if (!LANGUAGES[code]) return;
    localStorage.setItem(STORAGE_KEY, code);
    setLangState(code);
    document.documentElement.lang = code;
  }, []);

  // t('home.kicker') con fallback: diccionario activo -> español -> fallback explícito
  const t = useCallback(
    (key, fallback) => lookup(LANGUAGES[lang], key) ?? lookup(es, key) ?? fallback ?? key,
    [lang]
  );

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>');
  return ctx;
};
