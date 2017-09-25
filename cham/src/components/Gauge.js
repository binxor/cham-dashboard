import React, { Component } from 'react';
import 'Gauge.css';

class Gauge extends Component {
    constructor(props) {
      super(props);
      this.state={
        turnVal: Math.max(Math.min(this.props.value/200,0.5),0),
        top: this.props.top*35 + '%',
        left: this.props.left*25 + '%',
        outOfRange: (this.props.value > 100 || this.props.value < 0)
      }
    }
    render() {
        const color = `${this.state.outOfRange ? 'red' : this.props.color}`;
        const meter = { 
            transform: `rotate(${this.state.turnVal}turn)`,
            backgroundColor: color
        };
        const fontColor = {
            color: `${this.state.outOfRange ? "red" : "white"}`
        }
        const topAndLeft = {
            top: `${this.state.top}`,
            left: `${this.state.left}`
        };
        const unitSize = {
            fontSize: 0.8 +'em'
        };
      return (
        <div>
          <div className="container" style={topAndLeft}>
            <div className="gauge-a"></div>
            <div className="gauge-b"></div>
            <div className="gauge-c" style={meter}></div>
            <div className="gauge-data">
              <h1 id="percent" style={fontColor}>
                  {this.props.value}
                  <span style={unitSize}>{this.props.unit}</span>
              </h1>
            </div>
            <h1 id="title" className="gauge-title" 
              style={fontColor}>{this.props.title}</h1>
          </div>
        </div>
      )
    }
}

export default Gauge;