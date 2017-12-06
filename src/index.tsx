import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'moment/locale/vi';
import './g2';
import './index.less';
import App from './router';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
