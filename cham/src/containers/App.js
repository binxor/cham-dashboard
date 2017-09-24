import React, { Component } from 'react';
import moment from 'moment';
import 'App.css';
import Card from 'Card.js';
import Chart from 'Chart.js';
import Overlay from 'Overlay.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false
    };
    this.showOverlay = this.showOverlay.bind(this);
  }

  showOverlay(e) {
    e.preventDefault();
    this.setState((prevState) => ({ 
      overlayVisible: !prevState.overlayVisible 
    }));
  }

  render() {
    return (
      <div className="App" onClick={this.showOverlay}>
        <Overlay visible={this.state.overlayVisible}/>
        <div className="App-header">
          <Card className="card col-sm-4" title="Temperature" value="67" unit="F" />
          <Card className="card col-sm-4" title="Humidity" value="89" unit="%" />
          <Card className="card col-sm-4" title="Time" value={moment().format("HH:mm")} />
        </div>
        <div className="App-intro">
          Select an item above to see details
        </div>
        
        <div className="ChartArea">
          <Chart />
        </div>
      </div>
    );
  }
}

export default App;
