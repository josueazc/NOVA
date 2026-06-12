import { useCallback, useEffect, useState } from 'react';
import { routeFromHash, hashFromRoute, DEFAULT_ROUTE } from '@/config/routes';

// Routing ligero por hash: deep-links y botón atrás sin dependencias.
export const useHashRoute = () => {
  const [route, setRoute] = useState(() => routeFromHash(window.location.hash) || DEFAULT_ROUTE);

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((id) => {
    const hash = hashFromRoute(id);
    if (window.location.hash !== hash) {
      window.location.hash = hash; // dispara hashchange -> setRoute
    } else {
      setRoute(id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return [route, navigate];
};

export default useHashRoute;
