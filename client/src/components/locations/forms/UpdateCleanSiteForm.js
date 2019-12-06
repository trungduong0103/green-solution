import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {closeUpdateSiteForm} from "../../../redux/actions/FormActions";
import {updateLocation} from "../../../redux/actions/LocationActions";
import dayjs from "dayjs";

const styles = {
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
        margin: "15%",
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
    }
};

class UpdateCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            errors: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.location) {
            return {
                location: props.location
            }
        }
        return null;
    }

    validateDataBeforeSubmit(data) {
        const errors = {};
        if (data.name === "") {
            errors.name = "Không được để trống"
        }
        if (data.description === "") {
            errors.description = "Không được để trống"
        }
        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false
        }

        return true;
    }

    handleChange = (event) => {
        let location = this.state.location;
        location[event.target.name] = event.target.value;
        this.setState({location})
    };

    handleDateChange = (date) => {
        const location = this.state.location;
        const updateDate = dayjs(date).format("YYYY-MM-DD");
        location.startDate = updateDate;
        this.setState({
            location: location,
            startDate: updateDate
        });
    };

    handleTimeChange = (time) => {
        const location = this.state.location;
        const updateTime = dayjs(time).format("HH:mm:ss");
        console.log(updateTime);
        location.startTime = updateTime;
        this.setState({
            location: location,
            startTime: time
        });
    };

    handleUpdateLocation = (event) => {
        // if (this.validateDataBeforeSubmit(data)) {
        //     event.preventDefault();
        //
        //     this.clearFormAndError();
        // } else {
        //     console.log("false")
        // }
        event.preventDefault();
        this.props.updateLocation(this.state.location, this.props.email);
    };

    handleCloseForm = () => {
        this.clearForm();
        this.props.closeUpdateSiteForm();
    };

    clearForm = () => {
        this.setState({location: {}, errors: {}});
    };

    render() {
        const {errors, location} = this.state;
        const {classes} = this.props;
        console.log(location);
        console.log(location.startTime);
        console.log(location.startDate);
        return (
            <div>
                <form>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <TextField
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
                        </Grid>

                        <Grid item sm={6}>
                            <TextField
                                name="description"
                                required
                                type="text"
                                label="Mô tả"
                                onChange={this.handleChange}
                                value={location.description}
                                helperText={errors.description}
                                error={!!errors.description}
                                fullWidth
                                InputLabelProps={{className: classes.input}}
                                InputProps={{className: classes.input}}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    label="Ngày bắt đầu sự kiện"
                                    className={classes.picker}
                                    invalidDateMessage="Ngày không hợp lệ"
                                    disablePast
                                    format="dd/MM/yyyy"
                                    id="date-picker-dialog"
                                    value={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item sm={6}>

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
                    <br/>
                    <Grid container>
                        <Grid item sm={3}/>
                        <Grid item sm={3}>
                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.handleUpdateLocation}>
                                Lưu
                            </Button>
                        </Grid>
                        <Grid item sm={3}>
                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.handleCloseForm}>
                                Huỷ
                            </Button>
                        </Grid>
                        <Grid item sm={3}/>
                    </Grid>
                </form>
            </div>
        );
    }
}

UpdateCleanSiteForm.propTypes = {};

const mapStateToProps = (state) => ({
    location: state.locationsData.location
});

const mapDisPatchToProps = {
    closeUpdateSiteForm,
    updateLocation
};

export default connect(mapStateToProps, mapDisPatchToProps)(withStyles(styles)(UpdateCleanSiteForm));
