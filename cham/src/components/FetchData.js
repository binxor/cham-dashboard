import React from 'react';
import axios from 'axios';

class FetchData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/data/params')
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    render() {
        return (
            <div>
                {this.state.data.map(d => { 
                    if(d.name.toLowerCase() === this.props.name.toLowerCase()) {
                      return  <span key={d.id} id={d.name}>{d.min} - {d.max}</span>
                    } else {
                        return '';
                    }
                })}
            </div>
        )
    }
}

export default FetchData;