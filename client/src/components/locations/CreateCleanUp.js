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

import NavBar from "../navigation/NavBar";
import CheckIcon from "@material-ui/icons/Check";
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers"
//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../redux/actions/LocationActions";
import {CreateCleanUpMap} from "./maps/CreateCleanUpMap";

const today = new Date();
const styles = {

    mapWrapper: {
        width: "40vw",
        height: "40vh",
        padding: 15,
    },
    formWrapper: {
        width: "50vw",
        height: "30vh",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
        textAlign: "center",
        textTransform: "uppercase"
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 17,
        // textAlign: "center",
    },
    text: {
        position: "absolute",
        top: "23%",
        left: "13%",
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 30,
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },

    formInput: {
        margin: 10,
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
        margin: "20px 0",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },

    icon: {
        color: "black"
    },

    picker: {
        margin: "10px 5px",
        color: "white"

    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    successBtn: {
        outline: "none",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
    customError: {
        color: "red",
    },
    wrapper: {
        height: "auto",

    },
    tickIcon: {
        width: 35,
        height: 35
    }
};


class CreateCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventLat: 0,
            eventLng: 0,
            eventAddress: "",
            eventName: "",
            eventDescription: "",
            eventAgenda: "",
            eventStartDate: (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()),
            eventStartTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),

            eventEndDate: (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()),
            eventEndTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            email: "",
            errors: {}
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDateChange = (date) => {
        const startDate = dayjs(date).format("YYYY-MM-DD");
        this.setState({
            startDate: startDate,
            eventStartDate: startDate
        });
    };

    handleEndDateChange = (date) => {
        const endDate = dayjs(date).format("YYYY-MM-DD");
        this.setState({
            endDate: endDate,
            eventEndDate: endDate
        });
    };

    handleTimeChange = (time) => {
        const startTime = dayjs(time).format("HH:mm:ss");
        this.setState({
            startTime: time,
            eventStartTime: startTime
        })
    };

    handleEndTimeChange = (time) => {
        const endTime = dayjs(time).format("HH:mm:ss");
        this.setState({
            endTime: time,
            eventEndTime: endTime
        })
    };


    //Get marker position from user's search
    getLocation = (childData) => {
        this.setState({
            eventLat: childData.lat,
            eventLng: childData.lng,
            // eventAddress: childData.address
        })
    };

    addNewLocation = (event) => {
        const data = {
            name: this.state.eventName,
            description: this.state.eventDescription,
            address: this.state.eventAddress,
            agenda: this.state.eventAgenda,
            startDate: this.state.eventStartDate,
            startTime: this.state.eventStartTime,
            endDate: this.state.eventEndDate,
            endTime: this.state.eventEndTime
        };
        if (this.validateDataBeforeSubmit(data)) {
            event.preventDefault();
            this.props.createNewLocation({
                name: this.state.eventName,
                lat: this.state.eventLat,
                lng: this.state.eventLng,
                address: this.state.eventAddress,
                description: this.state.eventDescription,
                agenda: this.state.eventAgenda,
                startDate: this.state.eventStartDate,
                startTime: this.state.eventStartTime,
                endDate: this.state.eventEndDate,
                endTime: this.state.eventEndTime,
                creator: this.state.email
            });
            this.clearFormAndError();
        } else {
            console.log("false")
        }
    };

    printSth = (e) => {
        e.preventDefault();
        const data = {
            lat: this.state.eventLat,
            lng: this.state.eventLng,
            name: this.state.eventName,
            description: this.state.eventDescription,
            address: this.state.eventAddress,
            agenda: this.state.eventAgenda,
            startDate: this.state.eventStartDate,
            startTime: this.state.eventStartTime,
            endDate: this.state.eventEndDate,
            endTime: this.state.eventEndTime
        };

        console.log(data);

        if (this.validateDataBeforeSubmit(data)) {
            alert("Success")
        }
        else {
            console.log("False")
        }
}

    clearFormAndError() {
        this.setState({
            eventLat: 0,
            eventLng: 0,
            eventAddress: "",
            eventName: "",
            eventAgenda: "",
            eventDescription: "",
            eventStartDate: (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()),
            eventStartTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            eventEndDate: (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()),
            eventEndTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            errors: {}
        })
    }

    validateDataBeforeSubmit(data) {
        const errors = {};
        if (data.name === "") {
            errors.name = "Không được để trống"
        }
        if (data.description === "") {
            errors.description = "Không được để trống"
        }
        if (data.address === "") {
            errors.address = "Vui lòng chọn địa điểm"
        }
        if( data.agenda === "") {
            errors.agenda = "Không được để trống"
        }

        if (data.startDate > data.endDate) {
            alert("Ngày kết thúc không hợp lệ");
            return false
        }

        if (data.startTime > data.endTime) {
            alert("Thời gian kết thúc không hợp lệ");
            return false
        }

        if (data.lat === 0 && data.lng === 0) {
            alert("Bạn chưa chọn địa điểm trên bản đồ");
            return false
        }


        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false
        }

        return true;
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({
            email: decodedToken.email
        });
    }

    render() {
        const {classes, UI: {loading, doneCreateLocation}} = this.props;
        const {errors} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid container className={classes.wrapper}>


                    <Grid item sm={12} className={classes.formWrapper}>
                        <Card className={classes.cardForm}>
                            <CardContent>
                                <Grid container>
                                    <Grid item sm={12}>
                                        <Typography className={classes.title}>Tạo sự kiện</Typography>
                                    </Grid>

                                    <Grid item sm={6}>
                                        <form className={classes.form}>
                                            <TextField
                                                className={classes.formInput}
                                                name="eventName"
                                                required
                                                type="text"
                                                label="Tên sự kiện"
                                                onChange={this.handleChange}
                                                value={this.state.eventName}
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
                                                            value={this.state.startDate}
                                                            onChange={this.handleDateChange}
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
                                                            value={this.state.startTime}
                                                            onChange={this.handleTimeChange}
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
                                                            minDate={this.state.startDate}
                                                            format="dd/MM/yyyy"
                                                            id="end-date-picker-dialog"
                                                            value={this.state.endDate}
                                                            onChange={this.handleEndDateChange}
                                                            label="Ngày kết thúc sự kiện"
                                                            InputLabelProps={{className: classes.input}}
                                                            InputProps={{className: classes.input}}
                                                            fullWidth
                                                            // helperText={errors.endDate}
                                                            // error={!!errors.endDate}
                                                        />

                                                    </MuiPickersUtilsProvider>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardTimePicker
                                                            className={classes.picker}
                                                            label="Thời gian kết thúc sự kiện"
                                                            value={this.state.endTime}
                                                            onChange={this.handleEndTimeChange}
                                                            InputLabelProps={{className: classes.input}}
                                                            InputProps={{className: classes.input}}
                                                            fullWidth
                                                            // helperText={errors.endTime}
                                                            // error={!!errors.endTime}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                            </Grid>

                                            <TextField
                                                className={classes.formInput}
                                                name="eventAddress"
                                                required
                                                multiline
                                                rows="2"
                                                type="text"
                                                label="Địa chỉ sự kiện"
                                                helperText={errors.address}
                                                error={!!errors.address}
                                                onChange={this.handleChange}
                                                value={this.state.eventAddress}
                                                fullWidth
                                                variant="outlined"
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={{className: classes.input}}
                                            />

                                            <TextField
                                                variant="outlined"
                                                className={classes.formInput}
                                                name="eventDescription"
                                                required
                                                type="text"
                                                label="Mô tả sự kiện"
                                                onChange={this.handleChange}
                                                value={this.state.eventDescription}
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
                                                name="eventAgenda"
                                                required
                                                type="text"
                                                label="Lịch trình sự kiện"
                                                onChange={this.handleChange}
                                                value={this.state.eventAgenda}
                                                multiline
                                                rows="4"
                                                helperText={errors.agenda}
                                                error={!!errors.agenda}
                                                fullWidth
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={{className: classes.input}}
                                            />

                                            {doneCreateLocation ?
                                                (
                                                    <CheckIcon className={classes.tickIcon}/>
                                                ) :
                                                (loading ? (
                                                            <CircularProgress variant="indeterminate" size={40}/>
                                                        ) :
                                                        (
                                                            <Button
                                                                variant="contained"
                                                                onClick={this.printSth}
                                                                disabled={loading}
                                                                className={classes.customBtn}
                                                            >Xác Nhận
                                                            </Button>
                                                        )
                                                )
                                            }
                                        </form>
                                    </Grid>

                                    <Grid item sm={6} className={classes.mapWrapper}>
                                        <Typography className={classes.helpTitle}> Chọn địa điểm cho sự kiện của bạn</Typography>

                                        <CreateCleanUpMap handleCall={this.getLocation}/>

                                        {/*<Typography className={classes.helpTitle}>{this.state.eventLat}</Typography>*/}
                                        {/*<Typography className={classes.helpTitle}>{this.state.eventLng}</Typography>*/}
                                        <br/>
                                        <Typography className={classes.helpTitle}>Logo của tổ chức bạn</Typography>


                                        {/*<Typography className={classes.helpTitle}>Hình ảnh trước kia của sự kiện</Typography>*/}

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanUp));




