// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
// const context = require.context('./', false, /\.js$/);
// const keys = context.keys().filter(item => item !== './index.js');

import user from './user';
import common from './common';
import chart from './chart';
import monitor from './monitor';
import login from './login';
import register from './register';
import auth from './auth';
import router from './router';

export const rootStores = {
  user,
  common,
  chart,
  monitor,
  login,
  register,
  auth,
  router
};
export const Keys = {
  user: 'user',
  common: 'common',
  chart: 'chart',
  monitor: 'monitor',
  login: 'login',
  register: 'register',
  auth: 'auth',
  router: 'router'
};