import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'moment/locale/vi';
import './g2';
import browserHistory from 'history/createBrowserHistory';
import './index.less';
import router from './router';

ReactDOM.render(
    router(browserHistory()),
    document.getElementById('root')
);
