import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar"
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MapWithSearchBox} from "../maps/MapWithSearchBox";
import {VIETNAMESE_CITIES, HCMC_DISTRICTS} from "../../../environments/Environments";
import DateFnsUtils from "@date-io/date-fns";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = {
    wrapper: {
        padding: "1em 1em 1em 1em"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },
    title: {
        marginTop: "5%",
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        textAlign: "center",
        textTransform: "uppercase"
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
    progress: {
        marginTop: "5%"
    },
    tick: {
        marginTop: "5%"
    }

};

const today = new Date();

class SecondTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 0,
                lng: 0,
                street: "",
                district: "",
                city: "",
                startDate: today,
                startTime: today,
                endDate: today,
                endTime: today,
            },
            errorSnackbar: false,
            positionSnackbar: false,
            errors: {}
        }
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, are you sure?";
        };
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

    handleStartTimeChange = (time) => {
        const location = this.state.location;
        location.startTime = time;
        this.setState({location});
    };

    handleEndDateChange = (date) => {
        const location = this.state.location;
        location.endDate = date;
        this.setState({location});
    };

    handleEndTimeChange = (time) => {
        const location = this.state.location;
        location.endTime = time;
        this.setState({location});
    };

    //Get marker position from user's search
    getLocation = (childData) => {
        const location = this.state.location;
        location.lat = childData.lat;
        location.lng = childData.lng;
        this.setState({location});
    };

    validateDataBeforeNextStep(data) {
        const errors = {};
        if (data.startDate > data.endDate) errors.date = "Ngày kết thúc không hợp lệ";
        if (data.startTime > data.endTime) errors.time = "Thời gian kết thúc không hợp lệ";
        if (data.street === "") errors.street = "Không được để trống";
        if (data.district === "") errors.district = "Không được để trống";
        if (data.city === "") errors.city = "Không được để trống";
        if (data.lat === 0 && data.lng === 0) {
            this.setState({positionSnackbar: true});
            setTimeout(() => {
                this.setState({positionSnackbar: false})
            }, 3000);
            errors.position = "Chọn vị trí trên bản đồ.";
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false;
        }
        return true;
    };

    continueToNextStep = () => {
        const location = this.state.location;
        if (this.validateDataBeforeNextStep(location)) {
            this.props.nextStep(location, 1);
        }
    };

    render() {
        const {location, errors, errorSnackbar, positionSnackbar} = this.state;
        const {classes, loading, doneCreateLocation} = this.props;
        return (
            <Grid container spacing={4} className={classes.wrapper}>
                <Grid item sm={5}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container style={{height: "60vh"}}>
                                <Grid item sm={12}>
                                    <Typography className={classes.title}>Địa điểm và thời gian</Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <form>
                                        <Grid container>
                                            <Grid item sm={12}>
                                                <TextField
                                                    className={classes.formInput}
                                                    name="street"
                                                    required
                                                    multiline
                                                    rows="1"
                                                    type="text"
                                                    label="Địa chỉ sự kiện"
                                                    helperText={errors.street}
                                                    error={!!errors.street}
                                                    onChange={this.handleChange}
                                                    value={location.street}
                                                    fullWidth
                                                    InputLabelProps={{className: classes.input}}
                                                    InputProps={{className: classes.input}}
                                                />
                                            </Grid>
                                        </Grid>
                                        <br/>
                                        <Grid container spacing={4}>
                                            <Grid item sm={6}>
                                                <TextField
                                                    fullWidth
                                                    className={classes.formControl}
                                                    select
                                                    name="city"
                                                    label="Tỉnh thành"
                                                    value={location.city}
                                                    onChange={this.handleChange}
                                                    helperText={errors.city}
                                                    error={!!errors.city}
                                                    InputLabelProps={{className: classes.input}}
                                                    inputProps={{className: classes.input}}
                                                >
                                                    {VIETNAMESE_CITIES.map(option => (
                                                        <MenuItem key={option.id} value={option.name}
                                                                  className={classes.input}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <TextField
                                                    disabled={location.city === "" || location.city !== "Hồ Chí Minh"}
                                                    fullWidth
                                                    className={classes.formControl}
                                                    select
                                                    name="district"
                                                    label="Quận/Huyện"
                                                    value={location.district}
                                                    onChange={this.handleChange}
                                                    helperText={errors.district}
                                                    error={!!errors.district}
                                                    InputLabelProps={{className: classes.input}}
                                                    inputProps={{className: classes.input}}
                                                >
                                                    {HCMC_DISTRICTS.map(option => (
                                                        <MenuItem key={option.id} value={option.name}
                                                                  className={classes.input}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <br/>
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
                                        <br/>
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

                                        <Grid container alignContent="center" alignItems="center">
                                            <Grid item sm={4}/>
                                            <Grid item sm={4}>
                                                {loading ? (
                                                        <CircularProgress size={32} className={classes.progress}/>) :
                                                    doneCreateLocation ?
                                                        <CheckIcon fontSize="large" className={classes.tick}/> : (
                                                            <Button
                                                                variant="contained"
                                                                onClick={this.continueToNextStep}
                                                                className={classes.customBtn}
                                                            >Tiếp tục</Button>
                                                        )
                                                }
                                            </Grid>
                                            <Grid item sm={4}/>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={7}>
                    <MapWithSearchBox handleCall={this.getLocation}/>
                </Grid>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={errorSnackbar}
                          message={"Vui lòng điền đủ thông tin."}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          open={positionSnackbar}
                          message={"Vui lòng chọn vị trí ở bản đồ"}/>
            </Grid>

        );
    }
}

SecondTab.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default withStyles(styles)(SecondTab);
