// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
// const context = require.context('./', false, /\.js$/);
// const keys = context.keys().filter(item => item !== './index.js');

import { User } from './user';
import { Global } from './global';

export const rootStores = {
  user: new User(),
  global: new Global()
};
