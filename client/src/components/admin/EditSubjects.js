import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  createSubjects,
  getSubjects,
  removeSubject,
} from "../../redux/actions/subjectActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { sortArrByAscending, removeByMatch } from "../../utils/lodashOps";
import _ from "lodash";

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

class EditSubjects extends Component {
  state = {
    subjects: [],
    errors: {},
  };

  componentDidMount() {
    // Get all the subjects when component rendered, to prevent blank fields on reload
    this.props.getSubjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.subjects.subjects) {
      this.setState({
        subjects: sortArrByAscending(nextProps.subjects.subjects, ["name"]),
      });
    }
  }

  addSubject = (e) => {
    // push new subject to the top of the existing list
    let newSubjects = _.concat(
      [{ id: "", name: "", isMajor: "", isMinor: "", isCourse: "" }],
      this.state.subjects
    );
    this.setState((prevState) => ({ subjects: newSubjects }));
  };

  removeSubject = (id) => {
    let subjects = [...this.state.subjects];
    const newSubjects = removeByMatch(subjects, (subject) => {
      return subject.id !== id;
    });

    this.setState({
      subjects: [...newSubjects],
    });

    this.props.removeSubject(id, this.props.history);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const subjectData = {
      subjects: this.state.subjects,
    };

    this.props.createSubjects(subjectData, this.props.history);
  };

  onChange = (e) => {
    const name = e.target.name;
    let subjects = [...this.state.subjects];
    let dashPos = name.indexOf("-");
    let i = name.substring(dashPos + 1);
    let property = name.substring(0, dashPos);

    subjects[i][property] = e.target.value;
    this.setState({ [subjects]: subjects });
  };

  // on cancel go back to dashboard to eliminate need for extra button
  render() {
    const subjectItems = this.state.subjects.map((subject, i) => {
      let id = "id-" + i;
      let name = "name-" + i;
      let isMajor = "isMajor-" + i;
      let isMinor = "isMinor-" + i;
      let isCourse = "isCourse-" + i;

      return (
        <Grid item xs={12} key={i}>
          <Card className="card" elevation={0}>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={4}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor={name}>Subject Name</InputLabel>
                    <Input
                      type="text"
                      id={name}
                      name={name}
                      value={subject.name}
                      fullWidth
                      onChange={this.onChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor={isMajor}>Is Major?</InputLabel>
                    <Select
                      value={subject.isMajor}
                      onChange={this.onChange}
                      variant="outlined"
                      name={isMajor}
                      id={isMajor}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor={isMinor}>Is Minor?</InputLabel>
                    <Select
                      value={subject.isMinor}
                      onChange={this.onChange}
                      variant="outlined"
                      name={isMinor}
                      id={isMinor}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor={isCourse}>Is Course?</InputLabel>
                    <Select
                      value={subject.isCourse}
                      onChange={this.onChange}
                      variant="outlined"
                      name={isCourse}
                      id={isCourse}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    disabled={subject.isCourse !== "Yes"}
                    required={subject.isCourse === "Yes"}
                  >
                    <InputLabel htmlFor={id}>Course ID</InputLabel>
                    <Input
                      type="text"
                      id={id}
                      name={id}
                      value={subject.id}
                      fullWidth
                      onChange={this.onChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={(e) => this.removeSubject(subject.id)}
              >
                Remove Subject
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <div className="padding20">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className="editHeading"
        >
          Create and Edit Subjects
        </Typography>
        <Grid container justify="space-between" spacing={24}>
          <Grid item xs={12}>
            <div className="courses" />
          </Grid>
          <Grid item>
            <Button
              aria-label="Add Subject"
              variant="outlined"
              onClick={this.addSubject}
            >
              Add a Subject
            </Button>
          </Grid>
          <Grid item>
            <Button
              aria-label="Cancel"
              className="margin-right"
              component={Link}
              to="/subjects"
            >
              Cancel
            </Button>
            <Button
              aria-label="Save"
              type="submit"
              variant="outlined"
              onClick={this.onSubmit}
            >
              Save
            </Button>
          </Grid>
          {subjectItems}
        </Grid>
      </div>
    );
  }
}

EditSubjects.propTypes = {
  createSubjects: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired,
  removeSubject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  subjects: state.subjects,
});

export default connect(
  mapStateToProps,
  { createSubjects, getSubjects, removeSubject }
)(withRouter(withStyles(styles)(EditSubjects)));
