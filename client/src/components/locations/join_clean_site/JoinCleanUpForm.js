import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";
import {joinLocation} from "../../../redux/actions/LocationActions";
import {getUser} from "../../../redux/actions/UserActions";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const styles = {
};

const today = new Date();

class JoinCleanUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                phoneNumber: "",
                dateOfBirth: today
            },
            errors: {}
        }
    }

    componentDidMount() {
        if ("FBIdToken" in sessionStorage) {
            const decodedToken = jwtDecode(sessionStorage.getItem("FBIdToken"));
            this.props.getUser({email: decodedToken.email});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user, guest: false});
        }
    }

    handleChange = (event) => {
        const {user} = this.state;
        user[event.target.name] = event.target.value;
        this.setState({user});
    };

    handleStartDateChange = (date) => {
        const {user} = this.state.user;
        user.dateOfBirth = date;
        this.setState({user});
    };

    handleJoinLocation = () => {
        const data = {
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        };
        if (this.handleDataBeforeSubmit(data)) {
            this.props.joinLocation({
                email: this.state.email,
                location_id: this.props.locationId
            });
            this.clearForm();
        }
    };

    clearForm = () => {
        this.setState({
            errors: {}
        });
    };

    handleDataBeforeSubmit(data) {
        const errors = {};
        if (data.email === "") {
            errors.email = "Không được để trống";
        }

        if (data.phoneNumber === "") {
            errors.phoneNumber = "Không được để trống";
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false;
        }
        return true;
    }


    render() {
        const {classes, loading, doneJoinLocation} = this.props;
        const {errors, user} = this.state;
        return (
                <div className={classes.wrapper}>
                    <Grid container spacing={1} >
                        <Grid item sm={4}>
                            <TextField
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                className={classes.textField}
                                helperText={errors.email}
                                error={!!errors.email}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={user.phoneNumber}
                                className={classes.textField}
                                helperText={errors.email}
                                error={!!errors.email}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.picker}
                                    invalidDateMessage="Ngày không hợp lệ"
                                    format="dd/MM/yyyy"
                                    id="date-picker-dialog"
                                    value={user.dateOfBirth}
                                    onChange={this.handleStartDateChange}
                                    label="DOB"
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item sm={4}/>
                        <Grid item sm={4}>
                            {doneJoinLocation ?
                                (<CheckIcon className={classes.tickIcon}/>) :
                                (loading ? (
                                        <CircularProgress
                                            variant="indeterminate"
                                            size={40}
                                            className={classes.progress}
                                        />) : (
                                        <Button
                                            variant="contained"
                                            className={classes.customBtn}
                                            onClick={this.handleJoinLocation}>
                                            Đăng Kí
                                        </Button>
                                    )
                                )}
                        </Grid>
                        <Grid item sm={4}/>
                    </Grid>
                </div>
        );
    }
}

JoinCleanUpForm.propTypes = {};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    doneJoinLocation: state.UI.doneJoinLocation,
    user: state.user.user
});

const mapDispatchToProps = {
    joinLocation,
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUpForm));
