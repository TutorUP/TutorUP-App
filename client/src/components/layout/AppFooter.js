import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
      },

})

function AppFooter(props) {
const { classes } = props;
  return (
    <React.Fragment>
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
            TutorUP
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Capstone 2019
            </Typography>
      </footer>
      
    </React.Fragment>
  )
}

export default withStyles(styles)(AppFooter);
