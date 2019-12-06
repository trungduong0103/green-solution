import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

const styles = {
    customBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "15%",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    }
};

class UpdateCleanSiteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {errors} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <form>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <TextField
                                name="name"
                                required
                                type="text"
                                label="Tên sự kiện"
                                onChange={this.handleChange}
                                value={this.state.name}
                                helperText={errors.name}
                                error={!!errors.name}
                                fullWidth
                            />
                        </Grid>

                        <Grid item sm={6}>
                            <TextField
                                name="description"
                                required
                                type="text"
                                label="Mô tả"
                                onChange={this.handleChange}
                                value={this.state.description}
                                helperText={errors.description}
                                error={!!errors.description}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.picker}
                                    invalidDateMessage="Ngày không hợp lệ"
                                    disablePast
                                    format="dd/MM/yyyy"
                                    id="date-picker-dialog"
                                    value={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    label="Ngày bắt đầu sự kiện"
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className={classes.picker}
                                    label="Thời gian bắt đầu sự kiện"
                                    value={this.state.startTime}
                                    onChange={this.handleTimeChange}
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item sm={3}/>
                        <Grid item sm={3}>
                            <Button variant="contained" className={classes.customBtn}>
                                Lưu
                            </Button>
                        </Grid>
                        <Grid item sm={3}>
                            <Button variant="contained" className={classes.customBtn}>
                                Huỷ
                            </Button>
                        </Grid>
                        <Grid item sm={3}/>
                    </Grid>
                </form>
            </div>
        );
    }
}

UpdateCleanSiteForm.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDisPatchToProps = {
};

export default connect(mapStateToProps, mapDisPatchToProps)(withStyles(styles)(UpdateCleanSiteForm));
