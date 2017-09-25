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
            <Gauge title="Temperature" value="80.5" unit="F" 
              color="#13ffed" top="1" left="1" />
            <Gauge title="Humidity" value="92.0" unit="%" 
              color="#351b69" top="1" left="3" />
            <Gauge title="Light" value="30" unit="%"
              color="#ccc" top="2" left="2" />
          </div>
        </div>
      )
    }
}

export default Overlay;