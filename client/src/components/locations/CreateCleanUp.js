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
import NavBar from "../NavBar";
import {CreateCleanUpMap} from "./maps/CreateCleanUpMap";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../redux/actions/LocationActions";
import Footer from "../Footer";
//React router


const today = new Date();
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
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 14,
        textAlign: "center",
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
        backgroundColor: "#F6EDD9",
        borderRadius: "10px 50px"
    },
    form: {
        backgroundColor: "#F6EDD9"
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
    progress: {
        position: "absolute",
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
    // notchedOutline: {
    //     borderColor: "white"
    // },
    successBtn: {
        outline: "none",
        // fontFamily: "inherit",
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
        height: "750px"
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
        const data = {
            name: this.state.eventName,
            description: this.state.eventDescription,
            address: this.state.eventAddress,
            startDate: this.state.eventStartDate,
            startTime: this.state.eventStartTime
        };
        if (this.validateDataBeforeSubmit(data)) {
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
        }
        else {
            console.log("false")
        }


    };

    clearFormAndError() {
        this.setState({
            errors: {}
        })
    }

    validateDataBeforeSubmit(data) {
        const errors ={};
        if (data.name === "") {
            errors.name = "Không được để trống"
        }
        if (data.description === "") {
            errors.description = "Không được để trống"
        }
        if (data.address === "") {
            errors.address = "Vui lòng chọn địa điểm"
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false
        }

        return true;
    }

    // printSomething = (event) => {
    //     event.preventDefault();
    //     console.log(`
    //         "Name": ${this.state.eventName},
    //         "Lat": ${this.state.eventLat},
    //         "Lng": ${this.state.eventLng},
    //         "Address": ${this.state.eventAddress},
    //         "Description": ${this.state.eventDescription},
    //         "StartDate": ${this.state.eventStartDate},
    //         "StartTime": ${this.state.eventStartTime}
    //
    //     `)
    // };

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            window.location.href = "/authentication";
        }
    }

    render() {
        const {classes, UI: {loading, doneCreateLocation}} = this.props;
        const {errors} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid container className={classes.wrapper}>
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
                                                helperText={errors.name}
                                                error={!!errors.name}
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
                                                helperText={errors.address}
                                                error={!!errors.address}
                                                onChange={this.handleChange}
                                                value={this.state.eventAddress}
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
                                                helperText={errors.description}
                                                error={!!errors.description}
                                                fullWidth
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={
                                                    {
                                                        className: classes.input
                                                    }
                                                }
                                            />

                                            {doneCreateLocation ? (

                                                <CheckIcon className={classes.check} />
                                            ):
                                                <Button
                                                    variant="contained"
                                                    onClick={this.addNewLocation}
                                                    disabled={loading}

                                                    className={doneCreateLocation ? classes.successBtn : classes.customBtn}
                                                > Xác Nhận
                                                    {loading ? (
                                                        <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>
                                                    ) : "" }
                                                </Button>
                                            }

                                        </form>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Footer/>
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




