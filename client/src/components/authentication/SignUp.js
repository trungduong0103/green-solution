import React, {Component} from 'react';

import {connect} from "react-redux";
import {signInWithFacebook, signInWithGoogle, signUp} from "../../redux/actions/UserActions";
import Button from "@material-ui/core/Button";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: ""
        }
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
        return (

            <div className="form-container sign-up-container">
                <form>
                    <h1>Tạo tài khoản</h1>
                    <div className="social-container">
                        <Button onClick={() => this.props.signInWithFacebook(this.props.history)}>
                            <i className="fab fa-facebook-f"/>
                        </Button>
                        <Button onClick={() => this.props.signInWithGoogle(this.props.history)}>
                            <i className="fab fa-google-plus-g"/>
                        </Button>
                    </div>
                    <span>hoặc đăng ký bằng Email</span>

                    <input
                        type="text"
                        name="signUpEmail"
                        placeholder="Email"
                        className="form-input"
                        id="signUpEmail"
                        onChange={this.handleChange}
                        value={this.state.signUpEmail}
                    >
                    </input>

                    <input
                        type="password"
                        name="signUpPassword"
                        placeholder="Mật khẩu"
                        className="form-input"
                        id="signUpPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpPassword}
                    >
                    </input>

                    <input
                        type="password"
                        name="signUpConfirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        className="form-input"
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpConfirmPassword}
                    >
                    </input>

                    <button
                        onClick={this.signUpWithEmail}
                        className="custom-btn"
                    > Đăng ký
                    </button>
                </form>
            </div>

        );
    }
}

SignUp.propTypes = {};

const mapDispatchToProps = {
    signInWithFacebook,
    signInWithGoogle,
    signUp
};

export default connect(null, mapDispatchToProps)(SignUp);
