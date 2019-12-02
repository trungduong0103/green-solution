import React, {Component} from 'react';

import {connect} from "react-redux";
import {signInWithFacebook, signInWithGoogle, signUp} from "../../redux/actions/UserActions";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "@material-ui/core";


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
        backgroundColor: "#eee",
        border: "none",
        padding: "12px 15px",
        margin: "5px 0 ",
        outline: "none",
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
        if (props.errors !== state.errors) {
            return {
                errors: props.errors
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
        const {classes} = this.props;
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
                    >
                    </TextField>

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

SignUp.propTypes = {
    // UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    // signUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.UI.errors
});

const mapDispatchToProps = {
    signInWithFacebook,
    signInWithGoogle,
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
