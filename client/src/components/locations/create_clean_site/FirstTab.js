import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {CreateCleanUpMap} from "../maps/CreateCleanUpMap";
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";

const styles = {
    formWrapper: {
        width: "50vw",
        height: "auto",
        padding: "0 30px"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 30,
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
    }
};

const today = new Date();

class FirstTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 0,
                lng: 0,
                address: "",
                name:"",
                description: "",
                agenda: "",
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
        const location = this.state.location;
        location.startDate = date;
        this.setState({location});
    };

    //TODO remember to convert back to time
    handleStartTimeChange = (time) => {
        const location = this.state.location;
        location.startTime = time;
        this.setState({location})
    };

    handleEndDateChange = (date) => {
        const location = this.state.location;
        location.endDate = date;
        this.setState({location});
    };

    handleEndTimeChange = (time) => {
        const location = this.state.location;
        location.endTime = time;
        this.setState({location})
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
        if (data.name === "") errors.name = "Không được để trống";
        if (data.description === "") errors.description = "Không được để trống";
        if (data.address === "") errors.address = "Vui lòng chọn địa điểm";
        if (data.agenda === "") errors.agenda = "Không được để trống";

        if (data.startDate > data.endDate) errors.date = "Ngày kết thúc không hợp lệ";
        if (data.startTime > data.endTime) errors.time = "Thời gian kết thúc không hợp lệ";
        if (data.lat === 0 && data.lng === 0) errors.position = "Bạn chưa chọn địa điểm trên bản đồ";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };

    continueToNextStep = () => {
        const location = this.state.location;
        if (this.validateDataBeforeNextStep(location)) {
            this.props.continue(location);
            this.resetLocationAndErrors();
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

    render() {
        const {location, errors} = this.state;
        const {classes} = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item sm={6} className={classes.formWrapper}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography className={classes.title}>Thông tin sự kiện</Typography>
                                </Grid>

                                <Grid item sm={12}>
                                    <form>
                                        <TextField
                                            className={classes.formInput}
                                            name="name"
                                            required
                                            type="text"
                                            label="Tên sự kiện"
                                            onChange={this.handleChange}
                                            value={location.name}
                                            helperText={errors.name}
                                            error={!!errors.name}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

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
                                                        value={location.startTime}
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
                                                        value={location.endTime}
                                                        onChange={this.handleEndTimeChange}
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>

                                        <TextField
                                            className={classes.formInput}
                                            name="address"
                                            required
                                            multiline
                                            rows="2"
                                            type="text"
                                            label="Địa chỉ sự kiện"
                                            helperText={errors.address}
                                            error={!!errors.address}
                                            onChange={this.handleChange}
                                            value={location.address}
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <TextField
                                            variant="outlined"
                                            className={classes.formInput}
                                            name="description"
                                            required
                                            type="text"
                                            label="Mô tả sự kiện"
                                            onChange={this.handleChange}
                                            value={location.description}
                                            multiline
                                            rows="2"
                                            helperText={errors.description}
                                            error={!!errors.description}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <TextField
                                            variant="outlined"
                                            className={classes.formInput}
                                            name="agenda"
                                            required
                                            type="text"
                                            label="Lịch trình sự kiện"
                                            onChange={this.handleChange}
                                            value={location.agenda}
                                            multiline
                                            rows="3"
                                            helperText={errors.agenda}
                                            error={!!errors.agenda}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={this.continueToNextStep}
                                            className={classes.customBtn}
                                        >Tiếp tục</Button>

                                        {/*{doneCreateLocation ?*/}
                                        {/*    (*/}
                                        {/*        <CheckIcon className={classes.tickIcon}/>*/}
                                        {/*    ) :*/}
                                        {/*    (loading ? (*/}
                                        {/*                <CircularProgress variant="indeterminate" size={40}/>*/}
                                        {/*            ) :*/}
                                        {/*            (*/}
                                        {/*                <Button*/}
                                        {/*                    variant="contained"*/}
                                        {/*                    onClick={this.printSth}*/}
                                        {/*                    disabled={loading}*/}
                                        {/*                    className={classes.customBtn}*/}
                                        {/*                >Xác Nhận*/}
                                        {/*                </Button>*/}
                                        {/*            )*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={6}>
                    <CreateCleanUpMap handleCall={this.getLocation}/>
                </Grid>

            </Grid>

        );
    }
}

FirstTab.propTypes = {
    continue: PropTypes.func.isRequired
};

export default withStyles(styles)(FirstTab);
