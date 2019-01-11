import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import VideoBackground from '../common/VideoBackground';

const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    appBar: {
      position: 'relative',
    },
    toolbarTitle: {
      flex: 1,
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
        width: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing.unit * 2,
      },
    },
    footer: {
      marginTop: theme.spacing.unit * 8,
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit * 6}px 0`,
    },
  });


// const tiers = [
//     {
//       title: 'Free',
//       price: '0',
//       description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
//       buttonText: 'Sign up for free',
//       buttonVariant: 'outlined',
//     },
//     {
//       title: 'Pro',
//       subheader: 'Most popular',
//       price: '15',
//       description: [
//         '20 users included',
//         '10 GB of storage',
//         'Help center access',
//         'Priority email support',
//       ],
//       buttonText: 'Get started',
//       buttonVariant: 'contained',
//     },
//     {
//       title: 'Enterprise',
//       price: '30',
//       description: [
//         '50 users included',
//         '30 GB of storage',
//         'Help center access',
//         'Phone & email support',
//       ],
//       buttonText: 'Contact us',
//       buttonVariant: 'outlined',
//     },
    
// ];

const AppLanding= props => {
  const { classes } = props;
  return (
    <React.Fragment>
        {/* <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid> */}
        <VideoBackground />
    </React.Fragment>
  )
}

AppLanding.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppLanding);
