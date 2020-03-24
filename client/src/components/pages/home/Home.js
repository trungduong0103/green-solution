import React, { Component } from 'react';
import banner from "../../../assets/imgs/home_page_img.jpg"
// import earthDay from "../../assets/imgs/earthday.png"
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Snackbar from "@material-ui/core/Snackbar";
import NavBar from "../../navigation/NavBar";
import AboutUsContent from "../about/AboutUsContent";
import { JoinCleanUpMap } from "../../locations/maps/JoinCleanUpMap";
import { enlargeMarker, minimizeMarker } from "../../../redux/actions/UIActions";
import { getAllLocations } from "../../../redux/actions/LocationActions";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


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

    componentDidMount() {
        this.props.getAllLocations();
        if ("FBIdToken" in localStorage) {
            console.log(localStorage.getItem("FBIdToken"));

        }
    };

    handleEnlargeMarker = (index) => {
        this.props.enlargeMarker(index)
    };

    render() {
        const {
            classes,
            minimizeMarker,
            locations,
            showInfoWindow,
            infoWindowIndex,
            openSignOutSnackbar
        } = this.props;
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


                <Typography variant="h4" align="center" className={classes.title}>Địa điểm sự kiện bạn muốn tham dự </Typography>

                <Grid container justify="center" alignContent="center" style={{padding: "10px 0 30px 0", marginBottom: 0}}>
                    <Grid item sm={2}>
                        <Grid container direction="row" justify="center" alignContent="center">
                            <img style={{width: 150, height: 150, paddingTop: 10}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/a1.-HCMC-US-Consulate-logo-high-ress.png`} alt="home-1"/>
                            <img style={{width: 150, height: 150, padding: "10px 0"}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/Logo-WAVE.png`} alt="home-2"/>
                            <img style={{width: 150, height: 120, padding: "10px 0"}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/vespa-adventures.png`} alt="home-3"/>
                            <img style={{width: 220, height: 170}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/1.png`} alt="home-4"/>
                        </Grid>
                    </Grid>
                    <Grid item sm={8}>
                        <div className={classes.homePageMapWrapper}>
                            <JoinCleanUpMap
                                locations={locations}
                                enlarge={this.handleEnlargeMarker}
                                minimize={minimizeMarker}
                                showInfoWindow={showInfoWindow}
                                infoWindowIndex={infoWindowIndex} />
                        </div>
                    </Grid>

                    <Grid item sm={2}>
                        <Grid container direction="row" justify="center" alignContent="center">
                            <img style={{width: 150, height: 150, paddingTop: 10}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/aaAmChamss.png`} alt="home-5"/>
                            <img style={{width: 150, height: 150, padding: "10px 0"}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/a1.-SSISs.png`} alt="home-6"/>
                            <img style={{width: 150, height: 100, padding: "10px 0"}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/a2000px-Intel-logo.svgs_.png`} alt="home-7"/>
                            <img style={{width: 200, height: 60}} src={`https://vietnamsachvaxanh.org/wp-content/uploads/heineken-vietnam-brewery-5a050226408b8.jpg`} alt="home-8"/>
                        </Grid>
                    </Grid>
                </Grid>

                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={openSignOutSnackbar}
                    message={"Bạn đã đăng xuất."} />
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
