import React, {Component} from 'react';
import DateFnsUtils from "@date-io/date-fns"
import dayjs from "dayjs";
//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button"
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../redux/actions/LocationActions";
//React router

import NavBar from "../NavBar";
import {CreateCleanUpMap} from "./maps/CreateCleanUpMap";

var today = new Date();
const styles = {
    mapWrapper: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top: "18%",
        left: "2%",
        padding: 15
    },

    formWrapper: {
        position: "absolute",
        width: "50vw",
        height: "30vh",
        left: "55%",
        top: "20%",

    },

    mapContainer: {
        position: "absolute",
        top: "30%",
        left: "5%",
        width: "50vw",
        height: "50vh",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
        textAlign: "center",
        color: "white"
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 14,
        textAlign: "center",
        color: "white"
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
        backgroundColor: "#63a95a",
        borderRadius: "10px 50px"
    },
    form: {
        backgroundColor: "#63a95a"
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
            },
    },
    picker: {
        margin: "10px 5px",
        color: "white"

    },
    input: {
        color: "white",
        fontFamily: "'Quicksand', sans-serif;",
    },
    notchedOutline: {
        borderColor: "white"
    }
};


class CreateCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],

            eventLat: 0,
            eventLng: 0,
            eventAddress: "",
            eventName: "",
            eventDescription:"",

            eventStartDate: (today.getFullYear() + "-" + (today.getMonth() + 1)+ "-"+ today.getDate()),
            eventStartTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),

            errors: {},

        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDateChange = (date) => {
        const startDate  = dayjs(date).format("YYYY-MM-DD");
        // console.log(typeof time);
        this.setState({
            startDate: startDate,
            eventStartDate: startDate
        });
    };

    handleTimeChange = (time) => {
        const startTime = dayjs(time).format("HH:mm:ss");
        this.setState({
            startTime: time,
            eventStartTime: startTime
        })
    };


    //Get marker position from user's search
    getLocation = (childData) => {
        this.setState({
            eventLat: childData.lat,
            eventLng: childData.lng,
            eventAddress: childData.address
        })
    };

    addNewLocation = (event) => {
        event.preventDefault();
        this.props.createNewLocation({
            "name": this.state.eventName,
            "lat": this.state.eventLat,
            "lng": this.state.eventLng,
            "address": this.state.eventAddress,
            "description": this.state.eventDescription,
            "startDate": this.state.eventStartDate,
            "startTime": this.state.eventStartTime
        })
    };

    printSomething = (event) => {
        event.preventDefault();
        console.log(`
            "Name": ${this.state.eventName},
            "Lat": ${this.state.eventLat},
            "Lng": ${this.state.eventLng},
            "Address": ${this.state.eventAddress},
            "Description": ${this.state.eventDescription},
            "StartDate": ${this.state.eventStartDate},
            "StartTime": ${this.state.eventStartTime}
        
        `)
    };

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
    }


    render() {
        const {classes} = this.props;

        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item sm={7} className={classes.mapWrapper}>
                        <CreateCleanUpMap handleCall={this.getLocation}/>
                    </Grid>

                    <Grid item sm={5} className={classes.formWrapper}>
                        <Card className={classes.cardForm}>
                            <CardContent>
                                <Grid container>
                                    <Grid item sm={12}>
                                        <Typography className={classes.title}>Đơn tạo sự kiện</Typography>
                                        <Typography className={classes.helpTitle}>* Nhập địa chỉ bạn muốn chọn vảo bản đồ và
                                            hoàn thành đơn tạo sự kiện</Typography>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <form className={classes.form}>
                                            <TextField
                                                className={classes.formInput}
                                                name="eventName"
                                                required
                                                type="text"
                                                label="Tên sự kiện"
                                                onChange={this.handleChange}
                                                value={this.state.eventName}
                                                helperText={this.errors}
                                                fullWidth
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={{className: classes.input}}
                                            />

                                            <Grid item sm={12}>
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
                                                    />
                                                </MuiPickersUtilsProvider>

                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        className={classes.picker}
                                                        label="Thời gian bắt đầu sự kiện"
                                                        value={this.state.startTime}
                                                        onChange={this.handleTimeChange}
                                                        InputLabelProps={{className: classes.input}}
                                                        InputProps={{className: classes.input}}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>

                                            <TextField
                                                className={classes.formInput}
                                                name="eventName"
                                                required
                                                disabled
                                                multiline
                                                rows="3"
                                                type="text"
                                                label="Địa chỉ sự kiện"
                                                onChange={this.handleChange}
                                                value={this.state.eventAddress}
                                                helperText={this.errors}
                                                fullWidth
                                                variant="outlined"
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={
                                                    {
                                                        className: classes.input
                                                    }
                                                }
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
                                                rows="4"
                                                helperText={this.errors}
                                                fullWidth
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={
                                                    {
                                                        className: classes.input
                                                    }
                                                }
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={this.addNewLocation}
                                                className={classes.customBtn}
                                            >
                                                Xác nhận
                                            </Button>
                                        </form>
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
    UI: state.UI
});

const mapDispatchToProps = {
    createNewLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanUp));




