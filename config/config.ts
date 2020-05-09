/* eslint-disable */
import { defineConfig } from 'umi';
import routes from './routes';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) =>
  path.resolve(appDirectory, relativePath);
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const appInfo = JSON.parse(fs.readFileSync(resolveApp('package.json')));

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  dva: { immer: true, hmr: true },
  antd: { dark: true, compact: true },
  theme: {
    'primary-color': '#fec400', // 全局主色
  },
  routes,
  metas: [
    //@ts-ignore
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
  chainWebpack(config, { webpack }) {
    process.env.ESLINT_CHECK === 'true' &&
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
