import React, { Component } from 'react';
import { AreaChart, cardinal, XAxis, YAxis,
  CartesianGrid, Tooltip, Area } from 'recharts';

class Chart extends Component {
  render() {
    const data = [
      {name: '0:00', Temp: 75, Humid: 60, amt: 2400},
      {name: '1:00', Temp: 76, Humid: 68, amt: 2210},
      {name: '2:00', Temp: 83, Humid: 84, amt: 2290},
      {name: '3:00', Temp: 82, Humid: 92, amt: 2000},
      {name: '4:00', Temp: 80, Humid: 93, amt: 2181},
      {name: '5:00', Temp: 77, Humid: 90, amt: 2500},
      {name: '6:00', Temp: 76, Humid: 82, amt: 2100},
      {name: '7:00', Temp: 77, Humid: 90, amt: 2100},
      {name: '8:00', Temp: 80, Humid: 92, amt: 2100},
      {name: '9:00', Temp: 76, Humid: 89, amt: 2100},
      {name: '10:00', Temp: 70, Humid: 82, amt: 2100},
      {name: '11:00', Temp: 72, Humid: 80, amt: 2100},
      {name: '12:00', Temp: 70, Humid: 84, amt: 2100},
      {name: '13:00', Temp: 76, Humid: 88, amt: 2100},
    ];
    return (
      <div style={{border:'solid green 1px'}}>
        <h3>CHART GOES HERE</h3>
        <AreaChart width={700} height={250} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Area type='monotone' dataKey='Temp' stroke='#8884d8' fill='#8884d8' fillOpacity={0.3}/>
          <Area type={cardinal} dataKey='Humid' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.3}/>
        </AreaChart>
     
      </div>
    )
  }        
}

export default Chart;

