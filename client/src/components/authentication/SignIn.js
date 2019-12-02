import React, {Component} from 'react';

import {signInWithEmail, signInWithFacebook, signInWithGoogle} from "../../redux/actions/UserActions";

import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core";


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
    }


};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",

            formLoginErrors: {
                emailError: "",
                passwordError: ""
            }
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
        const {classes} = this.props;
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
                    {/*<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>*/}

                    <button
                        onClick={this.loginWithEmail}
                        className="custom-btn">Đăng nhập
                    </button>
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

const mapDispatchToProps = {
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignIn));
