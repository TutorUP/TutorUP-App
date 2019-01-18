import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

const ProgressSpinner = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <LinearProgress className={classes.progress} />
        </React.Fragment>
    );
}

ProgressSpinner.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(ProgressSpinner);
