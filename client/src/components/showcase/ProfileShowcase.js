import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileItem from './ProfileItem';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// redux imports
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';


// MUI imports
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';

const styles = {
    card: {
        minWidth: 300,
    },
    padding20: {
        padding: 20,
    },
    marginLeft20: {
        marginLeft: 20,
    }
};

class ProfilesShowcase extends Component {
    constructor(){
        super();
        this.state = {
        data: getProfiles(),
        searching: false,
        searchText: '',
        text: '',
        orderDropDown: null,
        filterDropDown: null,
      };
    }

    //Functions then render
    componentDidMount() {
        this.props.getProfiles();
    }
    //for randomizing profiles displayed
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // Randomly swap elements.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //uses current value of search bar to find tutors with similar names    
    handleSearch = text => event => {   
        this.setState({
            [text]: event.target.searchText
        });
        let search_text = event.target.value;
        let profileList = this.props.profile.profiles;

        if (search_text.length > 0){
            //generates list based on current search text and profile First Names
            let searchList = [];
            for(var prof in profileList){
                let profile = profileList[prof];
                
                //compare first name to search text, add to list if similar
                let firstName = profile.user.firstname;
                if (firstName.length >= search_text.length){
                    let userName = firstName.substring(0, search_text.length).toLowerCase();
                    if(userName.includes(search_text.toLowerCase())){
                        searchList.push(profile);
                    }
                }
            }
            if(searchList.length > 0){
                this.setState(state => ({
                    data: searchList,
                    searching: true
                }));
            }
        }
        else
        {
            this.setState(state => ({
                searching: false
            }));
        }
    }

      closeOrderMenu = event => {
          this.setState({
              orderDropDown: null,
          })
      } 

      closeFilterMenu = event => {
        this.setState({
            filterDropDown: null,
        })
    } 


      handleFilterBy = event => {
        this.setState({ 
            filterDropDown: event.currentTarget,
        });
      };

      handleOrderBy = event => {
        this.setState({ 
            orderDropDown: event.currentTarget,
        });
      }

    handleCheck = name => event => {
        this.setState({
          [name]: event.target.checked,
        });
      };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    orderBy = (orderBy) => {
        let profileList = this.props.profile.profiles;

        //Sort Objects by their attributes
        let nameSorted = profileList.sort(function(a,b){
            var nameA=a.user.firstname.toLowerCase(), nameB=b.user.firstname.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0
        })

        let majorSorted = profileList.sort(function(a,b){
            var majorA = a.major.toLowerCase(), majorB = b.major.toLowerCase()
            if (majorA < majorB) 
                return -1 
            if (majorA > majorB)
                return 1
            return 0
        })
       
        let filterType = orderBy;
        if (filterType = 'name')
            console.log(nameSorted);
            this.setState(state => ({
                data: nameSorted,
                type: filterType
            })); 
        if (filterType = 'major')
            this.setState(state => ({
                data: majorSorted,
                type: filterType
            })); 
    }

    render() {
        const { classes } = this.props;
        const { profiles, loading } = this.props.profile;
        const { orderDropDown, filterDropDown} = this.state;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = (
            <ProgressSpinner />
        )
        }
        else {
            //if currently typing in search bar,
            //display  search results
            if(this.state.searching == true){
                let searchData = this.state.data;
                profileItems = searchData.length > 0 ?
                searchData.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <div>
                        <h1>No Profiles To List</h1>
                    </div>
                );
            }
               //else display shuffle of all profiles
            else {
                let shuffledProfiles = this.shuffle(profiles);
                profileItems = profiles.length > 0 ?
                shuffledProfiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <div>
                        <h1>No Profiles To List</h1>
                    </div>
                );
            }
        }
        return (
            <div>
            <header>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.padding20}>
                                        <React.Fragment>
                                            <SearchIcon />
                                            <Input id='search' placeholder="Search Tutors" value={this.state.searchText} onChange={this.handleSearch('searchText')} className={classes.marginLeft20}/>   
                                            <Button variant="contained" className={classes.marginLeft20} aria-haspopup="true" onClick={this.handleOrderBy} aria-owns={orderDropDown ? 'orderByMenu' : undefined}>Order by</Button>
                                            <Menu id='orderByMenu' anchorEl={orderDropDown} open={Boolean(orderDropDown)} onClose={this.closeOrderMenu}>
                                                <MenuItem onClick={() => this.orderBy('name')}> First Name</MenuItem>
                                                <MenuItem onClick={() => this.orderBy('major')}> By Major </MenuItem>
                                            </Menu>

                                            <Button variant="contained" className={classes.marginLeft20} aria-haspopup="true" onClick={this.handleFilterBy} aria-owns={filterDropDown ? 'filterByMenu' : undefined}>Filter by</Button>
                                            <Menu id='filterByMenu' anchorEl={filterDropDown} open={Boolean(filterDropDown)} onClose={this.closeFilterMenu}>
                                                <MenuItem onClick={() => this.orderBy('name')}> First Name</MenuItem>
                                                <MenuItem onClick={() => this.orderBy('class')}> Course Name</MenuItem>
                                                <MenuItem onClick={() => this.orderBy('major')}> By Major </MenuItem>
                                            </Menu>

                                            <br/>
                                        </React.Fragment>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </header>
            <div>
                <Grid container spacing={24}>
                    {profileItems}
                </Grid>
            </div>
        </div>
        );
    }
}

ProfilesShowcase.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(withStyles(styles)(ProfilesShowcase))