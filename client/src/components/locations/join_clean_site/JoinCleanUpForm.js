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
import {Typography} from "@material-ui/core";

const styles = {
    confirmBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        "&:hover":{
            backgroundColor: "rgb(99,151,68)",
        }
    },
    closeBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        "&:hover":{
            backgroundColor: "rgb(255,84,83)",
        }
    },
    collapseTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        paddingLeft: "1em"
    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
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
        const {userInfo} = this.state;
        userInfo.dateOfBirth = date;
        this.setState({userInfo});
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
        else {
            //TODO OPEN MODAL
            //MESSAGE: PLEASE CHECK YOUR FORM
            alert("False")
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

        if (data.dateOfBirth === "") {
            errors.phoneNumber = "Không được để trống";
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false;
        }
        return true;
    }

    render() {
        const {classes, loading, doneJoinLocation, alreadyJoinedLocation, location, openJoinLocationForm} = this.props;
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
                                InputLabelProps={{className: classes.input}}
                                InputProps={{className: classes.input}}
                            />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={userInfo.phoneNumber}
                                className={classes.textField}
                                helperText={errors.phoneNumber}
                                error={!!errors.phoneNumber}
                                onChange={this.handleChange}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{className: classes.input}}
                                InputProps={{className: classes.input}}
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
                                    label="Ngày sinh"
                                    fullWidth
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </CardContent>
                <br/>
                <FormControlLabel style={{paddingLeft: "1em"}} control={<Checkbox  color="primary"/>}
                                  onChange={this.requestTool} label={<Typography style={{fontFamily: "'Quicksand', sans-serif"}}>Yêu cầu dụng cụ</Typography>}/>
                <Collapse in={checked}>
                    <Typography className={classes.collapseTitle}>Chọn size áo</Typography>
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
                    <TextField InputLabelProps={{className: classes.input}}
                               InputProps={{className: classes.input}}
                               label="Thêm dụng cụ"
                               value={additionalInfo.tools}
                               name="tools"
                               onChange={this.handleEquipmentChange}/>
                </Collapse>
                {alreadyJoinedLocation ? <h4>Đã đăng ký tham gia</h4> :
                    <CardActions>
                        <Button style={{marginLeft: "auto"}} onClick={openJoinLocationForm} className={classes.closeBtn}>Đóng</Button>
                        {doneJoinLocation ?
                            (<CheckIcon className={classes.tickIcon}/>) :
                            (loading ? (
                                    <CircularProgress
                                        variant="indeterminate"
                                        size={40}
                                        className={classes.progress}
                                    />) : (
                                    <Button
                                        className={classes.confirmBtn}
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
