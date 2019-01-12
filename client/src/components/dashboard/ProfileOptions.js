import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const ProfileOptions = () => (
    <Grid justify="center" alignItems="center">
        <Typography variant="h2" gutterBottom>
            <Link to='/edit-profile'> Edit Profile</Link>
        </Typography>
        <Typography variant="h2" gutterBottom>
            <Link to='/add-availability'> Add Availability</Link>
        </Typography>
    </Grid>
)

export default ProfileOptions;