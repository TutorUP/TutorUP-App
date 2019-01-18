import React from 'react';
import PropTypes from 'prop-types';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const NotificationPopUp = ({
  open,
  handleClose,
  message
}) => {
  return (
    <React.Fragment>
        <Snackbar
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
  
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="secondary"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
        />
      
    </React.Fragment>
  );
}

NotificationPopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default NotificationPopUp;
