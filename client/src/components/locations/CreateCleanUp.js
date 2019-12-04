import React, {Component} from 'react';
import DateFnsUtils from "@date-io/date-fns"
//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button"
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers"
import dayjs from "dayjs";

//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../redux/actions/LocationActions";
//React router

import NavBar from "../NavBar";
import {CreateCleanUpMap} from "./maps/CreateCleanUpMap";

const styles = {
    mapWrapper: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top: "15%",
        left: "2%",
        padding: 15
    },

    formWrapper: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        left: "55%",
        top: "20%",
        padding: 15
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
        fontSize: 30,
        textAlign: "center"
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 12,
        textAlign: "center"
    },
    text: {
        position: "absolute",
        top: "23%",
        left: "13%",
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 30,
    },

    createForm: {
        border: "1px solid black"
    },
    formInput: {
        margin: 10
    },
    customBtn: {
        fontFamily: "inherit",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "20px 0",
    },
    picker: {
        margin: "0 5px",

    }
};


class CreateCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],

            eventLat: 0,
            eventLng: 0,
            eventName: "",
            eventDescription:"",

            eventStartDate:"",
            eventStartTime:"",

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
            startDate: startDate
        });
    };

    handleTimeChange = (time) => {
        // const startTime = dayjs(time).format("h:mm:ss a");
        this.setState({
            startTime: time
        })
    };


    //Get marker position from user's search
    getLocation = (childData) => {
        this.setState({
            eventLat: childData.lat,
            eventLng: childData.lng
        })
    };

    addNewLocation = (event) => {
        event.preventDefault();
        this.props.createNewLocation({
            "name": this.state.eventName,
            "lat": this.state.eventLat,
            "lng": this.state.eventLng,
            "description": this.state.eventDescription,
            "startDate": this.state.startDate,
            // "startTime": this.state.eventStartTime
        })
    };

    printSomething = (event) => {
        event.preventDefault();
        console.log(`
            "Name": ${this.state.eventName},
            "Lat": ${this.state.eventLat},
            "Lng": ${this.state.eventLng},
            "Description": ${this.state.eventDescription},
            "StartDate": ${this.state.startDate},
            "StartTime": ${this.state.startTime}
        
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
                        <Typography
                            className={classes.title}
                        >Chọn địa điểm bạn muốn tạo sự kiện</Typography>

                        <CreateCleanUpMap handleCall={this.getLocation}/>

                    </Grid>

                    <Grid item sm={5} className={classes.formWrapper}>
                        <Grid container className={classes.createForm}>
                            <Grid item sm={12}>
                                <Typography className={classes.title}>Đơn tạo sự kiện</Typography>
                                <Typography className={classes.helpTitle}>* Nhập địa chỉ bạn muốn chọn vảo bản đồ và
                                    hoàn thành đơn tạo sự kiện</Typography>
                            </Grid>

                            <Grid item sm={12}>
                                <form>
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
                                    />


                                    <TextField
                                        className={classes.formInput}
                                        name="eventLat"
                                        required
                                        type="text"
                                        disabled
                                        label="Kinh độ"
                                        onChange={this.handleChange}
                                        value={this.state.eventLat}
                                        // variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.formInput}
                                        name="eventLng"
                                        disabled
                                        required
                                        type="text"
                                        label="Vĩ độ"
                                        onChange={this.handleChange}
                                        value={this.state.eventLng}
                                        // variant="outlined"
                                        fullWidth
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
                                            />
                                        </MuiPickersUtilsProvider>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                className={classes.picker}
                                                label="Thời gian bắt đầu sự kiện"
                                                ampm
                                                id="date-picker-dialog"
                                                value={this.state.startTime}
                                                onChange={this.handleTimeChange}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

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
                                    />



                                    <Button
                                        variant="contained"
                                        onClick={this.printSomething}
                                        className={classes.customBtn}
                                    >
                                        Xác nhận
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
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




