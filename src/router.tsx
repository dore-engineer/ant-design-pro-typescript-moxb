import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';

import browserHistory from 'history/createBrowserHistory';

class App extends React.Component<any, any> {

  getRouteData(navData, path): any {
    if (!navData.some(item => item.layout === path) ||
      !(navData.filter(item => item.layout === path)[0].children)) {
      return null;
    }
    const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
    return getPlainNode(route.children);
  }

  getLayout(navData, path) {
    if (!navData.some(item => item.layout === path) ||
      !(navData.filter(item => item.layout === path)[0].children)) {
      return null;
    }
    const route = navData.filter(item => item.layout === path)[0];
    return {
      component: route.component,
      layout: route.layout,
      name: route.name,
      path: route.path,
    };
  }

  render() {
    const navData = getNavData();
    const UserLayout = this.getLayout(navData, 'UserLayout').component;
    const BasicLayout = this.getLayout(navData, 'BasicLayout').component;
    const history = browserHistory();

    const passProps = {
      navData,
      getRouteData: (path) => {
        return this.getRouteData(navData, path);
      },
    };

    return (
      <LocaleProvider locale={enUS}>
        <Router history={history}>
          <Switch>
            <Route path="/user" render={props => <UserLayout {...props} {...passProps} />}/>
            <Route path="/" render={props => <BasicLayout {...props} {...passProps} />}/>
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default App;
