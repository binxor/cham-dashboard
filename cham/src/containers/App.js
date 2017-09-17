import React, { Component } from 'react';
import logo from 'logo.svg';
import moment from 'moment';
import 'App.css';
import Card from 'Card.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="row">
          <Card title="Temperature" value="67" unit="f" />
          <Card title="Humidity" value="89" unit="%" />
          <Card title="Time" value={moment().format("HH:mm")} />
        </div>
      </div>
    );
  }
}

export default App;
