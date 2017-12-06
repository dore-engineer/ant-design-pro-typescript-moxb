import * as React from 'react';
import './App.css';
import { inject, observer } from "mobx-react";

const logo = require('./logo.svg');

@inject('userStore', 'commonStore')
@observer
class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
