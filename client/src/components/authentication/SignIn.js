import React, {Component} from 'react';

import {signInWithEmail, signInWithFacebook, signInWithGoogle} from "../../redux/actions/UserActions";

import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: ""
        };
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
            password: this.state.password
        }, this.props.history);
    };


    render() {
        return (
            <div className="form-container sign-in-container">
                <form>
                    <h1 className="title">Đăng nhập</h1>
                    <div className="social-container">
                        <Button onClick={() => this.props.signInWithFacebook(this.props.history)}>
                            <i className="fab fa-facebook-f"/>
                        </Button>
                        <Button onClick={() => this.props.signInWithGoogle(this.props.history)}>
                            <i className="fab fa-google-plus-g"/>
                        </Button>
                    </div>
                    <span>hoặc sử dụng tài khoản</span>
                    <input type="text"
                           name="loginEmail"
                           placeholder="Email"
                           className="form-input"
                           id="loginEmail"
                           onChange={this.handleChange}
                           value={this.state.loginEmail}
                    />
                    <input type="password"
                           name="loginPassword"
                           placeholder="Mật khẩu"
                           className="form-input"
                           id="loginPassword"
                           onChange={this.handleChange}
                           value={this.state.loginPassword}
                    />
                    <button
                        onClick={this.loginWithEmail}
                        className="custom-btn">Đăng nhập
                    </button>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {};

const mapDispatchToProps = {
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle
};

export default connect(null, mapDispatchToProps)(SignIn);
