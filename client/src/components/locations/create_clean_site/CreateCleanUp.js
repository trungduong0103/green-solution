import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"
import ThirdTab from "./ThirdTab";
import jwtDecode from "jwt-decode";
import NavBar from "../../navigation/NavBar";

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
            activeStep: 1,
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
        if (data && (step === 0 || step === 1)) {
            Object.entries(data).forEach(([key, value]) => {
                location[key] = value
            });
            this.setState({location});
        }

        this.setState({activeStep: activeStep + 1});
    };

    getStepContent(activeStep) {
        switch (activeStep) {
            case 0:
                return (
                    <FirstTab nextStep={this.nextStep}/>
                );
            case 1:
                return (
                    <SecondTab
                        nextStep={this.nextStep}
                    />
                );
            case 2:
                return (
                    <ThirdTab/>
                );
            default:
                alert("Something went wrong :/ please refresh the page.");
                return 'Unknown step';
        }
    }

    render() {
        console.log("state from parent", this.state);
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

export default withStyles(styles)(CreateCleanUp);
