import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class FetchData extends React.Component {
    constructor(props) {
        super(props);

        this.state = { };

        this.buildLabel = function(min, max) {
            let labelObj = {};
            labelObj[min] = min;
            labelObj[max] = max;
            return labelObj;
        }
    }

    render() {
        function showMessage(min, max, val) {
            if(val < min) {
                return <p style={{color: 'magenta'}}> Out of Range! </p>
            } else if(val > max) {
                return <p style={{color: 'orange'}}> Out of Range! </p>
            } else {
                return <p style={{color: 'yellowGreen'}}> In Range </p>
            }

        }
        return (
            <div>
                {this.props.params.map(d => { 
                    if(d.name.toLowerCase() === this.props.name.toLowerCase()) {
                      return    <span key={d.id} id={d.name}>
                                    {showMessage(d.min, d.max, this.props.currentVal)}
                                    <Slider value={this.props.currentVal} 
                                        orientation="horizontal" 
                                        min={d.min}
                                        max={d.max}
                                        labels={this.buildLabel(d.min,d.max)}           
                                        handleLabel={this.props.currentVal.toString()}
                                        tooltip={true}
                                    />
                                </span>
                    } else {
                        return '';
                    }
                })}
            </div>
        )
    }
}

export default FetchData;