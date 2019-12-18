import React, {Component} from 'react';
import banner from "../../assets/imgs/home_page_img.jpg"
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Snackbar from "@material-ui/core/Snackbar";
import NavBar from "../navigation/NavBar";
import AboutUsContent from "./AboutUsContent";
import Grid from "@material-ui/core/Grid";
import {getAllLocations} from "../../redux/actions/LocationActions";
import {JoinCleanUpMap} from "../locations/maps/JoinCleanUpMap";
import CleanSitesList from "./CleanSitesList";

const styles = {
    homePageMapWrapper:{
        height: "75vh"
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

    render() {
        const {openSignOutSnackbar} = this.props;
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <GridList cols={2} cellHeight={550} spacing={0}>
                    <GridListTile>
                        <img src={banner} alt="bannerBackground"/>
                    </GridListTile>
                    <GridListTile>
                        <AboutUsContent />
                    </GridListTile>
                </GridList>
                <h1>Browse clean sites</h1>
                <Grid container spacing={1} className={classes.homePageMapWrapper}>
                    <Grid item sm={6}>
                        <CleanSitesList locations={this.props.locations} />
                    </Grid>
                    <Grid item sm={6}>
                        <JoinCleanUpMap locations={this.props.locations} />
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
    openSignOutSnackbar: state.UI.openSignOutSnackbar
});

const mapDispatchToProps = {
    getAllLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
