import React, { Component } from 'react';
import Cover from 'react-video-cover';

const style = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  zIndex: -1,
};

class VideoBackground extends Component {

  state = {
    resizeNotifier: () => {},
  }

  render() {
    const videoOptions = {
      src: 'https://www.up.edu/_files/video/bestofclip2-15-sm-library-romanaggi-yoga.mp4',
      autoPlay: true,
      muted: true,
      loop: true,
    };

    return (
        <div style={style} >
          <Cover
            videoOptions={videoOptions}
            remeasureOnWindowResize
            getResizeNotifier={resizeNotifier => {
              this.setState({
                resizeNotifier,
              });
            }}
          />
        </div>
    );
  }
}

export default VideoBackground;