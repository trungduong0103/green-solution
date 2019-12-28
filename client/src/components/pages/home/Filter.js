import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"
import {cities, districts} from "../../../environments/Environments";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";

import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const styles = {
    filterWrapper: {
        padding: "1em 1em 1em 1em",
        width: "100%",
    },
    input: {
        textAlign: "center",
        fontFamily: "'Quicksand', sans-serif;",
    },
    menuSelect: {
        fontFamily: "'Quicksand', sans-serif;",
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
        this.props.filterByStartDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        this.setState({startDate: date});
    };

    render() {
        const {classes} = this.props;
        const {filterCity, filterDistrict, startDate} = this.state;

        return (

            <Grid item sm={5} className={classes.filterWrapper}>

            <Grid className={classes.filterWrapper} item sm={6} style={{border: "1px solid black"}}>

                <Grid spacing={2} container>

                    <Grid item sm={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disablePast
                                autoOk
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                label="Ngày bắt đầu sự kiện"
                                views={["year", "month", "date"]}
                                value={startDate}
                                onChange={this.handleDateChange}
                                InputLabelProps={{className: classes.input}}
                                InputProps={{className: classes.input}}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item sm={4}>

                        <TextField
                            fullWidth
                            select
                            variant="outlined"
                            InputLabelProps={{className: classes.input}}
                            inputProps={{className: classes.input}}
                            label="Tỉnh thành"
                            value={filterCity}
                            onChange={this.handleCityChange}
                        >
                            {cities.map(option =>
                                <MenuItem key={option.id} value={option.name} className={classes.menuSelect}>{option.name}</MenuItem>
                            )}
                        </TextField>

                    </Grid>

                    {filterCity === "Hồ Chí Minh" ? (
                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                select
                                variant="outlined"
                                InputLabelProps={{className: classes.input}}
                                inputProps={{className: classes.input}}
                                label="Quận/huyện"
                                value={filterDistrict}
                                onChange={this.handleDistrictChange}
                            >
                                {districts.map(option =>
                                    <MenuItem key={option.id} value={option.name} className={classes.menuSelect}>{option.name}</MenuItem>
                                )}
                            </TextField>
                        </Grid>
                    ) : ""}
                </Grid>
            </Grid>
        );
    }
}

Filters.propTypes = {
    filterByDistrict: PropTypes.func.isRequired,
    filterByCity: PropTypes.func.isRequired,
    filterByStartDate: PropTypes.func.isRequired
};

export default withStyles(styles)(Filters);
