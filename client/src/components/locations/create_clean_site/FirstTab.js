import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { cities, districts } from "../../../environments/Environments";


const styles = {
    wrapper: {
        padding: "30px"
    },

    formWrapper: {
        width: "50vw",
        height: "auto",
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
    menuSelect: {
        maxHeight: 500,
        maxWidth: 500
    },
    formControl: {
        width: "250px",
        paddingBottom: "10px"
    }
};

const today = new Date();

class FirstTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                street: "",
                district: "",
                city: "",

                name:"",
                address: "",
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
        if (data.name === "") errors.name = "Không được để trống";
        if (data.description === "") errors.description = "Không được để trống";
        if (data.street === "") errors.street = "Vui lòng nhập địa chỉ";
        if (data.district === "") errors.district = "Vui lòng chọn quận";
        if (data.city === "") errors.city = "Vui lòng chọn thành phố";
        if (data.agenda === "") errors.agenda = "Không được để trống";

        // if (data.startDate > data.endDate) errors.date = "Ngày kết thúc không hợp lệ";
        // if (data.startTime > data.endTime) errors.time = "Thời gian kết thúc không hợp lệ";
        // if (data.lat === 0 && data.lng === 0) errors.position = "Bạn chưa chọn địa điểm trên bản đồ";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
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
                <Grid item sm={3}></Grid>
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

                                        <Grid container spacing={4}>
                                            <Grid item sm={6}>
                                                <TextField
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
                                                    {districts.map(option => (
                                                        <MenuItem key={option.id} value={option.name} className={classes.input}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

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
                                                    {cities.map(option => (
                                                        <MenuItem key={option.id} value={option.name} className={classes.input}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>

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

                <Grid item sm={3}></Grid>
            </Grid>

        );
    }
}

// FirstTab.propTypes = {
//     continue: PropTypes.func.isRequired
// };

export default withStyles(styles)(FirstTab);
