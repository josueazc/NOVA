// Contenido de demostración: simula actividad institucional mientras la
// comunidad crece. Se mezcla con los posts reales de Supabase.

export const MOCK_BOTS_POSTS = [
  {
    id: 'mock_bot_post_1',
    text: 'Aprobamos en primer debate la nueva ley de protección de humedales. Seguimos legislando con firmeza. #LeyHumedales #Ambiente',
    topic: 'Ambiente',
    hashtags: ['leyhumedales', 'ambiente'],
    authorId: 'diputado_carlos_mock',
    authorName: 'Dip. Carlos Pérez',
    party: 'pln',
    isPolitician: true,
    isVerified: true,
    cargo: 'Diputado de la República',
    badges: ['Legislador'],
    isBot: true,
    followersCount: 15234,
    followingCount: 120,
    media: null,
    likes: 45,
    dislikes: 0,
    reposts: 12,
    commentCount: 1,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'mock_bot_post_2',
    text: 'Los índices de criminalidad han bajado un 5% en la zona capital según los reportes del OIJ. #Seguridad',
    topic: 'Seguridad',
    hashtags: ['seguridad'],
    authorId: 'seguridad_bot_mock',
    authorName: 'Seguridad CR',
    party: null,
    isPolitician: false,
    isVerified: false,
    cargo: null,
    badges: ['Bot analista'],
    isBot: true,
    followersCount: 8400,
    followingCount: 5,
    media: null,
    likes: 120,
    dislikes: 5,
    reposts: 34,
    commentCount: 0,
    createdAt: new Date(Date.now() - 7200000),
  },
];

export const MOCK_BOTS_COMMENTS = {
  mock_bot_post_1: [
    {
      id: 'mock_comment_1',
      text: 'Excelente iniciativa, es vital proteger nuestros humedales.',
      authorId: 'eco_bot_mock',
      authorName: 'EcoBot CR',
      party: null,
      createdAt: new Date(Date.now() - 1800000),
    },
  ],
};
