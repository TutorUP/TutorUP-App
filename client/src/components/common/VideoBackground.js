import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import Img1 from '../../images/background-1.png';
import Img2 from '../../images/background-2.png';
import Img3 from '../../images/background-3.png';
import Img4 from '../../images/background-4.png';
import Img5 from '../../images/background-5.png';
import Img6 from '../../images/background-6.png';
import Img7 from '../../images/background-7.png';
import Img8 from '../../images/background-8.png';
import Img1v from '../../images/background-1-v.png';
import Img2v from '../../images/background-2-v.png';
import Img3v from '../../images/background-3-v.png';
import Img4v from '../../images/background-4-v.png';
import Img5v from '../../images/background-5-v.png';
import Img6v from '../../images/background-6-v.png';
import Img7v from '../../images/background-7-v.png';
import Img8v from '../../images/background-8-v.png';
import Logo from '../../images/background-logo.png';
import '../layout/layout.css';

class VideoBackground extends Component {

  state = {
    resizeNotifier: () => {},
  }

  render() {
    // horizontal versions of images
    const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];
    var image = images[Math.floor(Math.random()*images.length)];

    // vertical versions of images
    const imagesV = [Img1v, Img2v, Img3v, Img4v, Img5v, Img6v, Img7v, Img8v];
    var imageV = imagesV[Math.floor(Math.random()*imagesV.length)];

    return (
        <div>
          <div id="bg">
            <img src={image} id="iamge-h" alt="" />
            <img src={imageV} id="image-v" alt="" />
          </div>
          <div className="centered">
            <img src={Logo} className="logo-width" alt="logo" />
            <div>
              <Button aria-label="Cancel" fullWidth variant="outlined" align="center" className="Button startButton" component={Link} to="/login">
                  click here to get started!
              </Button>
            </div>
          </div>
        </div>
    );
  }
}

export default VideoBackground;
