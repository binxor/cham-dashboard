import React, { Component } from 'react';
import 'Card.css';
import FetchData from 'FetchData.js';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
        detailsVisible: false
    };

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails = function(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState((prevState) => ({ 
      detailsVisible: !prevState.detailsVisible 
    }));

  }

  render() {
    const unitSize = {
      fontSize: 0.8 +'em'
    };
    const extend = {
      height: 100 + 'px',
      padding: 10 + 'px',
      background: 'black',
      position: 'absolute',
      width: 100 + '%',
      zIndex: 1000
    };
    return (
      <div className={"Card " + this.props.className} onClick={this.showDetails}>
        <div><h3>{this.props.data.title}</h3></div>
        <div>
          <h1 className='em0p5'>{this.props.data.val}
            <span style={unitSize}>{this.props.data.unit}</span>
          </h1>
        </div>
        {!this.state.detailsVisible && 'Detail'}
          {this.state.detailsVisible && (
            <div style={extend}>
            <FetchData name={this.props.data.title} currentVal={this.props.data.val} params={this.props.params}/>
          </div>
         )}
        
      </div>
    )
  }        
}

export default Card;
