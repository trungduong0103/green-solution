import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from "react-redux";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import {joinLocation} from "../../../redux/actions/LocationActions";
import Button from "@material-ui/core/Button";

const styles = {
    form: {
        padding: "0",
        textAlign: "left"
    },
    textField: {}
};

class JoinCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phoneNumber: "",
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleJoinLocation = () => {
        const data = {
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        };

        if (this.handleDataBeforeSubmit(data)) {
            this.props.joinLocation({
                email: this.state.email,
                id: this.props.locationId
            });
            this.clearForm();
        }
    };

    clearForm = () => {
        this.setState({
            email: "",
            phoneNumber: "",
            errors: {}
        });
    };

    handleDataBeforeSubmit(data) {
        const errors = {};
        if (data.email === "") {
            errors.email = "Cannot be empty";
        }
        if (data.phoneNumber === "") {
            errors.phoneNumber = "Cannot be empty";
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false;
        }
        return true;
    }


    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        return (
            <form className={classes.form}>
                <Grid container>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            name="email"
                            value={this.state.email}
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            label="Email"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            label="Số điện thoại"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid item sm={4}/>
                    <Grid item sm={4}>
                        <Button
                            className={classes.joinButton}
                            onClick={this.handleJoinLocation}>
                            Đăng Kí
                        </Button>
                    </Grid>
                    <Grid item sm={4}/>
                </Grid>
            </form>
        );
    }
}

JoinCleanSiteForm.propTypes = {};

const mapDispatchToProps = {
    joinLocation
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(JoinCleanSiteForm));
