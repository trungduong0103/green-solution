import React from 'react';
import {connect} from "react-redux";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import JoinCleanUpForm from "./forms/JoinCleanSiteForm";
import Grid from "@material-ui/core/Grid";

const styles = {
    joinButton: {
        textAlign: "center"
    }
};

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        }
    }

    componentDidMount() {
        // const locationId = this.props.match.params.id;
        // this.props.getAllLocations();
        // this.props.deleteLocation("LVpPAv3vRZpUDVRNkc3Z");
        // this.props.getLocation(locationId);
        // this.props.updateLocation({
        //     "id":"NVtV1ynTg4yxDEeIoCMf",
        //     "name":"RMIT Dirty #1",
        //     "lat":10.7295612,
        //     "lng":106.69377020000002
        // })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.location) {
            return {
                location: props.location
            }
        }
        return null;
    }

    render() {
        const {classes} = this.props;
        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {this.state.location.name}
                    </Typography>
                    <br/>
                    <Typography variant="body2" component="p">
                        {this.state.location.description}
                    </Typography>

                    <JoinCleanUpForm locationId={this.state.location.id}/>
                    <br/>
                    <Grid container justify="center" alignItems="center">
                        <Grid item sm={4}/>
                        <Grid item sm={4}>
                            <Button className={classes.joinButton}>
                                Đăng Kí
                            </Button>
                        </Grid>
                        <Grid item sm={4}/>
                    </Grid>

                </CardContent>

            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.locationsData.location
});

const mapDispatchToProps = {
    getLocation,
    updateLocation,
    getAllLocations,
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CleanUpDetail));
