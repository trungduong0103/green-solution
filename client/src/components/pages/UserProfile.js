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
    getAllRegisteredLocationsWithEmail,
    getAllLocations
} from "../../redux/actions/LocationActions";
import {
    updateUser,
    getUser
} from "../../redux/actions/UserActions";
//Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from "@material-ui/core/Fab"
import {CircularProgress} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from '@material-ui/core/AppBar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {openUpdateSiteForm} from "../../redux/actions/FormActions";
import AdminLocations from "../profiles/AdminLocations"

const styles = {
    wrapper: {
        height: "auto",
        padding: "20px 20px"
    },
    userCard: {
        display: "flex",
        justifyContent: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
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
        position: "relative",
        borderRadius: '50%',
        height: "200px",
        width: "200px",
         boxShadow: "0 14px 28px rgba(0,0,0,0.25)"
    },
    user: {
        padding: 30,
        width: '100%',
        textAlign: 'center',
    },
    text: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    editBtn: {
        position: "relative",
        backgroundColor: "rgb(99,151,68)",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            backgroundColor: "#4A6F44"
        }
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
        const auth = sessionStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({email: decodedToken.email});

        //fetch locations and user profile
        //insert admin's email here ↓
        if(decodedToken.email==="abc"){
            this.props.getAllLocations()
        }
        else{
            this.props.getAllCreatedLocationsWithEmail({email: decodedToken.email});
            this.props.getAllRegisteredLocationsWithEmail({email: decodedToken.email});
        }
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
            classes, openUpdateSite, loading, userLoading, loadRegisteredLocations, locations,
            loadCreatedLocations, updateUser, userUpdating, doneUserUpdate, uploadImage, image,
        } = this.props;
        const {registeredLocations, createdLocations, tab, openUpdateProfile, user, email} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid container spacing={5} className={classes.wrapper}>
                    <Grid item xs={3}>
                            {userLoading ? (
                                <CircularProgress size={100} variant="indeterminate" className={classes.progress}/>
                            ) : (<div>
                                    <Grid container className={classes.user}>
                                        <img src={user.avatarUrl ? user.avatarUrl : userAvatar} alt="User's avatar" className={classes.avatar}/>
                                        <Fab className={classes.editBtn} onClick={this.handleOpenUpdateProfile}>
                                            <EditOutlinedIcon style={{color: "white"}}  />
                                        </Fab>
                                        <Typography className={classes.text} style={{padding: "10px 15px"}}>{email}</Typography>
                                    </Grid>
                                </div>
                            )}
                    </Grid>
                    
                    {/*insert admin's email here ↓*/}
                    <Grid item xs={9}>
                    {email === "abc" ? 
                    <AdminLocations locations={locations} />:<div>
                        <AppBar position="static" color="inherit">
                            <Tabs classes={{indicator: classes.indicator}} value={tab} onChange={this.switchTab}
                                  aria-label="simple tabs locations">
                                <Tab label="Sự kiện đã tham gia" {...this.tabProps(0)} className={classes.text}/>
                                <Tab label="Sự kiện đã tạo" {...this.tabProps(1)} className={classes.text}/>
                                <Tab label="Sự kiện đã hoàn thành" {...this.tabProps(2)} className={classes.text} />
                            </Tabs>
                        </AppBar>
                        {tab === 0 &&
                        <RegisteredLocations loaded={loadRegisteredLocations} locations={registeredLocations}/>}
                        {tab === 1 &&
                        <CreatedLocations loading={loading} openUpdateSite={openUpdateSite} email={user.email}
                                          delete={this.handleDeleteLocation} edit={this.handleEditLocation}
                                          loaded={loadCreatedLocations} locations={createdLocations}/>}
                        {tab === 2 && <PastEvents locations={createdLocations} loaded={loadCreatedLocations} />}
                        </div>}
                    </Grid>
                    
                </Grid>

                {/* pass props user */}
                <UpdateProfile open={openUpdateProfile} user={user} image={image}
                               handleOpenUpdateProfile={this.handleOpenUpdateProfile}
                               updateUser={updateUser} uploadImage={uploadImage}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={userUpdating}
                          message={"Đang cập nhật hồ sơ..."}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={doneUserUpdate}
                          message={"Hồ sơ cập nhật thành công!"}/>
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
    doneUserUpdate: state.user.doneUpdate,
    locations: state.locationsData.locations
});

const mapDispatchToProps = {
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail,
    getAllLocations,
    deleteLocation,
    openUpdateSiteForm,
    updateUser,
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
