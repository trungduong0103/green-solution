import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"
import ThirdTab from "./ThirdTab";

const styles = {
    icon:{
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


class HorizontalStepper extends Component{

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        }
    }

    nextStep = () => {
        const {activeStep} = this.state;
        this.setState({activeStep: activeStep + 1});
    };

    prevStep = () => {
        const {activeStep} = this.state;
        this.setState({activeStep: activeStep - 1});
    };

    getStepContent(activeStep) {
        switch (activeStep) {
            case 0:
                return (
                    <FirstTab
                        nextStep={this.nextStep}
                    />
                );
            case 1:
                return (
                    <SecondTab
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                    />
                );
            case 2:
                return (
                    <ThirdTab
                        // prevStep={this.prevStep}
                    />
                );
            default:
                return 'Unknown step';
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        return(
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(step => (
                        <Step
                            key={step.index}
                        >
                            <StepLabel
                                StepIconProps={{
                                    classes: {
                                        root: classes.icon,
                                        active: classes.activeIcon,
                                        completed: classes.completedIcon,
                                    }}}
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

export default withStyles(styles)(HorizontalStepper);
