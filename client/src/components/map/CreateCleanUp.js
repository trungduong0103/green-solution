import React, {Component} from 'react';

//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button"
//React-redux
import {connect} from "react-redux";
import {createNewLocation} from "../../redux/actions/LocationActions";
//React router

import NavBar from "../NavBar";
import {CreateCleanUpMap} from "./CreateCleanUpMap";

const styles = {
    mapWrapper: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top: "20%",
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
        margin: "10px 0",
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
            eventStartDate: null,
            eventEndDate: null,
            startDate: null,
            endDate: null,
            errors: {},

        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
            "lng": this.state.eventLng
        })
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
                    <Grid item sm={7} md={7} className={classes.mapWrapper}>
                        <Typography
                            className={classes.title}
                        >Chọn địa điểm bạn muốn tạo sự kiện</Typography>

                        <CreateCleanUpMap handleCall={this.getLocation}/>

                    </Grid>

                    <Grid item sm={5} md={5} className={classes.formWrapper}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography className={classes.title}>Đơn tạo sự kiện</Typography>
                                <Typography className={classes.helpTitle}>* Nhập địa chỉ bạn muốn chọn vảo bản đồ và
                                    hoàn thành đơn tạo sự kiện</Typography>
                            </Grid>

                            <Grid item sm={12}>
                                <form className={classes.createForm}>
                                    <TextField
                                        className={classes.formInput}
                                        name="eventName"
                                        required
                                        type="text"
                                        label="Tên sự kiện"
                                        onChange={this.handleChange}
                                        value={this.state.eventName}
                                        variant="outlined"
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
                                        variant="outlined"
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
                                        variant="outlined"
                                        fullWidth
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
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // locations: state.locationsData.locations
});

const mapDispatchToProps = {
    createNewLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanUp));




