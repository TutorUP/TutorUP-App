import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccessibilityIcon from '@material-ui/icons/AccessibilityNew';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Img1 from '../../images/about-1.png';
import Img2 from '../../images/about-2.png';
import Img3 from '../../images/about-3.png';


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
            <div className="padding20 about-img">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="h3" align="center">
                    Tutor UP is a peer tutoring network for University of Portland.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" className="m15"/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" align="left" gutterBottom>
                    Accessibility.    
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    Tutor UP was created with accessibility in mind. Our goal is to make academic aid more accessible for students.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="box">
                  <Card className="img-card">
                      <CardMedia
                        component="img"
                        alt="edit profile"
                        className={classes.media}
                        height="200"
                        image={Img1}
                      />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} className="box">
                  <Card className="img-card">
                      <CardMedia
                        component="img"
                        alt="edit profile"
                        className={classes.media}
                        height="200"
                        image={Img2}
                      />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" align="right" gutterBottom>
                    Simplicity.
                  </Typography>
                  <Typography variant="subtitle1" align="right">
                    No account is needed to find a tutor! Simply navigate to the search page to begin finding assistance!
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" align="left" gutterBottom>
                    Diversity.    
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    This online platform allows students to find tutors in a more diverse range of subjects than is offered through on-campus programs.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="box">
                  <Card className="img-card">
                      <CardMedia
                        component="img"
                        alt="edit profile"
                        className={classes.media}
                        height="200"
                        image={Img3}
                      />
                    </Card>
                </Grid>
              </Grid>
            </div>
        );    
  }
}

About.propTypes = {
    classes: PropTypes.object.isRequired    
}

export default (withStyles(styles)(About));
