import React from 'react';
import 'LiveStream.css';

var LiveStream = React.createClass({
  getInitialState: function(){
    return { videoSrc: 'http://10.0.0.22:3002/stream.mjpg'}
  },
  componentDidMount: function(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
    }
  },
  handleVideo: function(stream) {
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({ videoSrc: window.URL.createObjectURL(stream) });
  },
  videoError: function() {

  },
  render: function() {
	  return <div>
	    <div className={'img_container'}>
        <h3>Livestream</h3>
      </div>
      <div>  
        <img className={'img_video'} src={this.state.videoSrc} autoPlay="true"  alt="livestream" id="videoElement" ref="video"/>
      </div>
    </div>;
    }
});

export default LiveStream;
