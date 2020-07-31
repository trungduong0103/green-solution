import React, {Component} from 'react';
import {connect} from "react-redux";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"
import NavBar from "../../navigation/NavBar";
import {createNewLocation, uploadLocationLogo} from "../../../redux/actions/LocationActions";
import ThirdTab from "./ThirdTab";

const styles = {
    icon: {
        "&$activeIcon": {
            color: "rgb(99,151,68)",
        },
        "&$completedIcon": {
            color: "rgb(99,151,68)",
        },
    },
    activeIcon: {},
    completedIcon: {},
};

const steps = [
    {
        index: 0,
        label: "Thông tin sự kiện"
    },
    {
        index: 1,
        label: "Địa điểm và thời gian cụ thể"
    },
    {
        index: 2,
        label: "Thông tin nhà tổ chức"
    }
];


class CreateCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            activeStep: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doneCreateLocation !== this.props.doneCreateLocation) {
            setTimeout(() => {
                this.setState({activeStep: prevState.activeStep + 1});
            }, 1500);
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) window.location.href = "/authentication";
        const decodedToken = jwtDecode(auth);
        const location = this.state.location;
        location.creator = decodedToken.email;
        this.setState({location});
    }

    nextStep = (data, step) => {
        const {activeStep, location} = this.state;
        if (data && step === 0) {
            Object.entries(data).forEach(([key, value]) => {
                location[key] = value
            });
            this.setState({location, activeStep: activeStep + 1});
        }

        if (data && step === 1) {
            Object.entries(data).forEach(([key, value]) => {
                location[key] = value;
                if (key === "endTime") {
                    location[key] = `${value.getHours()}:${value.getMinutes()}`;
                }
                if (key === "startTime") {
                    location[key] = `${value.getHours()}:${value.getMinutes()}`;
                }
                if (key === "startDate") {
                    location[key] = `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`
                }
                if (key === "endDate") {
                    location[key] = `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`
                }
                this.setState({location});
            });
            this.setState({location});
            this.props.createNewLocation(location);
        }
    };

    getStepContent(activeStep) {
        const {loading, doneCreateLocation, locationId, uploadLocationLogo, uploadingLogo, doneUploadLogo} = this.props;
        const {location} = this.state;
        switch (activeStep) {
            case 0:
                return (<FirstTab nextStep={this.nextStep}/>);
            case 1:
                return (
                    <SecondTab loading={loading} doneCreateLocation={doneCreateLocation} nextStep={this.nextStep}/>
                );
            case 2:
                return (<ThirdTab
                    locationId={locationId} creator={location.creator} uploadLocationLogo={uploadLocationLogo}
                    uploadingLogo={uploadingLogo} doneUploadLogo={doneUploadLogo} history={this.props.history}/>);
            default:
                alert("Something went wrong :/ please refresh the page.");
                return 'Unknown step';
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        return (
            <div>
                <NavBar/>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(step => (
                        <Step key={step.index}>
                            <StepLabel
                                StepIconProps={{
                                    classes: {
                                        root: classes.icon,
                                        active: classes.activeIcon,
                                        completed: classes.completedIcon
                                    }
                                }}
                            >{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    {this.getStepContent(activeStep)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    doneCreateLocation: state.UI.doneCreateLocation,
    locationId: state.locationsData.locationId,
    uploadingLogo: state.locationsData.uploadingLogo,
    doneUploadLogo: state.locationsData.doneUploadLogo
});

const mapDispatchToProps = {
    createNewLocation,
    uploadLocationLogo
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanUp));
