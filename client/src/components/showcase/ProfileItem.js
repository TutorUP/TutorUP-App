import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
};

const ProfileItem = props => {
    const { classes } = props;

    return (
    <React.Fragment>
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterButtom>
                    Name
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View Profile
                </Button>
            </CardActions>
        </Card>
    </React.Fragment>
  )
}

export default ProfileItem;
