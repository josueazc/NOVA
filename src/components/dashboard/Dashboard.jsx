import React, { useCallback, useEffect, useState } from 'react';
import { Construction } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import useHashRoute from '@/hooks/useHashRoute';
import { EmptyState } from '@/components/ui';
import { unreadCount } from '@/services/notifications';
import { identify, pageView } from '@/services/analytics';
import NotificacionesView from './notificaciones/NotificacionesView';
import ParticipacionView from './participacion/ParticipacionView';
import HomeView from './home/HomeView';
import PartidosView from './partidos/PartidosView';
import PlanesView from './planes/PlanesView';
import AsambleaView from './asamblea/AsambleaView';
import ComunidadView from './comunidad/ComunidadView';
import TestPoliticoView from './test_politico/TestPoliticoView';
import PoliticalChatbot from './chat/PoliticalChatbot';
import ConfiguracionView from './configuracion/ConfiguracionView';
import DocumentacionView from './documentacion/DocumentacionView';
import AbstencionismoView from './abstencionismo/AbstencionismoView';
import ComparadorView from './comparador/ComparadorView';

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
        {renderView()}
      </div>
    </AppShell>
  );
};

export default Dashboard;
