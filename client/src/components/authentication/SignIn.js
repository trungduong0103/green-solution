import React, {Component} from 'react';

import {signInWithEmail, signInWithFacebook, signInWithGoogle} from "../../redux/actions/UserActions";

import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


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
        width: "100%",
        outline: "none",
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

    loginWithEmail = (event) => {
        event.preventDefault();
        this.props.signInWithEmail({
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }, this.props.history);
    };


    render() {
        const {classes} = this.props;
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
                    />


                    <TextField type="password"
                               name="loginPassword"
                               placeholder="Mật khẩu"
                               className={classes.formInput}
                               helperText={errors.password}
                               error={!!errors.password}
                               id="loginPassword"
                               onChange={this.handleChange}
                               value={this.state.loginPassword}
                    />
                    <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>

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

const mapStateToProps = (state) => ({
    errors: state.UI.errors
});

const mapDispatchToProps = {
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
