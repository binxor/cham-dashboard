import React, { Component } from 'react';
import 'Card.css';
import FetchData from 'FetchData.js';

class Card extends Component {
  render() {
    const unitSize = {
      fontSize: 0.8 +'em'
    };
    return (
      <div className={"Card " + this.props.className}>
        <div><h3>{this.props.data.title}</h3></div>
        <div >
          <h1 className='em0p5'>{this.props.data.val}
            <span style={unitSize}>{this.props.data.unit}</span>
          </h1>
          <FetchData name={this.props.data.title} />
        </div>
      </div>
    )
  }        
}

export default Card;
