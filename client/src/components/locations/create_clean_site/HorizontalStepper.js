import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"

const styles = {

};

const steps = [
    {
        index: 0,
        label: "Thông tin người tổ chức"
    },
    {
        index: 1,
        label: "Thông tin sự kiện"
    },
    {
        index: 2,
        label: "Xác nhận thông tin"
    }
];


class HorizontalStepper extends Component{

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <FirstTab/>;
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    // getSteps() {
    //     return ['Thông tin người tổ chức', 'Thông tin sự kiện', 'Xác nhận thông tin'];
    // }
    //
    // handleNext = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep + 1);
    // }

    nextStep = () => {
        const {activeStep} = this.state;
        this.setState({activeStep: activeStep + 1});
    };

    prevStep = () => {
        const {activeStep} = this.state;
        this.setState({activeStep: activeStep - 1});
    };
    // const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState(0);
    // const steps = getSteps();
    //
    // const handleNext = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep + 1);
    // };
    //
    // const handleBack = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep - 1);
    // };
    //
    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        return(
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(step => (
                        <Step key={step.index}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    {activeStep === 0 ? (
                        <FirstTab
                            nextStep={this.nextStep}
                        />) :
                        (
                        <SecondTab
                            prevStep={this.prevStep}
                        />)}
                </div>
            </div>
        )

    }

    // return (
    //     <div className={classes.root}>
    //         <Stepper activeStep={activeStep} alternativeLabel>
    //             {steps.map(label => (
    //                 <Step key={label}>
    //                     <StepLabel>{label}</StepLabel>
    //                 </Step>
    //             ))}
    //         </Stepper>
    //         <div>
    //             {activeStep === steps.length ? (
    //                 <div>
    //                     <Typography className={classes.instructions}>All steps completed</Typography>
    //                     <Button onClick={handleReset}>Reset</Button>
    //                 </div>
    //             ) : (
    //                 <div>
    //
    //                     {/*<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
    //                     <div>
    //                         {getStepContent(activeStep)}
    //                     </div>
    //                     <div>
    //                         <Button
    //                             disabled={activeStep === 0}
    //                             onClick={handleBack}
    //                             className={classes.backButton}
    //                         >
    //                             Back
    //                         </Button>
    //                         <Button variant="contained" color="primary" onClick={handleNext}>
    //                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    //                         </Button>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
}

export default withStyles(styles)(HorizontalStepper);
