import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Construction } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import useHashRoute from '@/hooks/useHashRoute';
import { EmptyState, SkeletonCard } from '@/components/ui';
import { unreadCount } from '@/services/notifications';
import { identify, pageView } from '@/services/analytics';
import HomeView from './home/HomeView';

// Code splitting: cada vista carga solo cuando se visita.
// Documentación (mermaid ~1 MB) deja de pesar en el bundle inicial.
const PartidosView = lazy(() => import('./partidos/PartidosView'));
const PlanesView = lazy(() => import('./planes/PlanesView'));
const AsambleaView = lazy(() => import('./asamblea/AsambleaView'));
const ComunidadView = lazy(() => import('./comunidad/ComunidadView'));
const TestPoliticoView = lazy(() => import('./test_politico/TestPoliticoView'));
const PoliticalChatbot = lazy(() => import('./chat/PoliticalChatbot'));
const ConfiguracionView = lazy(() => import('./configuracion/ConfiguracionView'));
const DocumentacionView = lazy(() => import('./documentacion/DocumentacionView'));
const AbstencionismoView = lazy(() => import('./abstencionismo/AbstencionismoView'));
const ComparadorView = lazy(() => import('./comparador/ComparadorView'));
const NotificacionesView = lazy(() => import('./notificaciones/NotificacionesView'));
const ParticipacionView = lazy(() => import('./participacion/ParticipacionView'));

const ViewFallback = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-4">
    <SkeletonCard />
    <SkeletonCard />
  </div>
);

const Placeholder = ({ label }) => (
  <EmptyState
    icon={<Construction size={22} />}
    title="En construcción"
    description={`El módulo de ${label} estará disponible pronto.`}
    className="py-32"
  />
);

const Dashboard = ({ userName, user, handleSignOut }) => {
  const [route, navigate] = useHashRoute();
  const [unread, setUnread] = useState(0);

  const refreshUnread = useCallback(() => {
    if (!user?.id) return;
    unreadCount(user.id).then(setUnread).catch(() => {});
  }, [user?.id]);

  useEffect(() => {
    refreshUnread();
    const interval = setInterval(refreshUnread, 60000);
    return () => clearInterval(interval);
  }, [refreshUnread]);

  useEffect(() => {
    identify(user);
  }, [user]);

  useEffect(() => {
    pageView(route, user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const renderView = () => {
    switch (route) {
      case 'inicio':
        return <HomeView userName={userName} onNavigate={navigate} />;
      case 'partidos':
        return <PartidosView />;
      case 'planes':
        return <PlanesView />;
      case 'asamblea':
        return <AsambleaView />;
      case 'comunidad':
        return <ComunidadView userName={userName} user={user} defaultView="feed" />;
      case 'perfil':
        return <ComunidadView userName={userName} user={user} defaultView="profile" />;
      case 'test':
        return <TestPoliticoView />;
      case 'ia':
        return <PoliticalChatbot />;
      case 'config':
        return <ConfiguracionView user={user} />;
      case 'docs':
        return <DocumentacionView />;
      case 'abstencionismo':
        return <AbstencionismoView />;
      case 'comparador':
        return <ComparadorView />;
      case 'notificaciones':
        return <NotificacionesView user={user} onCountChange={setUnread} />;
      case 'participacion':
        return <ParticipacionView user={user} />;
      default:
        return <HomeView userName={userName} onNavigate={navigate} />;
    }
  };

  return (
    <AppShell route={route} onNavigate={navigate} userName={userName} unreadCount={unread} onSignOut={handleSignOut}>
      <div key={route} className="animate-fade-in">
        <Suspense fallback={<ViewFallback />}>{renderView()}</Suspense>
      </div>
    </AppShell>
  );
};

export default Dashboard;
