import React from 'react';
import { Construction } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import useHashRoute from '@/hooks/useHashRoute';
import { EmptyState } from '@/components/ui';
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
        return <Placeholder label="Comparador político" />;
      case 'notificaciones':
        return <Placeholder label="Notificaciones" />;
      case 'participacion':
        return <Placeholder label="Participación ciudadana" />;
      default:
        return <HomeView userName={userName} onNavigate={navigate} />;
    }
  };

  return (
    <AppShell route={route} onNavigate={navigate} userName={userName} onSignOut={handleSignOut}>
      <div key={route} className="animate-fade-in">
        {renderView()}
      </div>
    </AppShell>
  );
};

export default Dashboard;
