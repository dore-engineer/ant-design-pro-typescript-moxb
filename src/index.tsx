import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'moment/locale/vi';
import './g2';
import { Provider } from 'mobx-react';
import { rootStores } from './stores';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import './index.less';
import App from './router';
const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, rootStores.router);

ReactDOM.render(
  <Provider {...rootStores}>
    <Router history={history}>
    <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
