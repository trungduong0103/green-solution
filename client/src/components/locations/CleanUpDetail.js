import React from 'react';
import {connect} from "react-redux";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {openCleanUpModal} from "../../redux/actions/FormActions";

const styles = {

};

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{}
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
        if(props.location !== state.location) {
            return {
                location: props.location
            }
        }
        return null;
    }


    render() {
        const {classes} = this.props;
        return(
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {this.props.location.name}
                    </Typography>
                    <br/>
                    <Typography variant="body2" component="p">
                        {this.props.location.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        className={classes.joinButton}
                        onClick={() => this.props.openCleanUpModal()}>
                        Tham Gia
                    </Button>
                </CardActions>
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
    deleteLocation,
    openCleanUpModal
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CleanUpDetail));
