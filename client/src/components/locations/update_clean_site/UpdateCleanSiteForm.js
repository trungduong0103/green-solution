import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import {closeUpdateSiteForm} from "../../../redux/actions/FormActions";
import {updateLocation} from "../../../redux/actions/LocationActions";

const styles = {
    formInput: {
        color: "white"
    },

    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    dialog: {
        width: '100%',
        height: '100%'
    },
};

class UpdateCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            errors: {},
            step: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            this.setState({location: this.props.location});
        }
    }

    validateDataBeforeSubmit(data) {
        const errors = {};
        const {location} = this.state;
        if (location.name === "") errors.name = "Không được để trống";
        if (location.organization === "") errors.organization = "Không được để trống";
        if (location.agenda === "") errors.agenda = "Không được để trống";

        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false
        }
        return true;
    }

    handleChange = (event) => {
        const {location} = this.state;
        location[event.target.name] = event.target.value;
        this.setState({location});
    };

    handleDateChange = (date) => {
        const location = this.state.location;
        const updateDate = dayjs(date).format("YYYY-MM-DD");
        location.startDate = updateDate;
        this.setState({location: location, startDate: updateDate});
    };

    handleTimeChange = (time) => {
        const location = this.state.location;
        location.startTime = dayjs(time).format("HH:mm:ss");
        this.setState({location: location, startTime: time});
    };

    moveToNextStep = (event) => {
        event.preventDefault();
        const {location} = this.state;
        if (this.validateDataBeforeSubmit(location)) {
            this.setState({step: this.state.step + 1});
        }
    };

    goBack = () => {
        this.setState({errors: {}});
        const {step} = this.state;
        if (step === 0) {
            this.clearForm();
            this.props.close();
        } else {
            this.setState({step: this.state.step - 1});
        }
    };

    clearForm = () => {
        this.setState({location: this.props.location, errors: {}});
    };

    render() {
        console.log(this.state.location, this.props.location);
        const {errors, step, location} = this.state;
        const {classes, open} = this.props;
        return (
            <Dialog open={open} onClose={() => this.props.close()}>
                <div>
                    <form>
                        <DialogTitle>Cập nhật thông tin sự kiện</DialogTitle>
                        <DialogContent style={{overflow: "hidden"}} className={classes.dialog}>
                            {step === 0 &&
                            <Grid container spacing={5}>
                                <Grid item sm={12}>
                                    <TextField
                                        className={classes.textField}
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
                                    <br/>
                                    <br/>
                                    <TextField
                                        name="organization"
                                        required
                                        type="text"
                                        label="Tổ Chức"
                                        onChange={this.handleChange}
                                        value={location.organization}
                                        helperText={errors.organization}
                                        error={!!errors.organization}
                                        fullWidth
                                        InputLabelProps={{className: classes.input}}
                                        InputProps={{className: classes.input}}
                                    />


                                </Grid>

                                <Grid item sm={12}>
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
                                    <br/>
                                    <br/>
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
                                        rows="2"
                                        helperText={errors.agenda}
                                        error={!!errors.agenda}
                                        fullWidth
                                        InputLabelProps={{className: classes.input}}
                                        InputProps={{className: classes.input}}
                                    />
                                </Grid>
                            </Grid>
                            }

                            {step === 1 &&
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
                            }
                        </DialogContent>

                        <DialogActions>
                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.goBack}>
                                {step === 0 ? "Huỷ" : "Quay Lại"}
                            </Button>

                            <Button variant="contained"
                                    className={classes.customBtn}
                                    onClick={this.moveToNextStep}>
                                Tiếp tục
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
