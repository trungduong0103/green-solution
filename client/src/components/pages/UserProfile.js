import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
import NavBar from "../navigation/NavBar";
import UpdateProfile from "../profiles/UpdateProfile";
import RegisteredLocations from '../profiles/RegisteredLocations';
import CreatedLocations from '../profiles/CreatedLocations';
import PastEvents from '../profiles/PastEvents';
import userAvatar from "../../assets/imgs/home_page_img.jpg";
import {
    deleteLocation,
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail
} from "../../redux/actions/LocationActions";
import {
    updateUser,
    getUser,
    uploadImage
} from "../../redux/actions/UserActions";
//Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import {CardActions, CircularProgress} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {openUpdateSiteForm} from "../../redux/actions/FormActions";
import Snackbar from "@material-ui/core/Snackbar";

const styles = {
    wrapper: {
        height: "auto",
        padding: "20px 20px"
    },
    userCard: {
        display: "flex",
        justifyContent: "center"
    },
    progress: {
        padding: "30%"
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
        };
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({email: decodedToken.email});

        //fetch locations and user profile
        this.props.getAllCreatedLocationsWithEmail({email: decodedToken.email});
        this.props.getAllRegisteredLocationsWithEmail({email: decodedToken.email});
        this.props.getUser({email: decodedToken.email})
    }

    static getDerivedStateFromProps(props, state) {
        if (props.createdLocations !== state.createdLocations) {
            return {createdLocations: props.createdLocations}
        }
        if (props.registeredLocations !== state.registeredLocations) {
            return {registeredLocations: props.registeredLocations}
        }
        if (props.user !== state.user) {
            return {user: props.user}
        }
        return null;
    }

    switchTab = (event, newValue) => {
        this.setState({tab: newValue})
    };

    tabProps = (index) => {
        return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`}
    };

    handleOpenUpdateProfile = () => {
        this.setState({openUpdateProfile: !this.state.openUpdateProfile})
    };

    handleDeleteLocation = (locationId) => {
        this.props.deleteLocation(locationId, this.state.email);
    };

    handleEditLocation = (locationId) => {
        this.props.openUpdateSiteForm(locationId);
    };

    render() {
        const {
            classes, openUpdateSite, loading, userLoading, loadRegisteredLocations,
            loadCreatedLocations, updateUser, userUpdating, doneUserUpdate, uploadImage, image,
        } = this.props;
        const {registeredLocations, createdLocations, tab, openUpdateProfile, user} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid container spacing={5} className={classes.wrapper}>
                    <Grid item xs={3}>
                        <Card className={classes.userCard}>
                            {userLoading ? (
                                <CircularProgress size={100} variant="indeterminate" className={classes.progress}/>
                            ) : (<div>
                                    <CardContent>
                                        <div className={classes.user}>
                                            <img src={user.avatarUrl ? user.avatarUrl : userAvatar} alt="User's avatar" className={classes.avatar}/>
                                        </div>
                                        <Typography style={{textAlign: "center"}}>{user.email}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton style={{marginLeft: "auto"}} onClick={this.handleOpenUpdateProfile}>
                                            <EditIcon/>
                                        </IconButton>
                                    </CardActions>
                                </div>
                            )}

                        </Card>
                    </Grid>

                    <Grid item xs={9}>
                        <AppBar position="static" color="inherit">
                            <Tabs classes={{indicator: classes.indicator}} value={tab} onChange={this.switchTab}
                                  aria-label="simple tabs locations">
                                <Tab label="Sự kiện đã tham gia" {...this.tabProps(0)} />
                                <Tab label="Sự kiện đã tạo" {...this.tabProps(1)} />
                                <Tab label="Sự kiện đã hoàn thành" {...this.tabProps(2)} />
                            </Tabs>
                        </AppBar>
                        {tab === 0 &&
                        <RegisteredLocations loaded={loadRegisteredLocations} locations={registeredLocations}/>}
                        {tab === 1 &&
                        <CreatedLocations loading={loading} openUpdateSite={openUpdateSite} email={user.email}
                                          delete={this.handleDeleteLocation} edit={this.handleEditLocation}
                                          loaded={loadCreatedLocations} locations={createdLocations}/>}
                        {tab === 2 && <PastEvents locations={createdLocations} loaded={loadCreatedLocations} />}
                    </Grid>
                </Grid>

                {/* pass props user */}
                <UpdateProfile open={openUpdateProfile} user={user} image={image}
                               handleOpenUpdateProfile={this.handleOpenUpdateProfile}
                               updateUser={updateUser} uploadImage={uploadImage}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={userUpdating}
                          message={"Updating profile..."}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={doneUserUpdate}
                          message={"Profile updated successfully!"}/>
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
    loadRegisteredLocations: state.UI.loadRegisteredLocations,
    user: state.user.user,
    image: state.user.image,
    userLoading: state.user.loading,
    userUpdating: state.user.updating,
    doneUserUpdate: state.user.doneUpdate
});

const mapDispatchToProps = {
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail,
    deleteLocation,
    openUpdateSiteForm,
    updateUser,
    getUser,
    uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
