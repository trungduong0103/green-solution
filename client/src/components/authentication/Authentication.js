import React, {Component} from 'react'
import {signInWithEmail, signInWithFacebook, signInWithGoogle, signedIn} from "../../redux/actions/UserActions";
import {signUp} from "../../redux/actions/UserActions";

import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/TextField"
import withStyles from "@material-ui/core/styles/withStyles";
import CheckIcon from "@material-ui/core/SvgIcon/SvgIcon";


const styles = {
    textField: {
        border: "none",


    },

    registerBtn: {
        fontFamily: "'Montserrat', sans-serif'",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        color: "black",
        fontSize: 13,
        padding: "12px 45px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "10px 0",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "1px solid black"
        }
    },

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
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            confirmPassword: this.state.signUpConfirmPassword
        }, this.props.history);
    };


     handleChange = (event) => {
         this.setState({
             [event.target.name]: event.target.value
         });
     };

    componentDidMount() {
        this.handleAnimation()
    }





    render() {

        const { formSignUpErrors, formLoginErrors  } = this.state;
        const {classes, UI: {doneSignUp, loading}} = this.props;

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

                            {/*<TextField*/}
                            {/*    variant="filled"*/}
                            {/*    id="signUpEmail"*/}
                            {/*    name="signUpEmail"*/}
                            {/*    type="email"*/}
                            {/*    label="Email"*/}
                            {/*    className={classes.textField}*/}
                            {/*    helperText={formSignUpErrors.emailError}*/}
                            {/*    error={!!formSignUpErrors.emailError}*/}
                            {/*    value={this.state.signUpEmail}*/}
                            {/*    onChange={this.handleChange}*/}
                            {/*    fullWidth*/}
                            {/*>*/}
                            {/*</TextField>*/}


                            {/*<TextField*/}
                            {/*    variant="filled"*/}
                            {/*    id="signUpPassword"*/}
                            {/*    name="signUpPassword"*/}
                            {/*    type="password"*/}
                            {/*    label="Mật khẩu"*/}
                            {/*    className={classes.textField}*/}
                            {/*    helperText={formSignUpErrors.passwordError}*/}
                            {/*    error={!!formSignUpErrors.passwordError}*/}
                            {/*    value={this.state.signUpPassword}*/}
                            {/*    onChange={this.handleChange}*/}
                            {/*    fullWidth*/}
                            {/*>*/}

                            {/*</TextField>*/}


                            {/*<TextField*/}
                            {/*    variant="filled"*/}
                            {/*    id="confirmPassword"*/}
                            {/*    name="confirmPassword"*/}
                            {/*    type="password"*/}
                            {/*    label="Xác nhận mật khẩu"*/}
                            {/*    className={classes.textField}*/}
                            {/*    helperText={formSignUpErrors.confirmPassError}*/}
                            {/*    error={!!formSignUpErrors.confirmPassError}*/}
                            {/*    value={this.state.signUpConfirmPassword}*/}
                            {/*    onChange={this.handleChange}*/}
                            {/*    fullWidth*/}
                            {/*>*/}
                            {/*</TextField>*/}

                            {/*<Button*/}
                            {/*    onClick={this.handleSubmit}*/}
                            {/*    variant="contained"*/}
                            {/*    className={doneSignUp ? classes.successBtn : classes.registerBtn}*/}
                            {/*    disabled={loading}*/}
                            {/*> {doneSignUp ? "Hoàn tất" : "Đăng ký"}*/}
                            {/*    {loading ? (*/}
                            {/*        <CircularProgress variant="indeterminate" size={35} className={classes.progress}/>*/}
                            {/*    ) : ""}*/}
                            {/*    {doneSignUp ? (*/}
                            {/*        <CheckIcon />*/}
                            {/*    ) : ""}*/}
                            {/*</Button>*/}

                            <input
                                type="text"
                                placeholder="Email"
                                className="form-input"
                                id="signUpEmail"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpEmail}
                            >
                            </input>


                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                className="form-input"
                                id="signUpPassword"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpPassword}
                            >
                            </input>



                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                className="form-input"
                                id="signUpPassword"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.signUpConfirmPassword}
                            >
                            </input>


                            <button
                                className="custom-btn"

                            > Đăng ký </button>

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

                            <input type="text" placeholder="Email" className="form-input"></input>
                            <input type="password" placeholder="Mật khẩu" className="form-input"></input>
                            <button className="custom-btn">Đăng nhập</button>
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
    signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

const mapDispatchToProps = {
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
