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
      overlayVisible: false,
      metrics: {
        temp: {val:68,unit:"F",title:"Temperature"},
        humid: {val:85,unit:"%",title:"Humidity"},
        light: {val:85,unit:"%",title:"Light"},
        time: {val:moment().format("HH:mm"),unit:'',title:"Time"}
      }
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
        <Overlay visible={this.state.overlayVisible} metrics={this.state.metrics}/>
        <div className="App-header">
          <Card className="card col-sm-4" data={this.state.metrics.temp}/>
          <Card className="card col-sm-4" data={this.state.metrics.humid}/>
          <Card className="card col-sm-4" data={this.state.metrics.time} />
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
