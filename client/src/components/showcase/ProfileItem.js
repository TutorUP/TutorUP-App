import React from 'react';
import PropTypes from 'prop-types';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
    const { classes, profile } = props;

    return (
    <React.Fragment>
        <Card className={classes.card}>
            <CardContent>
                <Typography>
                    {profile.handle} {profile.status}
                </Typography>
            </CardContent>
            <CardContent>
              {profile.classes.slice(0, 4).map((myClass, index) => (
                <List key={index}>
                    <ListItemText primary={myClass} />
                </List>
              ))}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View Profile
                </Button>
            </CardActions>
        </Card>
    </React.Fragment>
  );
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileItem);
