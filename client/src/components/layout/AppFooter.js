import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    footer: {
        backgroundColor: '#3f51b5',
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
      },

})

function AppFooter(props) {
const { classes } = props;
  return (
    <React.Fragment>
        <footer className={classes.footer}>
            <Typography variant="h3" align="center" gutterBottom>
            TutorUP <img src="https://img.icons8.com/doodle/50/000000/books.png" />
            </Typography>

            <Typography variant="subtitle1" align="center" component="p">
            <a href="https://icons8.com/icon/81348/books">Books icon by Icons8</a> <br/> Capstone 2019
            </Typography>
      </footer>
      
    </React.Fragment>
  )
}

export default withStyles(styles)(AppFooter);
