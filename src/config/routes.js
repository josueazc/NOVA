// Fuente única de verdad para la navegación de la app.
// `primary` aparece en la barra; el resto vive en el menú secundario.

export const ROUTES = [
  { id: 'inicio', label: 'Inicio', hash: '#/', primary: true },
  { id: 'comunidad', label: 'Comunidad', hash: '#/comunidad', primary: true },
  { id: 'comparador', label: 'Comparador', hash: '#/comparador', primary: true },
  { id: 'partidos', label: 'Partidos', hash: '#/partidos', primary: true },
  { id: 'planes', label: 'Planes', hash: '#/planes', primary: true },
  { id: 'asamblea', label: 'Asamblea', hash: '#/asamblea', primary: true },
  { id: 'test', label: 'Test Político', hash: '#/test', primary: true },
  { id: 'ia', label: 'Asistente IA', hash: '#/asistente', primary: true },
  { id: 'perfil', label: 'Mi Perfil', hash: '#/perfil' },
  { id: 'notificaciones', label: 'Notificaciones', hash: '#/notificaciones' },
  { id: 'participacion', label: 'Participación', hash: '#/participacion' },
  { id: 'abstencionismo', label: 'Abstencionismo', hash: '#/abstencionismo' },
  { id: 'docs', label: 'Documentación', hash: '#/documentacion' },
  { id: 'config', label: 'Configuración', hash: '#/configuracion' },
];

export const DEFAULT_ROUTE = 'inicio';

export const routeFromHash = (hash) => {
  const route = ROUTES.find((r) => r.hash === hash);
  return route ? route.id : DEFAULT_ROUTE;
};

export const hashFromRoute = (id) => {
  const route = ROUTES.find((r) => r.id === id);
  return route ? route.hash : '#/';
};
