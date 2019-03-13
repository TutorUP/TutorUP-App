import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../client-config';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ConfirmImg from '../../images/confirmed-text.jpg';

class UserConfirm extends Component {
    componentDidMount = () => {
        const { id } = this.props.match.params;
        fetch(`${API_URL}/email/confirm/${id}`)
        .then(res => res.json())
        .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="padding20">
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={8} md={6}>
                        <Paper>
                        <Card component={Link} to={'/login'}>
                                <CardMedia
                                  component="img"
                                  alt="account confirmed"
                                  height="auto"
                                  image={ConfirmImg}
                                />
                        </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default UserConfirm;
