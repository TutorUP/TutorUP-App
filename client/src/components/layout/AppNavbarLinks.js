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
import InfoIcon from '@material-ui/icons/Info';
import SubjectIcon from '@material-ui/icons/LibraryBooks'
import './layout.css';
import CodeIcon from '@material-ui/icons/Code';

const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
}

export const authLinks = (
  <React.Fragment>
    <Link to="/profile" className="link">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to="/profiles" className="link">
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Find a Tutor" />
      </ListItem>
    </Link>
  </React.Fragment>
);

export const adminLinks = (
  <React.Fragment>
    <ListSubheader inset>Admin Tools</ListSubheader>
    <Link to="/subjects" className="link">
      <ListItem button>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Subjects" />
      </ListItem>
    </Link>
    <Link to="/manage-users" className="link">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
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
  </React.Fragment>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Resources</ListSubheader>
      
    <ListItemLink href="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
    </ListItemLink>
    
    <ListItemLink href="https://github.com/TutorUP/TutorUP-App">
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
    </ListItemLink>
  </div>
);