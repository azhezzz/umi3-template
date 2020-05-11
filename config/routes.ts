export default [
  { path: '/login', component: '@/pages/user/login' },
  {
    path: '/',
    component: '@/layouts',
    wrappers: ['@/wrappers/auth'],
    routes: [
      { path: '/', component: '@/pages/home', exact: true },
      { path: '/details/dota/:id', component: '@/pages/details/dota' },
      { path: '/details/csgo/:id', component: '@/pages/details/csgo' },
      { path: '/details/lol/:id', component: '@/pages/details/lol' },
      { path: '/notification', component: '@/pages/notification' },
      { name: '404', path: '/NotFound', component: '@/pages/exception/404' },
      { path: '*', redirect: '/NotFound' },
    ],
  },
];
