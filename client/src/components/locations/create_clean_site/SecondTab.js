import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {CreateCleanUpMap} from "../maps/CreateCleanUpMap";
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";



const styles = {
    wrapper: {
        padding: "30px"
    },

    formWrapper: {
        width: "50vw",
        height: "550px",
        padding: "0 10px"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        textAlign: "center",
        textTransform: "uppercase"
    },
    formInput: {
        margin: 10,
        color: "white"
    },
    picker: {
        margin: "10px 5px",
        color: "white"

    },
    customBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        marginTop: "20px",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },

};

const today = new Date();

class SecondTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 0,
                lng: 0,
                startDate: today,
                startTime: today,
                endDate: today,
                endTime: today,
                creator: ""

            },
            errors: {}
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

    handleChange = (event) => {
        const location = this.state.location;
        location[event.target.name] = event.target.value;
        this.setState({location});
    };

    handleStartDateChange = (date) => {
        const startDate = dayjs(date).format("YYYY-MM-DD");
        console.log(startDate);
        const location = this.state.location;
        location.startDate = startDate;
        this.setState({
            location,

        });
    };

    handleStartTimeChange = (time) => {
        const startTime = dayjs(time).format("HH:mm:ss");
        const location = this.state.location;
        location.startTime = startTime;
        this.setState({
            location,
            formatStartTime: time
        })
    };

    handleEndDateChange = (date) => {
        const endDate = dayjs(date).format("YYYY-MM-DD");
        const location = this.state.location;
        location.endDate = endDate;
        this.setState({location});
    };

    handleEndTimeChange = (time) => {
        const endTime = dayjs(time).format("HH:mm:ss");
        const location = this.state.location;
        location.endTime = endTime;
        this.setState({
            location,
            formatEndTime: time
        })
    };

    //Get marker position from user's search
    getLocation = (childData) => {
        const location  = this.state.location;
        location.lat = childData.lat;
        location.lng = childData.lng;
        this.setState({location});
    };

    validateDataBeforeNextStep(data) {
        const errors = {};
        if (data.startDate > data.endDate) errors.date = "Ngày kết thúc không hợp lệ";
        if (data.startTime > data.endTime) errors.time = "Thời gian kết thúc không hợp lệ";
        if (data.lat === 0 && data.lng === 0) errors.position = "Bạn chưa chọn địa điểm trên bản đồ";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };

    backToPreviousStep = () => {
        this.props.prevStep()
    };

    continueToNextStep = () => {
        const location = this.state.location;
        if (this.validateDataBeforeNextStep(location)) {
            this.props.nextStep();
            // this.resetLocationAndErrors();
        }
        else {
            alert("Kiểm tra lại đơn đăng ký của bạn")
        }
    };

    resetLocationAndErrors = () => {
        const defaultLocation = {
            lat: 0,
            lng: 0,
            address: "",
            name: "",
            agenda: "",
            description: "",
            startDate: today,
            endDate: today,
            startTime: today,
            endTime: today
        };
        this.setState({location: defaultLocation, errors: {}});
    };

    printSth = (e) => {
        e.preventDefault();
        const data = {
            lat: this.state.location.lat,
            lng: this.state.location.lng,
            name: this.state.location.name,
            description: this.state.location.description,
            agenda: this.state.location.agenda,
            street: this.state.location.street,
            district: this.state.location.district,
            city: this.state.location.city,
            address: this.state.location.street+","+this.state.location.district+","+this.state.location.city,
            startDate: this.state.location.startDate,
            endDate: this.state.location.endDate,
            startTime: this.state.location.startTime,
            endTime: this.state.location.endTime,
        };
        if (this.validateDataBeforeNextStep(data)) {
            console.log(data)
        }
        else {
            console.log("False")
        }

    };

    render() {
        const {location, errors} = this.state;
        const {classes} = this.props;
        return (
            <Grid container spacing={0} className={classes.wrapper}>
                <Grid item sm={5} className={classes.formWrapper}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography className={classes.title}>Địa điểm và thời gian</Typography>
                                </Grid>

                                <Grid item sm={12}>
                                    <form>
                                        <Grid container spacing={4}>
                                            <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        className={classes.picker}
                                                        invalidDateMessage="Ngày không hợp lệ"
                                                        disablePast
                                                        format="dd/MM/yyyy"
                                                        id="date-picker-dialog"
                                                        value={location.startDate}
                                                        onChange={this.handleStartDateChange}
                                                        label="Ngày bắt đầu sự kiện"
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>

                                            </Grid>

                                            <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        className={classes.picker}
                                                        label="Thời gian bắt đầu sự kiện"
                                                        // value={location.startTime}
                                                        value={this.state.formatStartTime}
                                                        onChange={this.handleStartTimeChange}
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={4}>
                                            <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        className={classes.picker}
                                                        invalidDateMessage="Ngày không hợp lệ"
                                                        disablePast
                                                        minDateMessage="Ngày kết thúc phải sau ngày bắt đầu"
                                                        minDate={location.startDate}
                                                        format="dd/MM/yyyy"
                                                        id="end-date-picker-dialog"
                                                        value={location.endDate}
                                                        onChange={this.handleEndDateChange}
                                                        label="Ngày kết thúc sự kiện"
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        className={classes.picker}
                                                        label="Thời gian kết thúc sự kiện"
                                                        // value={location.endTime}
                                                        value={this.state.formatEndTime}
                                                        onChange={this.handleEndTimeChange}
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>

                                        <Grid container alignContent="center" alignItems="center">
                                            <Grid item sm={2}></Grid>
                                            <Grid item sm={4}>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.backToPreviousStep}
                                                    className={classes.customBtn}
                                                >Trở lại</Button>
                                            </Grid>

                                            <Grid item sm={4}>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.continueToNextStep}
                                                    className={classes.customBtn}
                                                >Tiếp tục</Button>
                                            </Grid>
                                            <Grid item sm={2}></Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={7}>
                    <CreateCleanUpMap handleCall={this.getLocation}/>
                </Grid>

            </Grid>

        );
    }
}

// SecondTab.propTypes = {
//     continue: PropTypes.func.isRequired
// };

export default withStyles(styles)(SecondTab);
