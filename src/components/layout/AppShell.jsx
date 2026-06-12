import React, { useEffect, useRef, useState } from 'react';
import {
  Menu, X, Sun, Moon, LogOut, Settings, Bell, User,
  ChevronDown, Activity, Map as MapIcon, BookOpen, FileText, BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n, AVAILABLE_LANGS } from '@/i18n';

const PRIMARY = ROUTES.filter((r) => r.primary);
// "Más": vistas secundarias que vienen del config — perfil/config/notif los
// dejamos como iconos sueltos y el resto entra al desplegable.
const MORE_IDS = ['participacion', 'abstencionismo', 'docs'];
const MORE_ICONS = {
  participacion: Activity,
  abstencionismo: MapIcon,
  docs: BookOpen,
  perfil: User,
};

const Wordmark = ({ onClick }) => (
  <button onClick={onClick} className="flex items-baseline gap-2 group" aria-label="Ir al inicio">
    <span className="font-black tracking-tighter text-2xl text-ink leading-none group-hover:text-accent transition-colors">
      NOVA
    </span>
    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint border border-line rounded px-1.5 py-0.5">
      CR 2026
    </span>
  </button>
);

const ThemeToggle = () => {
  const { resolved, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={resolved === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="p-2 rounded-md text-muted hover:text-ink hover:bg-surface-2 transition-colors"
    >
      {resolved === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

const LangToggle = () => {
  const { lang, setLang } = useI18n();
  const next = AVAILABLE_LANGS.find((l) => l.code !== lang) || AVAILABLE_LANGS[0];
  return (
    <button
      onClick={() => setLang(next.code)}
      aria-label={`Cambiar idioma a ${next.label}`}
      title={next.label}
      className="px-2 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-[0.15em] text-muted hover:text-ink hover:bg-surface-2 transition-colors"
    >
      {lang}
    </button>
  );
};

const NavLink = ({ route, active, onNavigate, className = '' }) => (
  <a
    href={route.hash}
    onClick={(e) => {
      e.preventDefault();
      onNavigate(route.id);
    }}
    aria-current={active ? 'page' : undefined}
    className={`relative text-[13px] whitespace-nowrap transition-colors py-1.5
      ${active ? 'text-ink font-semibold' : 'text-muted hover:text-ink'} ${className}`}
  >
    {route.i18nLabel || route.label}
    {active && <span className="absolute inset-x-0 -bottom-[13px] h-px bg-ink hidden lg:block" />}
  </a>
);

const AppShell = ({ route, onNavigate, userName, unreadCount = 0, onSignOut, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const { t } = useI18n();
  const withLabel = (r) => ({ ...r, i18nLabel: t(`nav.${r.id}`, r.label) });
  const moreItems = MORE_IDS.map((id) => ROUTES.find((r) => r.id === id)).filter(Boolean);
  const moreActive = moreItems.some((r) => r.id === route);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Cierra el desplegable "Más" al hacer click fuera
  useEffect(() => {
    if (!moreOpen) return;
    const onClickAway = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, [moreOpen]);

  const go = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-canvas/85 backdrop-blur-md border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Wordmark onClick={() => go('inicio')} />

          <nav className="hidden lg:flex items-center gap-5" aria-label="Navegación principal">
            {PRIMARY.map((r) => (
              <NavLink key={r.id} route={withLabel(r)} active={route === r.id} onNavigate={go} />
            ))}

            {/* Desplegable "Más" */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`relative flex items-center gap-1 text-[13px] whitespace-nowrap transition-colors py-1.5
                  ${moreActive || moreOpen ? 'text-ink font-semibold' : 'text-muted hover:text-ink'}`}
              >
                Más
                <ChevronDown size={13} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                {moreActive && <span className="absolute inset-x-0 -bottom-[13px] h-px bg-ink" />}
              </button>
              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-60 bg-surface border border-line rounded-2xl shadow-lift p-2 animate-scale-in z-[110]"
                >
                  {moreItems.map((r) => {
                    const Icon = MORE_ICONS[r.id];
                    const active = route === r.id;
                    return (
                      <button
                        key={r.id}
                        role="menuitem"
                        onClick={() => {
                          setMoreOpen(false);
                          go(r.id);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
                          ${active ? 'bg-accent-soft text-accent font-bold' : 'text-ink hover:bg-surface-2'}`}
                      >
                        {Icon && (
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center
                            ${active ? 'bg-accent text-white' : 'bg-surface-2 text-muted'}`}>
                            <Icon size={14} />
                          </span>
                        )}
                        <span>{t(`nav.${r.id}`, r.label)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => go('notificaciones')}
              aria-label="Notificaciones"
              className={`relative p-2 rounded-md transition-colors hidden sm:block
                ${route === 'notificaciones' ? 'text-ink bg-surface-2' : 'text-muted hover:text-ink hover:bg-surface-2'}`}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-danger text-white text-[8px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => go('perfil')}
              aria-label="Mi perfil"
              className={`p-2 rounded-md transition-colors hidden sm:block
                ${route === 'perfil' ? 'text-ink bg-surface-2' : 'text-muted hover:text-ink hover:bg-surface-2'}`}
            >
              <User size={16} />
            </button>
            <button
              onClick={() => go('config')}
              aria-label="Configuración"
              className={`p-2 rounded-md transition-colors hidden sm:block
                ${route === 'config' ? 'text-ink bg-surface-2' : 'text-muted hover:text-ink hover:bg-surface-2'}`}
            >
              <Settings size={16} />
            </button>
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={onSignOut}
              className="hidden lg:inline-flex items-center gap-1.5 ml-2 text-[13px] font-medium text-muted
                hover:text-danger border border-line rounded-md px-3 py-1.5 transition-colors"
            >
              <LogOut size={13} />
              {t('common.logout')}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="lg:hidden p-2 rounded-md text-ink hover:bg-surface-2 transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <div className="absolute inset-0 bg-ink/20 backdrop-blur-[2px] animate-fade-in" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-surface border-l border-line p-5 flex flex-col animate-scale-in overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Wordmark onClick={() => go('inicio')} />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-md text-muted hover:text-ink hover:bg-surface-2"
              >
                <X size={18} />
              </button>
            </div>
            {userName && (
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
                {t('common.session')}: {userName}
              </p>
            )}
            <nav className="flex flex-col" aria-label="Navegación móvil">
              {[...PRIMARY, ...SECONDARY, ROUTES.find((r) => r.id === 'notificaciones'), ROUTES.find((r) => r.id === 'config')]
                .filter(Boolean)
                .map((r, i) => (
                  <a
                    key={r.id}
                    href={r.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.id);
                    }}
                    className={`stagger-item px-3 py-2.5 rounded-md text-sm transition-colors border-b border-line/60 last:border-0
                      ${route === r.id ? 'text-ink font-semibold bg-surface-2' : 'text-muted hover:text-ink'}`}
                    style={{ '--index': i }}
                  >
                    {t(`nav.${r.id}`, r.label)}
                  </a>
                ))}
            </nav>
            <button
              onClick={onSignOut}
              className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-medium
                text-danger bg-danger-soft border border-danger/10 rounded-md px-4 py-2.5 transition-all active:scale-[0.98]"
            >
              <LogOut size={14} />
              {t('common.logoutLong')}
            </button>
          </div>
        </div>
      )}

      {/* Contenido */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="border-t border-line mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
          <div className="space-y-3 max-w-sm">
            <span className="font-black tracking-tighter text-xl text-ink">NOVA</span>
            <p className="text-sm text-muted leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">{t('footer.modules')}</h4>
            <ul className="space-y-2.5">
              {PRIMARY.filter((r) => r.id !== 'inicio').map((r) => (
                <li key={r.id}>
                  <a
                    href={r.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.id);
                    }}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {t(`nav.${r.id}`, r.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-4">{t('footer.transparency')}</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href="https://www.tse.go.cr" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
                  {t('footer.tseSources')}
                </a>
              </li>
              <li>
                <a href="http://www.asamblea.go.cr" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
                  {t('footer.assembly')}
                </a>
              </li>
              <li>
                <a href="https://github.com/josueazc/VoteOn2" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
                  {t('footer.openSource')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              © {new Date().getFullYear()} NOVA — {t('footer.civicProject')}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              {t('footer.madeIn')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
