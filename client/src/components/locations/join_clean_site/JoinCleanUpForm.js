import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";
import {joinLocation} from "../../../redux/actions/LocationActions";
import {getUser} from "../../../redux/actions/UserActions";
import DateFnsUtils from "@date-io/date-fns";
import placeholderImage from "../../../assets/imgs/home_page_img.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

const styles = {
    customBtn: {marginLeft: "auto"},
    card: {minWidth: "550px"},
    treeView: {padding: "0 0 0 0.5em"}
};

const today = new Date();

class JoinCleanUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                email: "",
                phoneNumber: "",
                dateOfBirth: today
            },
            additionalInfo: {
                tShirtSize: "",
                tools: ""
            },
            checked: false,
            errors: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.setState({userInfo: this.props.user});
        }
        if (prevProps.locationId !== this.props.locationId) {
            const {additionalInfo} = this.state;
            additionalInfo.locationId = this.props.locationId;
            this.setState({additionalInfo});
        }
    }

    handleChange = (event) => {
        const {userInfo} = this.state;
        userInfo[event.target.name] = event.target.value;
        this.setState({userInfo});
    };

    handleStartDateChange = (date) => {
        const {user} = this.state.user;
        user.dateOfBirth = date;
        this.setState({user});
    };

    requestTool = () => {
        this.setState({checked: !this.state.checked});
    };

    handleEquipmentChange = (event) => {
        const {additionalInfo} = this.state;
        additionalInfo[event.target.name] = event.target.value;
        this.setState({additionalInfo});
    };

    handleJoinLocation = () => {
        const {userInfo} = this.state;
        const {additionalInfo} = this.state;
        if (this.validateData(userInfo)) {
            const userInfo_ = {};
            userInfo_.email = userInfo.email;
            userInfo_.phoneNumber = userInfo.phoneNumber;
            console.log(userInfo_);
            console.log(additionalInfo);
            this.props.joinLocation({
                userInfo: userInfo_,
                additionalInfo: additionalInfo
            });
            this.clearForm();
        }
    };

    clearForm = () => {
    };

    validateData(data) {
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
        const {classes, loading, doneJoinLocation, alreadyJoinedLocation, location} = this.props;
        const {errors, userInfo, additionalInfo, checked} = this.state;
        const availableSizes = ["S", "M", "L", "XL"];
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={location.logoUrl ? location.logoUrl : placeholderImage}
                                aria-label="location avatar"
                                className={classes.avatar}/>
                    }
                    title={location.name}
                    subheader={location.street}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item sm={6}>
                            <TextField
                                name="email"
                                placeholder="Email"
                                value={userInfo.email}
                                className={classes.textField}
                                helperText={errors.email}
                                error={!!errors.email}
                                onChange={this.handleChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={userInfo.phoneNumber}
                                className={classes.textField}
                                helperText={errors.phoneNumber}
                                error={!!errors.phoneNumber}
                                onChange={this.handleChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.picker}
                                    invalidDateMessage="Ngày không hợp lệ"
                                    format="dd/MM/yyyy"
                                    id="date-picker-dialog"
                                    value={userInfo.dateOfBirth}
                                    onChange={this.handleStartDateChange}
                                    label="DOB"
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </CardContent>
                <br/>
                <FormControlLabel style={{paddingLeft: "1em"}} control={<Checkbox color="primary"/>}
                                  onChange={this.requestTool} label="Request Tool"/>
                <Collapse in={checked}>
                    {availableSizes.map((size) =>
                        <FormControlLabel
                            key={size}
                            value={size}
                            name="tShirtSize"
                            control={<Radio color="primary"/>}
                            label={size}
                            labelPlacement="bottom"
                            onChange={this.handleEquipmentChange}
                        />
                    )}
                    <TextField label="More tools" value={additionalInfo.tools} name="tools" onChange={this.handleEquipmentChange}/>
                </Collapse>
                {alreadyJoinedLocation ? <h4>Already Joined</h4> :
                    <CardActions>
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
                    </CardActions>
                }
            </Card>

        );
    }
}

JoinCleanUpForm.propTypes = {};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    doneJoinLocation: state.UI.doneJoinLocation,
    alreadyJoinedLocation: state.UI.alreadyJoinedLocation,
    user: state.user.user
});

const mapDispatchToProps = {
    joinLocation,
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanUpForm));
