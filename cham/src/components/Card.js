import React, { Component } from 'react';
import 'Card.css';

class Card extends Component {
  render() {
    const unitSize = {
      fontSize: 0.8 +'em'
    };
    return (
      <div className={"Card " + this.props.className}>
        <div><h3>{this.props.data.title}</h3></div>
        <div><h1>{this.props.data.val}
          <span style={unitSize}>{this.props.data.unit}</span>
        </h1></div>
      </div>
    )
  }        
}

export default Card;
