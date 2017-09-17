import React, { Component } from 'react';
import 'Card.css';

class Card extends Component {
  render() {
    return (
      <div className={"Card " + this.props.className}>
        <div><h3>{this.props.title}</h3></div>
        <div><h1>{this.props.value} {this.props.unit}</h1></div>
      </div>
    )
  }        
}

export default Card;
