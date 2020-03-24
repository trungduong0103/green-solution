import React, {Component} from 'react';

import {signInWithEmail, signInWithFacebook, signInWithGoogle} from "../../redux/actions/UserActions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
//Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//Material UI Icons
import CheckIcon from "@material-ui/icons/Check";


const styles = {
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
        backgroundColor: "#eee",
        border: "none",
        padding: "12px 15px",
        margin: "5px 10px ",
        width: "80%",
        outline: "none",
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    successBtn: {
        outline: "none",
        fontFamily: "inherit",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
    progress: {
        marginTop: "5%"
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
        letterSpacing: 1,
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
    customError: {
        color: "red",
    },
    tick: {
        marginTop: "5%"
    }

};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
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


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    loginWithEmail = (event) => {
        event.preventDefault();
        this.props.signInWithEmail({
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }, this.props.history);
    };


    render() {
        const {classes, UI: {loading, doneSignIn}} = this.props;
        const {errors} = this.state;
        return (
            <div className="form-container sign-in-container">
                <form>
                    <h1 className="title">Đăng nhập</h1>
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
                    <span>hoặc sử dụng tài khoản</span>

                    <TextField type="text"
                               name="loginEmail"
                               placeholder="Email"
                               className={classes.formInput}
                               helperText={errors.email}
                               error={!!errors.email}
                               id="loginEmail"
                               onChange={this.handleChange}
                               value={this.state.loginEmail}
                               InputLabelProps={{className: classes.input}}
                               InputProps={
                                   {
                                       disableUnderline: true,
                                       className: classes.input
                                   }}
                    />
                    <TextField
                        type="password"
                        name="loginPassword"
                        placeholder="Mật khẩu"
                        className={classes.formInput}
                        helperText={errors.password}
                        error={!!errors.password}
                        id="loginPassword"
                        onChange={this.handleChange}
                        value={this.state.loginPassword}
                        InputLabelProps={{className: classes.input}}
                        InputProps={{disableUnderline: true, className: classes.input}}
                    />
                    <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    {loading ? (
                        <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>
                    ) : doneSignIn ? (<CheckIcon fontSize="large" className={classes.tick}/>) : (<Button
                        variant="contained"
                        onClick={this.loginWithEmail}
                        className={doneSignIn ? classes.successBtn : classes.registerBtn}
                        disabled={loading}
                    > Đăng Nhập </Button>)}
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    // UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    // signInWithEmail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
