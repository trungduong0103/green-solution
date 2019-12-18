import React, {Component} from 'react';

//Material UI
import Grid from "@material-ui/core/Grid"
import Collapse from '@material-ui/core/Collapse';
import withStyles from "@material-ui/core/styles/withStyles";

//React-redux
import {connect} from "react-redux";
import {getAllLocations} from "../../redux/actions/LocationActions";

//React router
import NavBar from "../navigation/NavBar";
import {JoinCleanUpMap} from "./maps/JoinCleanUpMap";
import {openCleanUpDetail} from "../../redux/actions/FormActions";

import CleanUpDetail from "./CleanUpDetail";
import {CircularProgress} from "@material-ui/core";
import Footer from "../pages/Footer";

const styles = {
    mapContainer: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top:"20%",
        left: "5%",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    text: {
        position: "absolute",
        top: "23%",
        left: "13%",
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 30,
    },
    progress: {
        position: "absolute",
        top: "45%",
        marginLeft: "20%"
    },
    detailContainer: {
        position: "absolute",
        top:"20%",
        width: "35%"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        height: "75vh"
    }
};

class JoinCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
    }
    // Fetch all locations from database and setState
    componentDidMount() {
        this.props.getAllLocations();
    }

    render() {
        const {classes, formState: {openJoinSite, loading}} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container className={classes.wrapper}>
                    <Grid item sm={7} >
                        <Grid className={classes.mapContainer}>
                            <JoinCleanUpMap
                                locations={this.props.locations}
                                openCleanUpForm={this.props.openCleanUpDetail}/>
                        </Grid>
                    </Grid>

                    <Grid item sm={5} >
                        {loading ? (
                            <CircularProgress
                                variant="indeterminate"
                                size={50}
                                className={classes.progress} />
                        ) : (
                            <Collapse in={openJoinSite} className={classes.detailContainer}>
                                <CleanUpDetail />
                            </Collapse>
                        )}
                    </Grid>
                </Grid>
                <Footer/>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    locations: state.locationsData.locations,
    formState: state.formState
});

const mapDispatchToProps = {
    getAllLocations,
    openCleanUpDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUp));




