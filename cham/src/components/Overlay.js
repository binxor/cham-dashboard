import React, { Component } from 'react';
import 'Overlay.css';
import Gauge from 'Gauge.js';

class Overlay extends Component {
    render() {
      if(!this.props.visible) {
        return null
      }
      return (
        <div id="overlay">
          <div id="overlay-content">
            <Gauge data={this.props.metrics.temp}  
              color="#13ffed" top="1" left="1" />
            <Gauge data={this.props.metrics.humid} 
              color="#351b69" top="1" left="3" />
            <Gauge data={this.props.metrics.light} 
              color="#ccc" top="2" left="2" />
          </div>
        </div>
      )
    }
}

export default Overlay;