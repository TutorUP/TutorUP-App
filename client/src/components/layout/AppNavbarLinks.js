import React from 'react';
import { Link } from 'react-router-dom';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/LockOutlined';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './layout.css';
import CodeIcon from '@material-ui/icons/Code';

const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
}

export const createLink = (
  <React.Fragment>
    <Link to="/create-profile" className="link">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Create Profile" />
      </ListItem>
    </Link>
  </React.Fragment>
);

export const editLink = (
  <React.Fragment>
    <Link to="/edit-profile" className="link">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
    </Link>
  </React.Fragment>
);

export const profileLink = (
  <React.Fragment>
    {/*<Link to="/dashboard" className="link">
      <ListItem button>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
     <Link to="/search" className="link">
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Tutors" />
      </ListItem>
    </Link> */}
    <Link to="/profiles" className="link">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Profiles" />
      </ListItem>
    </Link>
  </React.Fragment>
);

export const guestLinks = (
  <React.Fragment>
    <Link to="/login" className="link">
      <ListItem button>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </Link>
    <Link to="/register" className="link">
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
    </Link>
    <Link to="/profiles" className="link">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Profiles" />
      </ListItem>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Actions</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemLink href="#">
            <ListItemText primary="About" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemLink href="https://engineering.projects.up.edu/nguyenda18/">
            <ListItemText primary="Capstone Page" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemLink href="https://github.com/TutorUP/TutorUP-App">
            <ListItemText primary="GitHub" />
      </ListItemLink>
    </ListItem>
  </div>
);