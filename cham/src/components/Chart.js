import React, { Component } from 'react';
import {
  AreaChart, cardinal, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, Legend
} from 'recharts';
import moment from 'moment';
import {
  BrowserView,
  MobileView,
  isMobile,
  isTablet,
  isLandscape,
  deviceType
} from "react-device-detect";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatandFilterTime = this.formatandFilterTime.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.randomData = this.randomData.bind(this);
  }

  randomData (useFilter) {
    let testData = [], count = 0, label = [];
    let rand = () => Math.floor(Math.random() * (35)) + 65;
    let generatePoints = (unit) => {
      switch (unit) {
        case 'day':
          count = 23;
          label = [
            '0:00', '1:00', '2:00', '3:00', '4:00', '5:00',
            '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00', '23:00'
          ];
          break;
        case 'week':
          count = 7;
          label = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
          ];
          break;
        case 'month':
          count = 30;
          for (let j = 1; j <= count; j++) {
            label.push('May ' + j)
          }
          break;
        case 'year':
          count = 12;
          label = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          break;
        case 'hour':
        default:
          count = 60;
          for (let k = 0; k < count; k++) {
            if (k < 10) label.push(':0' + k)
            else label.push(':' + k);
          }
          break;
      }
      for (let i = 0; i < count; i++) {
        testData.push({
          name: label[ i ],
          Temp: rand(),
          Humid: rand(),
          Light: Math.floor(Math.random() * (100))
        });
      }
    }
    generatePoints(useFilter);
    return testData;
  }

  prepareData (useFilter) {
    const data = this.props.data
    var chartData = []
    if (data && data.length > 0) {
      chartData = this.formatandFilterTime(data, useFilter)
    } else {
      chartData = this.randomData(useFilter)
    }
    return chartData
  }

  formatandFilterTime (data, unit) {
    let start;
    let filteredData = [];
    var timeFormat = {
      'hour': { timestamp: "HH:mm", start: moment().subtract(1, 'hour').toISOString() },
      'day': { timestamp: "HH:mm", start: moment().subtract(1, 'day').toISOString() },
      'week': { timestamp: "ddd", start: moment().subtract(1, 'week').toISOString() },
      'month': { timestamp: "MMM DD", start: moment().subtract(1, 'month').toISOString() },
      'year': { timestamp: "MMM YYYY", start: moment().subtract(1, 'year').toISOString() }
    }
    start = timeFormat[ unit ] ? timeFormat[ unit ].start : timeFormat[ 'hour' ].start
    data.forEach(ele => {
      if (moment(new Date(ele.timestamp)).isAfter(start)) {
        // TODO - format and "thin" data series for unit
        filteredData.push({
          name: moment(new Date(ele.timestamp)).format(timeFormat[ unit ].timestamp),
          Temp: ele.temperature,
          Humid: ele.humidity,
          Light: ele.light || 0
        })
      }
    });

    return filteredData;
  }

  render () {
    let chartWidth = 1000;
    if (isMobile && isLandscape) {
      chartWidth = 500;
    } else if (isMobile) {
      chartWidth = 350;
    } else if (isTablet) {
      chartWidth = 800;
    }
    return (
      <div style={{display: 'inline-block'}}>
        <h3>{this.props.realData} TEMPERATURE (F) AND HUMIDITY (%)</h3>
        <BrowserView>
          <AreaChart width={chartWidth} height={250} data={this.prepareData(this.props.filter)}
            margin={{ top: 10, right: 10, left: 40, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type='monotone' dataKey='Temp' stroke='#13ffed' fill='#13ffed' fillOpacity={0.3} activeDot={{ r: 8 }} />
            <Area type={cardinal} dataKey='Humid' stroke='#351b69' fill='#351b69' fillOpacity={0.3} activeDot={{ r: 8 }} />
            <Area type={cardinal} dataKey='Light' stroke='#ccc' fill='#ccc' fillOpacity={0.3} activeDot={{ r: 8 }} />
          </AreaChart>
        </BrowserView>
        <MobileView>
          <AreaChart width={chartWidth} height={250} data={this.prepareData(this.props.filter)}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type='monotone' dataKey='Temp' stroke='#13ffed' fill='#13ffed' fillOpacity={0.3} activeDot={{ r: 8 }} />
            <Area type={cardinal} dataKey='Humid' stroke='#351b69' fill='#351b69' fillOpacity={0.3} activeDot={{ r: 8 }} />
            <Area type={cardinal} dataKey='Light' stroke='#ccc' fill='#ccc' fillOpacity={0.3} activeDot={{ r: 8 }} />
          </AreaChart>
        </MobileView>
        <div style={{display:'none'}}>{deviceType.toUpperCase()}</div>
      </div>
    )
  }
}

export default Chart;

