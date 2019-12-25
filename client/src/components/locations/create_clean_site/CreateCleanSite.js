import React, {Component} from 'react';
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
//React-redux
import {connect} from "react-redux";

import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import NavBar from "../../navigation/NavBar";
import {createNewLocation} from "../../../redux/actions/LocationActions";

const styles = {
    wrapper: {
        height: "auto",
        paddingTop: 20,

    },
    tickIcon: {
        width: 35,
        height: 35
    }
};


class CreateCleanSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    };

    continue = (location) => {
        const newLocation = location;
        newLocation.startDate = `${location.startDate.getFullYear()}-${location.startDate.getMonth()}-${location.startDate.getDate()}`;
        newLocation.endDate = `${location.endDate.getFullYear()}-${location.endDate.getMonth()}-${location.endDate.getDate()}`;
        newLocation.startTime = `${location.startTime.getHours()}:${location.startTime.getMinutes()}:${location.startTime.getSeconds()}`;
        newLocation.endTime = `${location.endTime.getHours()}:${location.endTime.getMinutes()}:${location.endTime.getSeconds()}`;
        this.props.createNewLocation(newLocation);
    };

    // Move forward to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({step: step + 1});
    };

    // Go back to prev step
    prevStep = () => {
        const {step} = this.state;
        this.setState({step: step - 1});
    };

    render() {
        const {step} = this.state;
        return (
            <div>
                <NavBar />
                {step === 1 ? (<FirstTab continue={this.continue} />) : (<SecondTab prevStep={this.prevStep} />)}
            </div>
        )

    }
}

const mapStateToProps = state => ({
    UI: state.UI,

});

const mapDispatchToProps = {
    createNewLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanSite));
