import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {clearAuthenticationErrors} from "../../redux/actions/UIActions";
import Snackbar from "@material-ui/core/Snackbar";

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
        this.state = {}
    }

    componentDidMount() {
        const auth = sessionStorage.getItem("FBIdToken");
        if (auth) {
            window.location.href = "/home";
        } else {
            this.handleAnimation()
        }
    }

    handleAnimation() {
        this.props.clearAuthenticationErrors();
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


    render() {
        const {UI: {openAuthenticationSnackbar}} = this.props;
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
                                <h1>Chào Bạn !</h1>
                                <p>Nhập thông tin cá nhân và bắt đầu cuộc hành trình với chúng tôi</p>
                                <button className="custom-btn ghost" id="signUp" onClick={() => this.handleAnimation()}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={openAuthenticationSnackbar}
                          message={"Vui lòng đăng nhập trước."}/>
            </div>
        );
    }
}

Authentication.propTypes = {
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    signUp: PropTypes.func
};

const mapStateToProps = state => ({
    UI: state.UI
});

const mapDispatchToProps = {
    clearAuthenticationErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
