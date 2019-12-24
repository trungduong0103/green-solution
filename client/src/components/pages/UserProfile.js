import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
//Material-UI
import NavBar from "../navigation/NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RegisteredLocations from '../profiles/RegisteredLocations'
import CreatedLocations from '../profiles/CreatedLocations'
import userAvatar from "../../assets/imgs/home_page_img.jpg";
import {
    deleteLocation,
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail
} from "../../redux/actions/LocationActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {openUpdateSiteForm} from "../../redux/actions/FormActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit"
import UpdateProfile from "../profiles/UpdateProfile"


const styles = {
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        padding: 10,
        textAlign: "center"
    },
    formTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
        textAlign: "center"
    },
    table: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 15
    },
    wrapper: {
        height: "auto",
        padding: "20px 20px"
    },
    progress: {
        position: "absolute",
        top: "45%",
        marginLeft: "20%"
    },
    locationsProgress1: {
        position: "absolute",
        marginLeft: "15%",
        top: "30%"
    },
    locationProgress2: {
        position: "absolute",
        top: "40%",
        marginLeft: "30%"
    },
    indicator: {

        backgroundColor: "#7F986F",
    },
    active: {
        color: "#7F986F"
    },
    avatar: {
        borderRadius: '50%',
        height: "200px",
        width: "200px",
        padding: "10px"
    },
    user: {
        width: '100%',
        textAlign: 'center'
    }


};

const userObj = {
    firstName: 'abc',
    lastName: 'def',
    email: 'sfs',
    phoneNumber: 'sdf',
    image: ''
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredLocations: [],
            createdLocations: [],
            email: "",
            tab: 0,
            openUpdateProfile: false,
            user: {}
        }
        this.switchTab = this.switchTab.bind(this)
        this.tabProps = this.tabProps.bind(this)
        this.handleOpenUpdateProfile = this.handleOpenUpdateProfile.bind(this)

    }

    switchTab = (event, newValue) => {
        this.setState({
            tab: newValue
        })
    };

    tabProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        }
    };

    handleOpenUpdateProfile = () => {
        this.setState({
            openUpdateProfile: !this.state.openUpdateProfile
        })
    };

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({
            email: decodedToken.email
        });
        this.props.getAllCreatedLocationsWithEmail({email: decodedToken.email});
        this.props.getAllRegisteredLocationsWithEmail({email: decodedToken.email});

        //Add fetch user
    }

    static getDerivedStateFromProps(props, state) {
        if (props.createdLocations !== state.createdLocations) {
            return {
                createdLocations: props.createdLocations
            }
        }
        if (props.registeredLocations !== state.registeredLocations) {
            return {
                registeredLocations: props.registeredLocations
            }
        }

        //Add user
        return null;
    }

    handleDeleteLocation = (locationId) => {
        this.props.deleteLocation(locationId, this.state.email);
    };

    handleEditLocation = (locationId) => {
        this.props.openUpdateSiteForm(locationId);
    };

    render() {
        const {classes, openUpdateSite, loading, loadRegisteredLocations, loadCreatedLocations} = this.props;
        const {registeredLocations, createdLocations, tab, email, openUpdateProfile,} = this.state;

        return (
            <div>
                <NavBar/>
                <Grid container spacing={5} className={classes.wrapper}>
                    <Grid item xs={3} className={classes.gridForm}>
                        <Card>

                            <CardContent>
                                <div className={classes.user}>
                                    <img src={userAvatar} alt="User's avatar" className={classes.avatar}/>
                                </div>
                                <Typography>{email}

                                    <IconButton
                                        className={classes.button}
                                        onClick={this.handleOpenUpdateProfile}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                </Typography>

                                <Typography variant="body2" component="p">

                                </Typography>


                            </CardContent>
                        </Card>


                    </Grid>

                    <Grid item xs={9} className={classes.gridForm}>
                        <AppBar position="static" color="inherit">
                            <Tabs classes={{indicator: classes.indicator}} value={tab} onChange={this.switchTab}
                                  aria-label="simple tabs locations">
                                <Tab label="Sự kiện đã tham gia" {...this.tabProps(0)} />
                                <Tab label="Sự kiện đã tạo" {...this.tabProps(1)} />
                            </Tabs>
                        </AppBar>
                        {tab === 0 &&
                        <RegisteredLocations loaded={loadRegisteredLocations} locations={registeredLocations}/>}
                        {tab === 1 &&
                        <CreatedLocations loading={loading} openUpdateSite={openUpdateSite} email={this.state.email}
                                          delete={this.handleDeleteLocation} edit={this.handleEditLocation}
                                          loaded={loadCreatedLocations} locations={createdLocations}/>}
                    </Grid>
                </Grid>

                {/* pass props user */}
                <UpdateProfile open={openUpdateProfile} user={userObj}
                               handleOpenUpdateProfile={this.handleOpenUpdateProfile}/>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createdLocations: state.locationsData.createdLocations,
    registeredLocations: state.locationsData.registeredLocations,
    openUpdateSite: state.formState.openUpdateSite,
    loading: state.formState.loading,
    loadCreatedLocations: state.UI.loadCreatedLocations,
    loadRegisteredLocations: state.UI.loadRegisteredLocations
});

const mapDispatchToProps = {
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail,
    deleteLocation,
    openUpdateSiteForm
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
