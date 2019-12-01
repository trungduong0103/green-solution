import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
//Material UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Material UI Icons
import CheckIcon from "@material-ui/icons/Check";

import {signUp} from "../../../redux/actions/UserActions";

const styles = {
    formContainer: {
        textAlign: "center"
    },
    pageTitle: {
        margin: "20px auto 20px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
    },
    registerBtn: {
        textTransform: "none",
        color: "white",
        backgroundColor: "#1976d2",
        "&:hover": {
            backgroundColor: "#1976d2"
        }
    },
    successBtn: {
        textTransform: "none",
        color: "white",
        backgroundColor: "#4caf50"
    },
    progress: {
        position: "absolute"
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            errors: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.UI.errors !== state.errors) {
            return {
                errors: props.UI.errors
            }
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp({
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }, this.props.history);
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes, UI: {doneSignUp, loading}} = this.props;
        const {errors} = this.state;

        return (
            <Grid container className={classes.formContainer}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>Register</Typography>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={!!errors.password}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={!!errors.confirmPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        <Button
                            onClick={this.handleSubmit}
                            variant="contained"
                            className={doneSignUp ? classes.successBtn : classes.registerBtn}
                            disabled={loading}
                        > {doneSignUp ? "Success" : "Register"}
                            {loading ? (
                                <CircularProgress variant="indeterminate" size={35} className={classes.progress}/>
                            ) : ""}
                            {doneSignUp ? (
                                <CheckIcon />
                            ) : ""}
                        </Button>
                        <br/>
                        <br/>
                        <small>Already have an account ? Login <Link to="/login">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Register.propTypes = {
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
