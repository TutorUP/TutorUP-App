import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },


})

class CreateProfile extends Component {
 state = {
     handle: '',
     bio: '',
     classes: '',
     errors: {}
 }

 onSubmit = e => {
     e.preventDefault();

     const profileData = {

     }

 }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={1}>
                    <Typography variant="h4" component="h1">
                        Create Your Profile
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add some information to make you stand out
                    </Typography>
                </Paper>
            </Grid>
        </Grid>

        
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,

})

export default connect(null)(withStyles(styles)(CreateProfile));
