import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      activeId: null,
      activeVal: ''
    };
  }

  componentWillMount () {
    this.setState({ activeVal: this.props.filter[ this.props.activeButtonIndex ].value })
    this.setState({ activeId: this.props.activeButtonIndex });
  }

  onChange (val) {
    this.setState({ activeVal: val });
    this.setState({ activeId: this.props.activeButtonIndex });
    this.props.callbackParent(val)
  }
  render = () => {
    return (
        <ToggleButtonGroup name={this.props.name} onChange={this.onChange} 
        value={this.state.activeVal}
          >
          {this.props.filter.map((el, index) =>
            <ToggleButton bsStyle="primary" bsSize="lg"
              name={el.name} value={el.value} key={index}
              >
              {el.name}
            </ToggleButton>
          )
          }
        </ToggleButtonGroup>
    );
  }
}

export default ButtonBar;