import React, {Component} from 'react';
import DateFnsUtils from "@date-io/date-fns"
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

import NavBar from "../../navigation/NavBar";
import CheckIcon from "@material-ui/icons/Check";
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers"
//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../../redux/actions/LocationActions";
import ImageDropZone from "../../pages/ImageDropZone"
import {CreateCleanUpMap} from "../maps/CreateCleanUpMap";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";

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
            step: 2
        }
    };

    continue = (location) => {
        this.props.createNewLocation(location)
            .then(() => {
                this.nextStep();
            })
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
