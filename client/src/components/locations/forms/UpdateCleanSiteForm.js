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

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

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
    },
    dialog:{
        width:'100%',
        height:'100%'
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
        location.startTime = dayjs(time).format("HH:mm:ss");
        this.setState({
            location: location,
            startTime: time
        });
    };

    handleUpdateLocation = (event) => {
        event.preventDefault();
        this.props.updateLocation(this.state.location, this.props.email);
        this.handleCloseForm();
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
        const {classes,open} = this.props;
        return (
            <Dialog open={open} onClose={() => this.handleCloseForm()}>
            <div>
                <form>
                
                <DialogTitle>Cập nhật thông tin sự kiện</DialogTitle>
                <DialogContent className={classes.dialog}>
                
                <Grid container spacing={5}>
                        <Grid item sm={6} >
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
                   
                    </DialogContent>

                    <DialogActions>
                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.handleUpdateLocation}>
                                Lưu
                            </Button>
                        
                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.handleCloseForm}>
                                Huỷ
                            </Button>
                        
                    </DialogActions>
            
                </form>
            </div>
            </Dialog>
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
