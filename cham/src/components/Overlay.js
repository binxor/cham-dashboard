import React, { Component } from 'react';
import 'Overlay.css';

class Overlay extends Component {
    render() {
      if(!this.props.visible) {
        return null
      }
      return (
        <div id="overlay">
          <div id="overlay-content">
              Overlay
          </div>
        </div>
      )
    }
}

export default Overlay;