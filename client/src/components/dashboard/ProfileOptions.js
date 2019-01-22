import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ProfileOptions = () => (
    <Grid justify="center" alignItems="center">
        <Button size="large" color="primary" component={Link} to="/edit-profile">
            Edit Profile
        </Button>
    </Grid>
)

export default ProfileOptions;