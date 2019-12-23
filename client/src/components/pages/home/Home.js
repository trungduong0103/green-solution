import React, {Component} from 'react';
import banner from "../../../assets/imgs/home_page_img.jpg"
// import earthDay from "../../assets/imgs/earthday.png"
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Snackbar from "@material-ui/core/Snackbar";
import NavBar from "../../navigation/NavBar";
import AboutUsContent from "../about/AboutUsContent";
import Grid from "@material-ui/core/Grid";
import {getAllLocations} from "../../../redux/actions/LocationActions";
import {JoinCleanUpMap} from "../../locations/maps/JoinCleanUpMap";
import CleanSitesList from "./CleanSitesList";
import {enlargeMarker, minimizeMarker} from "../../../redux/actions/UIActions";

const styles = {
    homePageMapWrapper: {
        height: "75vh"
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        padding: "30px 0 10px 0"
    },
    earthDay: {
        width: 200,
        height: 150
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAllLocations();
    }

    handleEnlargeMarker=(index)=>{
        this.props.enlargeMarker(index)
    }

    render() {
        const {openSignOutSnackbar} = this.props;
        const {classes, enlargeMarker, minimizeMarker, locations, showInfoWindow, infoWindowIndex} = this.props;
        return (
            <div>
                <NavBar/>
                <GridList cols={2} cellHeight={710} spacing={0}>
                    <GridListTile>
                        <img src={banner} alt="bannerBackground"/>
                    </GridListTile>
                    <GridListTile>
                        <AboutUsContent/>
                    </GridListTile>
                </GridList>

                <h1 align="center" className={classes.title}>Địa điểm sự kiện bạn muốn tham dự </h1>
                <Grid container className={classes.homePageMapWrapper}>
                    <Grid item sm={6}>
                        <CleanSitesList enlarge={enlargeMarker} minimize={minimizeMarker} locations={locations}/>
                    </Grid>
                    <Grid item sm={6}>
                        <JoinCleanUpMap locations={locations}
                                        enlarge={this.handleEnlargeMarker}
                                        minimize={minimizeMarker}
                                        showInfoWindow={showInfoWindow}
                                        infoWindowIndex={infoWindowIndex}/>
                    </Grid>
                </Grid>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={openSignOutSnackbar}
                          message={"Bạn đã đăng xuất."}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.locationsData.locations,
    openSignOutSnackbar: state.UI.openSignOutSnackbar,
    showInfoWindow: state.UI.showInfoWindow,
    infoWindowIndex: state.UI.infoWindowIndex
});

const mapDispatchToProps = {
    getAllLocations,
    enlargeMarker,
    minimizeMarker
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));