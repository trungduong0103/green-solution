import React, {Component} from 'react'

import {signUp} from "../../redux/actions/UserActions";

import PropTypes from 'prop-types';

import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

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
                emailError: "",
                passwordError: "",
                confirmPassError: ""
            },

            formLoginErrors: {
                emailError: "",
                passwordError: ""
            }

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

    componentDidMount() {
        this.handleAnimation()
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

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.signUp({
    //         email: this.state.signUpEmail,
    //         password: this.state.signUpPassword,
    //         confirmPassword: this.state.signUpConfirmPassword
    //     }, this.props.history);
    // };

    // handleChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // };


    render() {

        // const {formSignUpErrors, formLoginErrors} = this.state;
        // const {classes, UI: {doneSignUp, loading}} = this.props;

        return (
            <div className="body">
                <div className="container" id="container">
                    <SignUp history={this.props.history}/>
                    <SignIn history={this.props.history}/>


                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Chào mừng bạn quay lại</h1>
                                <p>
                                    Giữ liên lạc với chúng tôi bằng cách đăng nhập bằng tài khoản cá nhân
                                </p>
                                <button className="custom-btn ghost" id="signIn" onClick={() => this.handleAnimation()}>
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Chào Bạn!</h1>
                                <p>Nhập thông tin cá nhân và bắt đầu cuộc hành trình với chúng tôi</p>
                                <button className="custom-btn ghost" id="signUp" onClick={() => this.handleAnimation()}>
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
