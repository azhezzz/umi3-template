import { defineConfig } from 'umi';
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) =>
  path.resolve(appDirectory, relativePath);
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const appInfo = JSON.parse(fs.readFileSync(resolveApp('package.json')));

const routes = [
  { path: '/user/login', component: '@/pages/user/login' },
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

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  dva: { immer: true, hmr: true },
  antd: { dark: true, compact: true },
  routes,
  metas: [
    { name: 'version', value: appInfo.version },
    { name: 'build_time', value: new Date() },
  ],
  links: [
    {
      href:
        'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css',
      rel: 'stylesheet',
    },
  ],
  request: { dataField: 'data' },
  chainWebpack(config, { _webpack }) {
    process.env.CUSTOM_ESLINT === 'true' &&
      config.module
        .rule('lint')
        .test(/.(js|jsx|ts|tsx)$/)
        .pre()
        .include.add(resolveApp('src'))
        .end()
        // Even create named uses (loaders)
        .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options({
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
        });
  },
});
