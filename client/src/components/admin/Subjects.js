import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  createProfile,
  getCurrentProfile,
} from "../../redux/actions/profileActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ViewSubjects from "../../images/view-subjects.jpg";
import EditSubjects from "../../images/edit-subjects.jpg";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    minWidth: 300,
    margin: 100,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  purpleHeader: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#1E1656",
  },
  purpleText: {
    color: "#1E1656",
  },
  media: {
    objectFit: "cover",
  },
});

class Subjects extends Component {
  // on cancel go back to dashboard to eliminate need for extra button
  render() {
    const { classes } = this.props;

    return (
      <div className="padding20">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className="editHeading"
        >
          Subjects
        </Typography>
        <Grid container justify="center" spacing={24}>
          <Grid item xs={12}>
            <div className="courses" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.card}>
              <CardActionArea component={Link} to={"/view-subjects"}>
                <CardMedia
                  component="img"
                  alt="tutoring"
                  className={classes.media}
                  height="140"
                  image={ViewSubjects}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.card}>
              <CardActionArea component={Link} to={"/edit-subjects"}>
                <CardMedia
                  component="img"
                  alt="create and edit subjects"
                  className={classes.media}
                  height="140"
                  image={EditSubjects}
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Subjects.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(withStyles(styles)(Subjects)));
