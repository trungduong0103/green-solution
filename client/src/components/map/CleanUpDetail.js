import React from 'react';
import NavBar from "../NavBar";
import {connect} from "react-redux";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const locationId = this.props.match.params.id;
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

    render() {

        return(
            <div>
                <NavBar/>
                <h3>Detail Location {this.props.match.params.id}</h3>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CleanUpDetail);
