import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'App.css';
import Card from 'Card.js';
import Chart from 'Chart.js';
import Overlay from 'Overlay.js';

function setReadings(readings) {
  console.log(readings)
  return function update(state){
    return {
      metrics:{
        temp: {
          val: readings.temperature,
          unit: state.metrics.temp.unit,
          title: state.metrics.temp.title,
        },
        humid:  {
          val: readings.humidity,
          unit: state.metrics.humid.unit,
          title: state.metrics.humid.title,
        },
        time: {
          val: moment(readings.timestamp).format("HH:mm"),
          unit: state.metrics.time.unit,
          title: moment(readings.timestamp).format("MM/DD/YYYY")
        }
      }
    }
  }
}

function setParams(params) {
  console.log(params)
  return function update(state) {
    return {
      params: params
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false,
      metrics: {
        temp: {val:"--",unit:"F",title:"Temperature"},
        humid: {val:"--",unit:"%",title:"Humidity"},
        light: {val:"--",unit:"%",title:"Light"},
        time: {val:moment().format("HH:mm"),unit:'',title:"Time"}
      },
      params: []
    };
    this.showOverlay = this.showOverlay.bind(this);
  }

  showOverlay(e) {
    e.preventDefault();
    this.setState((prevState) => ({ 
      overlayVisible: !prevState.overlayVisible 
    }));
  }

  componentDidMount() {
    var domain = location.hostname
    var url =  
        {
            params: 'http://' + domain + ':3001/data/params',
            data:   'http://' + domain + ':3001/data/readings'      
        }
    axios.get(url.params)
        .then(res => {
            const params = res.data;
            this.setState(setParams(params))
        })
    axios.get(url.data)
        .then(res => {
            const readings = res.data;
            const lastReading = readings.slice(-1)[0];
            this.setState(setReadings(lastReading))
        })
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
