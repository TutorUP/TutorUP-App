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
    // https://www.youtube.com/embed/DihKCe4NsSk?controls=0
    // https://www.youtube.com/watch?v=DihKCe4NsSk
    // https://player.vimeo.com/video/313631334
    // https://vimeo.com/313631334
    // https://streamable.com/0nk2j
    // https://streamable.com/s/0nk2j/xkdyz

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