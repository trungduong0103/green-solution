import React, {Component} from 'react';

//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Collapse from '@material-ui/core/Collapse';
import withStyles from "@material-ui/core/styles/withStyles";

//React-redux
import {connect} from "react-redux";
import {getAllLocations} from "../../redux/actions/LocationActions";

//React router
import NavBar from "../NavBar";
import {JoinCleanUpMap} from "./maps/JoinCleanUpMap";
import {openJoinCleanUpForm} from "../../redux/actions/FormActions";

import CleanUpDetail from "./CleanUpDetail";
import {CircularProgress} from "@material-ui/core";

const styles = {
    mapContainer: {
        position: "absolute",
        width: "50vw",
        height: "60vh",
        top:"30%",
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
        top: "55%",
        marginLeft: "20%"
    },
    detailContainer: {
        position: "absolute",
        top:"30%",
        marginRight: "3%"
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
        const {classes, formState: {open, locationId, loading}} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item sm={7} >
                        <Grid className={classes.mapContainer}>
                            <JoinCleanUpMap
                                locations={this.props.locations}
                                openCleanUpForm={this.props.openJoinCleanUpForm}/>
                        </Grid>
                    </Grid>

                    <Grid item sm={5} >
                        {loading ? (
                            <CircularProgress
                                variant="indeterminate"
                                size={50}
                                className={classes.progress} />
                        ) : (
                            <Collapse in={open} className={classes.detailContainer}>
                                <CleanUpDetail id={locationId}/>
                            </Collapse>
                        )}

                    </Grid>
                </Grid>


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
    openJoinCleanUpForm
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUp));




