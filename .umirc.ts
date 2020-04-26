import { defineConfig } from 'umi';

const routes = [
  { name: '登录页', path: '/login', component: '@/pages/user/login' },
  { path: '/', component: '@/pages' },
];

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  routes,
  dva: { immer: true, hmr: false },
  antd: { dark: true, compact: true },
});
