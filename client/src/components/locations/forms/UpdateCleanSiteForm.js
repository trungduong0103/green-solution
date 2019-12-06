import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {closeUpdateSiteForm} from "../../../redux/actions/FormActions";
import {updateLocation} from "../../../redux/actions/LocationActions";

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
    }
};

class UpdateCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            errors: {}
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

    handleChange = (event) => {
        let location = this.state.location;
        location[event.target.name] = event.target.value;
        this.setState({location})
    };

    handleUpdateLocation = (event) => {
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
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
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
