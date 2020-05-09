export default [
  { path: '/login', component: '@/pages/user/login' },
  { name: '404', path: '/NotFound', component: '@/pages/exception/404' },
  {
    path: '/',
    component: '@/layouts',
    wrappers: ['@/wrappers/auth'],
    routes: [
      { path: '/', component: '@/pages/home', exact: true },
      { path: '/live', component: '@/pages/live' },
      { path: '*', redirect: '/NotFound' },
    ],
  },
];
