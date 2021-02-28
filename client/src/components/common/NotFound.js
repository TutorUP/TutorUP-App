import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import NotFoundImg from "../../images/page-not-found.jpg";

function NotFound() {
  return (
    <div className="padding20">
      <Grid container spacing={24} justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper>
            <Card component={Link} to={"/login"}>
              <CardMedia
                component="img"
                alt="account confirmed"
                height="auto"
                image={NotFoundImg}
              />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;
