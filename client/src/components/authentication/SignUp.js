import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {signInWithFacebook, signInWithGoogle, signUp} from "../../redux/actions/UserActions";
import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    textField: {
        border: "none",
    },
    buttonWrapper: {
        outline: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    formInput: {
        width: "80%",
        backgroundColor: "#eee",
        border: "none",
        padding: "12px 15px",
        margin: "5px 0 ",
        outline: "none",
    },
    successBtn: {
        outline: "none",
        fontFamily: "inherit",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "10px 30px",
        // letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
    progress: {
        marginTop:"5%"
    },
    icon: {
        color: "white"
    },
    registerBtn: {
        fontFamily: "inherit",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        // letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "10px 0",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        },
        "&:focus": {
            outline: "none"
        }
    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    tick: {
        marginTop: "5%"
    }

};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: "",

            formSignUpErrors: {
                emailError: "",
                passwordError: "",
                confirmPassError: ""
            },
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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    signUpWithEmail = (event) => {
        event.preventDefault();
        this.props.signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            confirmPassword: this.state.signUpConfirmPassword
        }, this.props.history);
    };

    render() {
        const {classes, UI: {loading, doneSignUp}} = this.props;
        const {errors} = this.state;
        return (
            <div className="form-container sign-up-container">
                <form>
                    <h1>Tạo tài khoản</h1>
                    <div className="social-container">
                        <Button
                            className={classes.buttonWrapper}
                            onClick={() => this.props.signInWithFacebook(this.props.history)}>
                            <i className="fab fa-facebook-f"/>
                        </Button>
                        <Button
                            className={classes.buttonWrapper}
                            onClick={() => this.props.signInWithGoogle(this.props.history)}>
                            <i className="fab fa-google-plus-g"/>
                        </Button>
                    </div>
                    <span>hoặc đăng ký bằng Email</span>
                    <TextField
                        type="text"
                        name="signUpEmail"
                        placeholder="Email"
                        className={classes.formInput}
                        helperText={errors.email}
                        error={!!errors.email}
                        id="signUpEmail"
                        onChange={this.handleChange}
                        value={this.state.signUpEmail}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input}}
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpPassword"
                        placeholder="Mật khẩu"
                        className={classes.formInput}
                        helperText={errors.password}
                        error={!!errors.password}
                        id="signUpPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input}}
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpConfirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        className={classes.formInput}
                        helperText={errors.confirmPassword}
                        error={!!errors.confirmPassword}
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpConfirmPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input}}
                    >
                    </TextField>


                    {loading ? (
                        <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>
                    ) : doneSignUp ? (<CheckIcon fontSize="large" className={classes.tick} />) : (<Button
                        variant="contained"
                        onClick={this.signUpWithEmail}
                        className={classes.registerBtn}
                        disabled={loading}
                    > Đăng Kí </Button>)}
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    // UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    // signUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signInWithFacebook,
    signInWithGoogle,
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
