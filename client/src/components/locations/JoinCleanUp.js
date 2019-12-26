import React, { Component } from 'react';

//Material UI
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles";

//React-redux
import { connect } from "react-redux";
import { getAllLocations } from "../../redux/actions/LocationActions";

//React router
import { JoinCleanUpMap } from "./maps/JoinCleanUpMap";
import { openCleanUpDetail } from "../../redux/actions/FormActions";

import NavBar from "../navigation/NavBar";

import CleanSitesList from "../pages/home/CleanSitesList";
import CleanSitesGrid from "../pages/home/CleanSitesGrid"

import { enlargeMarker, minimizeMarker } from "../../redux/actions/UIActions";
import IconButton from "@material-ui/core/IconButton";
import ViewListIcon from "@material-ui/icons/ViewList"
import AppsIcon from "@material-ui/icons/Apps"
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = {
    wrapper: {
        padding: '10px'
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        padding: "30px 0 10px 0"
    },
    icon: {
        width: '100%',
        textAlign: 'right'
    }

};

const CustomSwitch = withStyles({
    switchBase: {
        '&$checked': {
            color: 'green'
        },
        '&$checked + $track': {
            backgroundColor: 'green'
        }
    },
    checked: {},
    track:{}
})(Switch)

class JoinCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            list: false,
            grid: true,
            map: false
        }
    }
    // Fetch all locations from database and setState
    componentDidMount() {
        this.props.getAllLocations();
    }

    handleEnlargeMarker = (index) => {
        this.props.enlargeMarker(index)
    }

    setGrid = () => {
        this.setState({
            grid: true,
            list: false
        })
    }

    setList = () => {
        this.setState({
            grid: false,
            list: true
        })
    }

    toggleMap = () => {
        this.setState({
            map: !this.state.map
        })
    }

    render() {
        const { classes, locations, enlargeMarker, minimizeMarker, showInfoWindow, infoWindowIndex } = this.props;
        const { list, grid, map } = this.state
        return (
            <div>
                <NavBar />
                <h1 align="center" className={classes.title}>Địa điểm sự kiện bạn muốn tham dự </h1>
                {map ? <Grid container className={classes.wrapper}>
                    <Grid item sm={6}>
                        <div className={classes.icon}>
                            <IconButton onClick={() => this.setGrid()}>
                                <AppsIcon />
                            </IconButton>
                            <IconButton onClick={() => this.setList()}>
                                <ViewListIcon />
                            </IconButton>
                        </div>
                        {list && <CleanSitesList enlarge={enlargeMarker} minimize={minimizeMarker} locations={locations} />}
                        {grid && <CleanSitesGrid enlarge={enlargeMarker} minimize={minimizeMarker} locations={locations} grid={6} />}
                    </Grid>
                    <Grid item sm={6}>
                        <div className={classes.icon}>
                            <FormControlLabel
                                control={
                                    <CustomSwitch checked={map} onChange={() => this.toggleMap()} />
                                }
                                label="Mở bản đồ"
                            />
                        </div>
                        <JoinCleanUpMap locations={locations}
                            enlarge={this.handleEnlargeMarker}
                            minimize={minimizeMarker}
                            showInfoWindow={showInfoWindow}
                            infoWindowIndex={infoWindowIndex} />
                    </Grid>
                </Grid> :

                    <div className={classes.wrapper}>
                        <div className={classes.icon}>
                            <IconButton onClick={() => this.setGrid()}>
                                <AppsIcon />
                            </IconButton>
                            <IconButton onClick={() => this.setList()}>
                                <ViewListIcon />
                            </IconButton>
                            <FormControlLabel
                                control={
                                    <CustomSwitch checked={map} onChange={() => this.toggleMap()} />
                                }
                                label="Mở bản đồ"
                            />
                        </div>
                        {list && <CleanSitesList enlarge={enlargeMarker} minimize={minimizeMarker} locations={locations} />}
                        {grid && <CleanSitesGrid enlarge={enlargeMarker} minimize={minimizeMarker} locations={locations} grid={4} />}

                    </div>}

            </div>

        )
    }
}

const mapStateToProps = state => ({
    locations: state.locationsData.locations,
    formState: state.formState,
    showInfoWindow: state.UI.showInfoWindow,
    infoWindowIndex: state.UI.infoWindowIndex
});

const mapDispatchToProps = {
    getAllLocations,
    openCleanUpDetail,
    enlargeMarker,
    minimizeMarker
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUp));




