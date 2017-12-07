import * as React from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = {Component: AsyncComponent.Component};

    componentWillMount() {

      Nprogress.start();
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component;
          this.setState({Component});
        }).finally(function () {
          Nprogress.done();
        });
      }
    }

    componentWillUnmount(): void {
      Nprogress.done();
    }

    render() {
      const {Component} = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}