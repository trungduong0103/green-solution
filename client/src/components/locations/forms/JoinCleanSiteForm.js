import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from "react-redux";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import {joinLocation} from "../../../redux/actions/LocationActions";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const styles = {
    form: {
        padding: "0",
        textAlign: "left"
    },
    textField: {},
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

        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },
    progress: {
        marginLeft: "40%"
    },
    tickIcon: {
        marginLeft: "45%",
        width: 35,
        height: 35
    }
};

class JoinCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleJoinLocation = () => {
        const data = {
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        };
        if (this.handleDataBeforeSubmit(data)) {
            this.props.joinLocation({
                email: this.state.email,
                id: this.props.locationId
            });
            this.clearForm();
        }
    };

    clearForm = () => {
        this.setState({
            email: "",
            phoneNumber: "",
            errors: {}
        });
    };

    handleDataBeforeSubmit(data) {
        const errors = {};
        if (data.email === "") {
            errors.email = "Cannot be empty";
        }
        if (data.phoneNumber === "") {
            errors.phoneNumber = "Cannot be empty";
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false;
        }
        return true;
    }


    render() {
        const {classes, loading, doneJoinLocation} = this.props;
        const {errors} = this.state;
        return (
            <form className={classes.form}>
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            name="email"
                            value={this.state.email}
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            label="Email"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            label="Số điện thoại"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid item sm={4}/>
                    <Grid item sm={4}>
                        {doneJoinLocation ?
                            (
                                <CheckIcon className={classes.tickIcon}/>
                            ) :
                            (
                                loading ? (
                                    <CircularProgress
                                        variant="indeterminate"
                                        size={40}
                                        className={classes.progress}
                                    />
                                ) : (
                                    <Button
                                        className={classes.customBtn}
                                        onClick={this.handleJoinLocation}>
                                        Đăng Kí
                                    </Button>
                                )
                            )}
                    </Grid>
                    <Grid item sm={4}/>
                </Grid>
            </form>
        );
    }
}

JoinCleanSiteForm.propTypes = {};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    doneJoinLocation: state.UI.doneJoinLocation
});

const mapDispatchToProps = {
    joinLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinCleanSiteForm));
