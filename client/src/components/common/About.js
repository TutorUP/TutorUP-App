import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Img1 from '../../images/about-1.png';
import Img2 from '../../images/about-2.png';
import Img3 from '../../images/about-3.png';
import '../profile/profile.css';


import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
     media: {
        objectFit: 'cover',
     },
});


class About extends Component {

    render() {

        const { classes } = this.props;
      
        return (
            <div className="padding20">
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Tutor UP is a peer tutoring network for University of Portland.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" className="m15"/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h5"  gutterBottom>
                    Accessibility.    
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Tutor UP was created with accessibility in mind. Our goal is to make academic aid more accessible for students.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h5" gutterBottom>
                    Simplicity.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    No account is needed to find a tutor! Simply navigate to the search page to begin finding assistance!
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h5" gutterBottom>
                    Diversity.    
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    This online platform allows students to find tutors in a more diverse range of subjects than is offered through on-campus programs.
                  </Typography>
                </Grid>
            </div>
        );    
  }
}

About.propTypes = {
    classes: PropTypes.object.isRequired    
}

export default (withStyles(styles)(About));
