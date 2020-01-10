import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";
import {MapWithSearchBox} from "../maps/MapWithSearchBox";
import {HCMC_DISTRICTS, VIETNAMESE_CITIES} from "../../../environments/Environments";
import {closeUpdateSiteForm} from "../../../redux/actions/FormActions";
import {updateLocation} from "../../../redux/actions/LocationActions";
import {Typography} from "@material-ui/core";

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
    submitBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        color: "white",
        backgroundColor: "rgb(103,156,69)",
        padding: "5px 15px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "rgb(80,127,63)",
            outline: "none"
        }
    },
    cancelBtn: {
        marginRight: 20,
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        color: "black",
        backgroundColor: "rgb(203,78,71)",
        padding: "5px 15px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "rgb(185,72,66)",
            outline: "none"
        }

    },
};

const today = new Date();

class UpdateCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            organization: "",
            description: "",
            agenda: "",
            startDate: today,
            startTime: today,
            endTime: today,
            city: "",
            district: "",
            street: "",
            errors: {},
            step: 0
        }
    }

    componentDidMount() {
        if (this.props.location !== undefined) {
            const location = this.state;
            Object.entries(this.props.location).forEach(([key, value]) => {
                location[key] = value;
                if (key === "startDate") {
                    const split = value.split("-");
                    location[key] = new Date(split[0], split[1], split[2]);
                }
                if (key === "endTime") {
                    const split = value.split(":");
                    location[key] = new Date(0, 0, 0, split[0], split[1], 0);
                }
                if (key === "startTime") {
                    const split = value.split(":");
                    location[key] = new Date(0, 0, 0, split[0], split[1], 0);
                }
                this.setState(location);
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            if (this.props.location !== undefined) {
                const location = this.state;
                Object.entries(this.props.location).forEach(([key, value]) => {
                    location[key] = value;
                    if (key === "startDate") {
                        const split = value.split("-");
                        location[key] = new Date(split[0], split[1], split[2]);
                    }
                    if (key === "endTime") {
                        const split = value.split(":");
                        location[key] = new Date(0, 0, 0, split[0], split[1], 0);
                    }
                    if (key === "startTime") {
                        const split = value.split(":");
                        location[key] = new Date(0, 0, 0, split[0], split[1], 0);
                    }
                    this.setState(location);
                });
            }
        }

        if (prevProps.doneUpdateLocation !== this.props.doneUpdateLocation && this.props.doneUpdateLocation === true) {
            setTimeout(() => {
                this.props.close();
                setTimeout(() => {
                    this.setState({step: 0});
                }, 500);
            }, 2000);
        }
    }

    validateDataBeforeSubmit() {
        const errors = {};
        const {name, organization, agenda, startTime, endTime, city, street, district} = this.state;
        if (name === "") errors.name = "Không được để trống";
        if (organization === "") errors.organization = "Không được để trống";
        if (agenda === "") errors.agenda = "Không được để trống";
        if (city === "") errors.city = "Không được để trống";
        if (street === "") errors.street = "Không được để trống";
        if (district === "") errors.district = "Không được để trống";
        if (startTime > endTime) errors.time = "Thời gian bắt đầu của sự kiện không hợp lệ";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false;
        }
        return true;
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleDateChange = (date) => {
        this.setState({startDate: date});
    };

    handleStartTimeChange = (time) => {
        this.setState({startTime: time});
    };

    handleEndTimeChange = (time) => {
        this.setState({endTime: time});
    };

    updateLocationPosition = (childData) => {
        this.setState({lat: childData.lat, lng: childData.lng});
    };

    moveToNextStep = (event) => {
        event.preventDefault();
        const location = {};
        const id = this.state.id;
        Object.entries(this.state).forEach(([key, value]) => {
            if (key === "errors" || key === "step" || key === "id") return;
            location[key] = value;
            if (key === "startDate") {
                location[key] = `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
            }
            if (key === "startTime") {
                location[key] = `${value.getHours()}:${value.getMinutes()}`;
            }
            if (key === "endTime") {
                location[key] = `${value.getHours()}:${value.getMinutes()}`;
            }
        });

        const {step} = this.state;

        if (this.validateDataBeforeSubmit() && step === 0) {
            this.setState({step: this.state.step + 1});
        }
        if (this.validateDataBeforeSubmit() && step === 1) {
            this.props.updateLocation(location, id);
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
        const {location} = this.props;
        this.setState({location, step: 0});
    };

    render() {
        const {
            errors, step, name, organization, city, street, district,
            description, agenda, startDate, startTime, endTime, lat, lng
        } = this.state;
        const {classes, open, loading, doneUpdateLocation} = this.props;
        return (
            <Dialog style={{zIndex: 1}} fullWidth={step === 1} maxWidth={step === 1 ? "lg" : "md"} open={open}
                    onClose={this.props.close}>
                <form>
                    <Typography variant="h6" style={{fontFamily: "'Quicksand', sans-serif", textAlign: "center"}}>Cập nhật thông tin sự kiện</Typography>
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
                                    value={name}
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
                                    value={organization}
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
                                    value={description}
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
                                    value={agenda}
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
                        <Grid container spacing={4} style={{minHeight: "550px"}}>
                            <Grid item sm={5}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                label="Ngày bắt đầu sự kiện"
                                                className={classes.picker}
                                                invalidDateMessage="Ngày không hợp lệ"
                                                minDate={new Date()}
                                                disablePast
                                                format="dd/MM/yyyy"
                                                value={startDate}
                                                onChange={this.handleDateChange}
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={{className: classes.input}}
                                                fullWidth
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <br/>
                                    <Grid item sm={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                className={classes.picker}
                                                label="Thời gian bắt đầu sự kiện"
                                                value={startTime}
                                                onChange={this.handleStartTimeChange}
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
                                                label="Thời gian kết thúc sự kiện"
                                                value={endTime}
                                                onChange={this.handleEndTimeChange}
                                                InputLabelProps={{className: classes.input}}
                                                InputProps={{className: classes.input}}
                                                fullWidth
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <h4>{errors.time}</h4>

                                    <Grid style={{marginTop: "10%"}} item sm={12}>
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
                                            value={street}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>
                                    <br/>
                                    <Grid item sm={6}>
                                        <TextField
                                            fullWidth
                                            className={classes.formControl}
                                            select
                                            name="city"
                                            label="Tỉnh thành"
                                            value={city}
                                            onChange={this.handleChange}
                                            helperText={errors.city}
                                            error={!!errors.city}
                                            InputLabelProps={{className: classes.input}}
                                            inputProps={{className: classes.input}}
                                        >
                                            {VIETNAMESE_CITIES.map(option => (
                                                <MenuItem key={option.id} value={option.name}
                                                          className={classes.input}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField
                                            disabled={city === ""}
                                            fullWidth
                                            className={classes.formControl}
                                            select
                                            name="district"
                                            label="Quận/Huyện"
                                            value={district}
                                            onChange={this.handleChange}
                                            helperText={errors.district}
                                            error={!!errors.district}
                                            InputLabelProps={{className: classes.input}}
                                            inputProps={{className: classes.input}}
                                        >
                                            {HCMC_DISTRICTS.map(option => (
                                                <MenuItem key={option.id} value={option.name}
                                                          className={classes.input}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item sm={7}>
                                <MapWithSearchBox street={street} handleCall={this.updateLocationPosition}
                                                  center={{lat: lat, lng: lng}}/>
                            </Grid>
                        </Grid>
                        }
                    </DialogContent>

                    <DialogActions>
                        {doneUpdateLocation ? (
                            <CheckIcon fontSize="large" style={{marginTop: "5%", padding: "1.2em 0 1em 0"}}/>
                        ) : loading ? (<CircularProgress variant="indeterminate" size={32}
                                                         style={{marginTop: "5%", padding: "1.2em 0 1.2em 0"}}/>) :
                            <div>
                                <Button variant="contained"
                                        className={classes.cancelBtn}
                                        onClick={this.goBack}>
                                    {step === 0 ? "Huỷ" : "Quay Lại"}
                                </Button>

                                <Button variant="contained"
                                        className={classes.submitBtn}
                                        onClick={this.moveToNextStep}>
                                    Tiếp tục
                                </Button>
                            </div>}
                    </DialogActions>
                </form>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          open={Object.keys(errors).length !== 0}
                          message={"Vui lòng kiểm tra lại đơn"}/>
            </Dialog>
        );
    }
}

UpdateCleanSiteForm.propTypes = {};

const mapStateToProps = (state) => ({
    location: state.locationsData.location,
    loading: state.UI.loading,
    doneUpdateLocation: state.UI.doneUpdateLocation
});

const mapDisPatchToProps = {
    closeUpdateSiteForm,
    updateLocation
};

export default connect(mapStateToProps, mapDisPatchToProps)(withStyles(styles)(UpdateCleanSiteForm));
