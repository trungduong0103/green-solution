import React, {Component} from 'react';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {
    signedIn,
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle,
    signOut
} from "../../../redux/actions/UserActions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//Firebase stuff
import firebase from "../../../environments/Firebase";
import CheckIcon from "@material-ui/icons/Check";

const provider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
    'display': 'popup'
});

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
    loginBtn: {
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
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
    },
    progress: {
        position: "absolute"
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.UI.errors !== state.errors) {
            return {
                errors: props.UI.errors
            }
        }
        return null;
    }

    showUser = () => {
        this.props.signedIn()
    };

    handleFaceBookSignIn = () => {
        console.log("signing in w/ facebook");
        this.props.signInWithFacebook();
    };

    handleGoogleSignIn = () => {
        console.log("signing in w/ google");
        this.props.signInWithGoogle();
    };

    handleEmailSignIn = () => {
        console.log("signing in w/ email");
        this.props.signInWithEmail({
            email: this.state.email,
            password: this.state.password
        }, this.props.history)
    };

    handleFacebookSignOut = () => {
        this.props.signOut();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const {classes, UI: {loading, doneSignIn}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.formContainer}>
                <Grid item sm/>
                <Grid>
                    <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
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
                    <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={doneSignIn ? classes.successBtn : classes.loginBtn}
                        disabled={loading}
                        onClick={this.handleEmailSignIn}
                    >
                        {doneSignIn ? "Success" : "Login"}
                        {loading ? (
                            <CircularProgress variant="indeterminate" size={35} className={classes.progress}/>
                        ) : ""}
                        {doneSignIn ? (
                            <CheckIcon />
                        ) : ""}
                    </Button>
                    <br/>
                    <br/>
                    <Typography>or</Typography>
                    <br/>
                    <Button onClick={this.handleFaceBookSignIn}>
                        Sign In With Facebook
                    </Button>
                    <br/>
                    <Button onClick={this.handleGoogleSignIn}>
                        Sign In With Google
                    </Button>
                    <br/>
                    <Button onClick={this.handleFacebookSignOut}>
                        Sign Out
                    </Button>
                    <br/>
                    <Button onClick={this.showUser}>
                        Show Current User
                    </Button>
                    <br/>
                    <br/>
                    <small>Don't have an account ? Sign up <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    signInWithEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle,
    signedIn,
    signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
