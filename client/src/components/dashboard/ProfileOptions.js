import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ProfileOptions = () => (
        <Button color="primary" variant="outlined" component={Link} to="/edit-profile">
            Edit Profile
        </Button>
);

export default ProfileOptions;