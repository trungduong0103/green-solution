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
import {JoinCleanUpMap} from "../../locations/maps/JoinCleanUpMap";
import CleanSitesList from "./CleanSitesList";
import CleanSitesGrid from "./CleanSitesGrid"
import {enlargeMarker, minimizeMarker} from "../../../redux/actions/UIActions";
import IconButton from "@material-ui/core/IconButton";
import ViewListIcon from "@material-ui/icons/ViewList"
import AppsIcon from "@material-ui/icons/Apps"
import {
    filterLocationsByCity,
    filterLocationsByDistrict, filterLocationsByKeyword,
    filterLocationsByStartDate,
    getAllLocations, resetFilters
} from "../../../redux/actions/LocationActions";
import Filter from "./Filter";
import Search from "./Search";

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
    },

};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: false,
            list: true
        }
    }

    setGrid = () => {
        this.setState({grid: true, list: false});
    };

    setList = () => {
        this.setState({grid: false, list: true});
    };

    componentDidMount() {
        this.props.getAllLocations();
    };

    handleEnlargeMarker = (index) => {
        this.props.enlargeMarker(index)
    };

    render() {
        const {
            classes,
            enlargeMarker,
            minimizeMarker,
            locations,
            filteredLocations,
            filterLocationsByCity,
            filterLocationsByDistrict,
            filterLocationsByStartDate,
            filterLocationsByKeyword,
            resetFilters,
            showInfoWindow,
            infoWindowIndex,
            openSignOutSnackbar
        } = this.props;
        const {list, grid} = this.state;
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
                <Grid container>
                    <Grid item sm={1}></Grid>
                    <Search filterByKeyword={filterLocationsByKeyword} reset={resetFilters}/>
                    <Filter
                        filterByCity={filterLocationsByCity}
                        filterByDistrict={filterLocationsByDistrict}
                        filterByStartDate={filterLocationsByStartDate}/>
                </Grid>

                <Grid container className={classes.homePageMapWrapper}>
                    <Grid item sm={6}>
                        <div style={{width: '100%', textAlign: 'right'}}>
                            <IconButton onClick={() => this.setGrid()}>
                                <AppsIcon/>
                            </IconButton>
                            <IconButton onClick={() => this.setList()}>
                                <ViewListIcon/>
                            </IconButton>
                        </div>
                        {grid && <CleanSitesGrid
                            enlarge={enlargeMarker}
                            minimize={minimizeMarker}
                            locations={filteredLocations ? filteredLocations : locations}
                            grid={6}/>}
                        {list && <CleanSitesList
                            enlarge={enlargeMarker}
                            minimize={minimizeMarker}
                            locations={filteredLocations ? filteredLocations : locations}/>}
                    </Grid>
                    <Grid item sm={6}>
                        <JoinCleanUpMap locations={filteredLocations ? filteredLocations : locations}
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
    filteredLocations: state.locationsData.filteredLocations,
    openSignOutSnackbar: state.UI.openSignOutSnackbar,
    showInfoWindow: state.UI.showInfoWindow,
    infoWindowIndex: state.UI.infoWindowIndex
});

const mapDispatchToProps = {
    getAllLocations,
    enlargeMarker,
    minimizeMarker,
    filterLocationsByCity,
    filterLocationsByDistrict,
    filterLocationsByStartDate,
    filterLocationsByKeyword,
    resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
