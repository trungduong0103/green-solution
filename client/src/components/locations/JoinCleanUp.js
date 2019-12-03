import React, {Component} from 'react';

//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles";

//React-redux
import {connect} from "react-redux";
import {getAllLocations} from "../../redux/actions/LocationActions";

//React router
import NavBar from "../NavBar";
import {JoinCleanUpMap} from "./maps/JoinCleanUpMap";
import CleanUpDetail from "./CleanUpDetail";

const styles = {
    mapContainer: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top: "30%",
        left: "5%",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    text: {
        position: "absolute",
        top: "23%",
        left: "13%",
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 30,

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
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item sm={8} md={8}>
                        <Typography className={classes.text}>Chọn địa điểm bạn muốn tham dự</Typography>
                        <Grid item className={classes.mapContainer}>
                            <JoinCleanUpMap locations={this.props.locations}/>
                        </Grid>
                    </Grid>

                    <Grid item sm={4} md={4}>
                        <CleanUpDetail />
                    </Grid>
                </Grid>


            </div>

        )
    }
}

const mapStateToProps = state => ({
    locations: state.locationsData.locations
});

const mapDispatchToProps = {
    getAllLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUp));




