import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'App.css';
import ButtonBar from 'ButtonBar.js';
import Card from 'Card.js';
import Chart from 'Chart.js';
// import LiveStream from 'LiveStream.js';
import { deviceType } from "react-device-detect";
var constants = require('../../config/config.js');

function setReadings (readings) {
  return function update (state) {
    return {
      metrics: {
        temp: {
          val: readings.temperature,
          unit: state.metrics.temp.unit,
          title: state.metrics.temp.title,
        },
        humid: {
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

function setChartData (data) {
  return function update (state) {
    return {
      chartData: data,
      isActualData: "ACTUAL"
    }
  }
}

function setParams (params) {
  return function update (state) {
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
        temp: { val: "--", unit: "F", title: "Temp", titleMobile: "T" },
        humid: { val: "--", unit: "%", title: "Humidity", titleMobile: "H" },
        light: { val: "--", unit: "%", title: "Light", titleMobile: "L" },
        time: { val: moment().format("HH:mm"), unit: '', title: "Time", titleMobile: "" }
      },
      params: [],
      isActualData: "DEMO",
      chartFilter: "year",
      buttonBarVal: '', //returned from buttonbar component
      activeButtonIndex: 0,
      buttonBarOptions: [
        { name: 'Hour', value: 'hour' },
        { name: 'Day', value: 'day' },
        { name: 'Week', value: 'week' },
        { name: 'Month', value: 'month' },
        { name: 'Year', value: 'year' }
      ]
    };

    this.onButtonBarChanged = this.onButtonBarChanged.bind(this);
  }

  componentDidMount () {
    var bIndex = this.state.activeButtonIndex;
    this.onButtonBarChanged(this.state.buttonBarOptions[ bIndex ].value)
    var domain = constants[ constants.devOrProd ].server.ip
    var url =
    {
      params: 'http://' + domain + ':3001/data/params',
      data: 'http://' + domain + ':3001/data/readings'
    }
    axios.get(url.params)
      .then(res => {
        const params = res.data;
        this.setState(setParams(params))
      })
    axios.get(url.data)
      .then(res => {
        const readings = res.data;
        this.setState(setChartData(readings))
        const lastReading = readings.slice(-1)[ 0 ];
        this.setState(setReadings(lastReading))
      })
  }

  onButtonBarChanged (newState) {
    this.setState({ buttonBarVal: newState })
  }

  render () {
    let displayChart = deviceType.toUpperCase() === "MOBILE" ? "none" : "inline-block";;
    return (
      <div className="App">
        <div className="App-header row">
          <Card className="card col-sm-4 col-xs-4" data={this.state.metrics.temp} params={this.state.params} />
          <Card className="card col-sm-4 col-xs-4" data={this.state.metrics.humid} params={this.state.params} />
          <Card className="card col-sm-4 col-xs-4" data={this.state.metrics.time} />
        </div>
        
      	{ /* <div>
	        <LiveStream />
	      </div> */}
        
        <div className="ChartArea" style={{display: displayChart}}>
          <Chart data={this.state.chartData}
            realData={this.state.isActualData}
            filter={this.state.buttonBarVal} />
        </div>

        <div className="App-intro" style={{display: displayChart}}>
          <ButtonBar name="ChartFilter"
            activeButtonIndex={this.state.activeButtonIndex}
            filter={this.state.buttonBarOptions}
            callbackParent={this.onButtonBarChanged} />
        </div>

      </div>
    );
  }
}

export default App;
