import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {HCMC_DISTRICTS, VIETNAMESE_CITIES} from "../../../environments/Environments";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import dayjs from "dayjs";

const styles = {
    filterWrapper: {
        padding: "1em 1em 1em 1em"
    },
    formControl: {
        minWidth: 120
    }
};

const today = new Date();

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCity: "",
            filterDistrict: "",
            labelWidth: 0,
            startDate: today,
        }
    }

    handleCityChange = (event) => {
        const filterCity = event.target.value;
        this.setState({filterCity: filterCity});
        this.props.filterByCity(filterCity);
    };

    handleDistrictChange = (event) => {
        const filterDistrict = event.target.value;
        this.setState({filterDistrict: filterDistrict});
        this.props.filterByDistrict(filterDistrict);
    };

    handleDateChange = (date) => {
        const startDate = dayjs(date).format("YYYY-MM-DD");
        this.setState({startDate: startDate});
    };


    render() {
        const {classes} = this.props;
        const {filterCity, filterDistrict, startDate} = this.state;

        return (
            <Grid className={classes.filterWrapper} item sm={5} style={{border: "1px solid black"}}>
                <Grid spacing={2} container>
                    <Grid item sm={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel>City</InputLabel>
                            <Select value={filterCity} onChange={this.handleCityChange}>
                                {VIETNAMESE_CITIES.map(option =>
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.picker}
                                invalidDateMessage="Ngày không hợp lệ"
                                disablePast
                                format="dd/MM/yyyy"
                                id="date-picker-dialog"
                                value={startDate}
                                onChange={this.handleDateChange}
                                label="Ngày bắt đầu sự kiện"
                                InputLabelProps={{className: classes.input}}
                                InputProps={{className: classes.input}}
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

                <Grid spacing={2} container>
                    {filterCity === "Hồ Chí Minh" ? (
                        <Grid item sm={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    District
                                </InputLabel>
                                <Select value={filterDistrict} onChange={this.handleDistrictChange}>
                                    {HCMC_DISTRICTS.map(option =>
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : ""}
                </Grid>
            </Grid>
        );
    }
}

Filters.propTypes = {};

export default withStyles(styles)(Filters);
