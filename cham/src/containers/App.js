import React, { Component } from 'react';
import moment from 'moment';
import 'App.css';
import Card from 'Card.js';
import Chart from 'Chart.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Card className="card col-sm-4" title="Temperature" value="67" unit="F" />
          <Card className="card col-sm-4" title="Humidity" value="89" unit="%" />
          <Card className="card col-sm-4" title="Time" value={moment().format("HH:mm")} />
        </div>
        <p className="App-intro">
          Select an item above to see details
        </p>
        <div className="ChartArea">
          <Chart />
        </div>
      </div>
    );
  }
}

export default App;
