import React, { Component } from 'react';
import { AreaChart, cardinal, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, Legend } from 'recharts';
import moment from 'moment';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.filterForTime = this.filterForTime.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }

  prepareData() {
    const data = this.props.data
    var resolution = this.props.filter
    var timeScaleFormats = {
      'minute': "HH:mm:ss",
      'day':    "HH:mm",
      'week':   "MMM DD",
      'month':  "MMM DD",
      'year':   "MMM YYYY",
      'default':  "HH:mm:ss"
    }
    var rand = function() {
      return Math.floor(Math.random() * (35)) + 65;
    }
    const test = [
      {name: '0:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '1:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '2:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '3:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '4:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '5:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '6:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '7:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '8:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '9:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '10:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '11:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '12:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '13:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '14:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '15:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '16:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '17:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '18:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '19:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '20:00', Temp: rand(), Humid: rand(), Light: 100},
      {name: '21:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '22:00', Temp: rand(), Humid: rand(), Light: 0},
      {name: '23:00', Temp: rand(), Humid: rand(), Light: 0},
    ]
    var chartData = []
    if(data){
      var filteredData = this.filterForTime(data, resolution)
      filteredData.map(ele => {
        //TODO -- change time axis labels for 'day', 'week', 'month', 'forever'
        if (moment(ele.timestamp).isSame(moment(),resolution)) {
          var format = (timeScaleFormats[resolution] ? timeScaleFormats[resolution] : timeScaleFormats["default"])
          chartData.push( {
            name: moment(ele.timestamp).format(format),
            Temp: ele.temperature,
            Humid: ele.humidity,
            Light: 0
          })
        } 
        return null
      })
    } else {
      return test
    }
    
    return chartData
  }

  filterForTime(data, resolution) {
    var filterData = []
    var hops = {
      'minute': "second",
      'day':    "hour",
      'week':   "day",
      'month':  "day",
      'year':   "month",
      'default':  "second"
    }
    //get first in series from resolution
    var startTime = moment().subtract(1,resolution)
    var startIndex = -1
    for(var t=0; t<data.length; t++){
      if(moment(data[t].timestamp).isSameOrAfter(startTime)){
        startIndex = t
        break
      }
    }
    if(startIndex > -1) {
      filterData.push(data[startIndex])
      var nextTimeStamp = moment(data[startIndex].timestamp).add('1',hops[resolution]);
      //LOOP: check if next data value meets time space criteria
      //add if yes, skip if no 
      //check again
      for (var i=startIndex; i<data.length; i++){
        if(moment(data[i].timestamp).isSameOrAfter(nextTimeStamp)){
          filterData.push(data[i])
          nextTimeStamp = moment(data[i].timestamp).add('1',hops[resolution]);
        }
      }
    } 
    return filterData
  }

  render() {
    return (
      <div style={{}}>
        <h3>{this.props.realData} TEMPERATURE (F) AND HUMIDITY (%)</h3>
        <div>THIS {this.props.filter.toUpperCase()}</div>
        <AreaChart width={700} height={250} data={this.prepareData()}
              margin={{top: 10, right: 10, left: 40, bottom: 10}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend/>
          <Area type='monotone' dataKey='Temp' stroke='#13ffed' fill='#13ffed' fillOpacity={0.3} activeDot={{r: 8}}/>
          <Area type={cardinal} dataKey='Humid' stroke='#351b69' fill='#351b69' fillOpacity={0.3} activeDot={{r: 8}}/>
          <Area type={cardinal} dataKey='Light' stroke='#ccc' fill='#ccc' fillOpacity={0.3} activeDot={{r: 8}}/>
        </AreaChart>
        
     
      </div>
    )
  }        
}

export default Chart;

