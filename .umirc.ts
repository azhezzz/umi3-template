import { defineConfig } from 'umi';
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) =>
  path.resolve(appDirectory, relativePath);
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const appInfo = JSON.parse(fs.readFileSync(resolveApp('package.json')));

const routes = [
  { exact: true, path: '/', redirect: '/user/login' },
  { name: '登录页', path: '/user/login', component: '@/pages/User/Login' },
  { name: '404', path: '/NotFound', component: '@/pages/Exception404' },
  { path: '*', redirect: '/NotFound' },
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
  chainWebpack(config, { _webpack }) {
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
