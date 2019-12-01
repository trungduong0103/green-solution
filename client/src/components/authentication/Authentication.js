import React, {Component} from 'react'
import {signInWithEmail, signInWithFacebook, signInWithGoogle, signedIn} from "../../redux/actions/UserActions";
import {signUp} from "../../redux/actions/UserActions";

import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import withStyles from "@material-ui/core/styles/withStyles";
import CheckIcon from "@material-ui/icons/Check";

// Firebase import
import firebase from "../../environments/Firebase";
const provider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
    'display': 'popup'
});


const styles = {
    textField: {
        border: "none",
    },

    registerBtn: {
        outline: "none",
        fontFamily: "inherit",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        color: "black",
        fontSize: 13,
        padding: "12px 45px",
        letterSpacing: 1,
        textTransform: "uppercase",
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

    successBtn: {
        outline: "none",
        fontFamily: "inherit",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "12px 45px",
        letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
    progress: {
        color: "rgb(99,151,68)",
        position: "absolute",
    },
    icon: {
        color: "white"
    }

};


class Authentication extends Component {
     constructor(props) {
         super(props);
         this.state = {

             // Login form states
             loginEmail: "",
             loginPassword: "",

             //Sign up form states
             signUpEmail: "",
             signUpPassword: "",
             signUpConfirmPassword: "",

             // loading: false,

             formSignUpErrors: {
                 emailError:"",
                 passwordError:"",
                 confirmPassError:""
             },

             formLoginErrors: {
                 emailError: "",
                 passwordError: ""
             }

         }
     }

     handleAnimation() {
         const signUpButton = document.getElementById('signUp');
         const signInButton = document.getElementById('signIn');
         const container = document.getElementById('container');

         signUpButton.addEventListener('click', () => {
             container.classList.add("right-panel-active");
         });

         signInButton.addEventListener('click', () => {
             container.classList.remove("right-panel-active");
         });
     }

    validateSignUpForm() {
        let valid = true;

        if (this.state.signUpEmail == null || this.state.signUpEmail === "") {
            valid = false;
            this.state.formSignUpErrors.emailError = "Vui lòng nhập email"
        }

        if (this.state.signUpPassword == null || this.state.signUpPassword === "") {
            valid = false;
            this.state.formSignUpErrors.passwordError = "Vui lòng nhập mật khẩu"
        }

        if (this.state.signUpConfirmPassword == null || this.state.signUpConfirmPassword === "") {
            valid = false;
            this.state.formSignUpErrors.confirmPassError = "Vui lòng nhập mật khẩu xác nhận"
        }

        if (this.state.signUpPassword !== this.state.signUpConfirmPassword) {
            valid = false;
            this.state.formSignUpErrors.confirmPassError = "Mật khẩu xác nhận không trùng khớp"
        }
        return valid
    }

    validateLoginForm() {
        let valid = true;

        if (this.state.loginEmail == null || this.state.loginEmail === "") {
            valid = false;
            this.state.formLoginErrors.emailError = "Vui lòng nhập email"
        }

        if (this.state.loginPassword == null || this.state.loginPassword === "") {
            valid = false;
            this.state.formLoginErrors.passwordError = "Vui lòng nhập mật khẩu"
        }
        return valid
    }

    // Login functions
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
        if (this.validateLoginForm()) {
            console.log("Signing in w/ email");
            this.props.signInWithEmail({
                email: this.state.loginEmail,
                password: this.state.loginPassword
            }, this.props.history)
        }
        else {
            alert("Xin kiểm tra lại đơn đăng nhập của bạn !")
        }

    };

    handleFacebookSignOut = () => {
        firebase.auth().signOut().then(function () {
            alert("signed out");
        }).catch(function (error) {
            alert("error");
        });
    };

    //Register function
    handleSubmit = (event) => {
         if (this.validateSignUpForm()) {
             event.preventDefault();
             this.props.signUp({
                 email: this.state.signUpEmail,
                 password: this.state.signUpPassword,
                 confirmPassword: this.state.signUpConfirmPassword
             }, this.props.history);
         }
         else {
             alert("Xin kiểm tra lại đơn đăng ký của bạn !")
         }

    };


    handleChange(e) {
        e.preventDefault();

        const { name, value } = e.target;
        let formSignUpErrors = this.state.formSignUpErrors;
        let formLoginErrors = this.state.formLoginErrors;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        switch (name) {
            case "signUpEmail":
                formSignUpErrors.emailError =
                    emailPattern.test(String(value)) !== true
                        ? "Vui lòng nhập đúng format email"
                        : "";
                break;
            case "signUpPassword":
                formSignUpErrors.passwordError =
                    value.length === 0
                        ? "Mật khẩu không được để trống"
                        : "";
                break;
            case "signUpConfirmPassword":
                formSignUpErrors.confirmPassError =
                    value.length === 0
                        ? "Mật khẩu xác nhận không được để trống"
                        : "";
                break;
            case "loginEmail":
                formLoginErrors.emailError =
                    emailPattern.test(String(value)) !== true
                        ? "Vui lòng nhập đúng format email"
                        : "";
                break;
            case "loginPassword":
                formLoginErrors.passwordError =
                    value.length === 0
                        ? "Mật khẩu không được để trống"
                        : "";
                break;

            default:
                break;
        }
        this.setState({ formSignUpErrors, [name]: value }, () => console.log(this.state))

    }

    componentDidMount() {
        this.handleAnimation()
    }

    render() {
        const { formSignUpErrors, formLoginErrors  } = this.state;
        const {classes, UI: {doneSignUp, doneSignIn, loading}} = this.props;

        return (
            <div className="body">
                <div className="container" id="container">
                    <div className="form-container sign-up-container">

                        <form>
                            <h1>Tạo tài khoản</h1>
                             <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                            </div>
                            <span>hoặc đăng ký bằng Email</span>

                            <input
                                name="signUpEmail"
                                type="email"
                                placeholder="Email"
                                className="form-input"
                                id="signUpEmail"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpEmail}
                            >
                            </input>
                            {formSignUpErrors.emailError.length > 0 && (
                                <span className="error-message">{formSignUpErrors.emailError}</span>
                            )}

                            <input
                                name="signUpPassword"
                                type="password"
                                placeholder="Mật khẩu"
                                className="form-input"
                                id="signUpPassword"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpPassword}
                            >
                            </input>
                            {formSignUpErrors.passwordError.length > 0 && (
                                <span className="error-message">{formSignUpErrors.passwordError}</span>
                            )}


                            <input
                                name="signUpConfirmPassword"
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                className="form-input"
                                id="signUpConfirmPassword"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpConfirmPassword}
                            >
                            </input>
                            {formSignUpErrors.confirmPassError.length > 0 && (
                                <span className="error-message">{formSignUpErrors.confirmPassError}</span>
                            )}

                            <Button
                                variant="contained"
                                onClick={this.handleSubmit}
                                className={doneSignUp ? classes.successBtn : classes.registerBtn}
                                disabled={loading}
                            >
                                {doneSignUp ? "" : "Đăng ký"}
                                {loading ? (
                                    <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>
                                ) : ""}
                                {doneSignUp ? (
                                    <CheckIcon className={classes.icon}/>
                                ) : ""}

                            </Button>

                        </form>
                    </div>



                    <div className="form-container sign-in-container">
                        <form>
                            <h1 className="title">Đăng nhập</h1>
                            <div className="social-container">

                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>

                            </div>
                            <span>hoặc sử dụng tài khoản</span>

                            <input
                                name="loginEmail"
                                type="email"
                                placeholder="Email"
                                className="form-input"
                                id="loginEmail"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.loginEmail}
                            >
                            </input>
                                {formLoginErrors.emailError.length > 0 && (
                                    <span className="error-message">{formLoginErrors.emailError}</span>
                                )}

                            <input
                                name="loginPassword"
                                type="password"
                                placeholder="Mật khẩu"
                                className="form-input"
                                id="loginPassword"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.loginPassword}
                            >
                            </input>
                            {formLoginErrors.passwordError.length > 0 && (
                                <span className="error-message">{formLoginErrors.passwordError}</span>
                            )}

                            <Button
                                variant="contained"
                                className={doneSignIn ? classes.successBtn : classes.registerBtn}
                                disabled={loading}
                                onClick={this.handleEmailSignIn}
                            >
                                {doneSignIn ? "" : "Đăng nhập"}
                                {loading ? (
                                    <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>
                                ) : ""}
                                {doneSignIn ? (
                                    <CheckIcon className={classes.icon}/>
                                ) : ""}
                            </Button>


                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Mừng bạn quay lại</h1>
                                <p>
                                   Giữ liên lạc với chúng tôi bằng cách đăng nhập bằng tài khoản cá nhân
                                </p>
                                <button className="custom-btn ghost" id="signIn" onClick = { () => this.handleAnimation()}>
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Chào Bạn!</h1>
                                <p>Nhập thông tin cá nhân và bắt đầu cuộc hành trình với chúng tôi</p>
                                <button className="custom-btn ghost" id="signUp" onClick = { () => this.handleAnimation()}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
    signInWithEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signUp,
    signInWithFacebook,
    signInWithGoogle,
    signedIn,
    signInWithEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
