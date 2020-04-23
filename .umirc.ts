import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  routes: [{ path: '/', component: '@/pages/index' }],
  dva: { immer: true, hmr: false },
  antd: { dark: true, compact: true },
});
