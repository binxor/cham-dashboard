import React, { Component } from 'react';
import { AreaChart, cardinal, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, Legend } from 'recharts';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var rand = function() {
      return Math.floor(Math.random() * (35)) + 65;
    }
    const data = [
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
    ];


    return (
      <div style={{}}>
        <h3>TEMPERATURE (F) AND HUMIDITY (%)</h3>
        <AreaChart width={700} height={250} data={data}
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

