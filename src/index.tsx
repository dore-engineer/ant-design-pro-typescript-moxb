import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'moment/locale/vi';
import './g2';
import { Provider } from 'mobx-react';
import { rootStores } from './stores';
import './index.less';
import App from './router';

ReactDOM.render(
  <Provider {...rootStores}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
