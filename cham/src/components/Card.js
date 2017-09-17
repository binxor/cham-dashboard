import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <div>{this.props.title}</div>
        <div>{this.props.value} {this.props.unit}</div>
      </div>
    )
  }        
}

export default Card;
