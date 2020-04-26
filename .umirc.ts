import { defineConfig } from 'umi';
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) =>
  path.resolve(appDirectory, relativePath);
const appInfo = JSON.parse(fs.readFileSync(resolveApp('package.json')));

const routes = [
  { exact: true, path: '/', redirect: '/user/login' },
  { name: '登录页', path: '/user/login', component: '@/pages/user/login' },
];

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  routes,
  dva: { immer: true, hmr: false },
  antd: { dark: true, compact: true },
  metas: [
    { name: 'version', value: appInfo.version },
    { name: 'build_time', value: new Date() },
  ],
});
