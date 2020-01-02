import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";
import {cities, districts} from "../../../environments/Environments";

const styles = {
    input: {
        textAlign: "center",
        fontFamily: "'Quicksand', sans-serif;",
    },
    menuSelect: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    filterWrapper: {
        padding: "1em 1em 1em 0",
        width: "100%",
        margin: "10px 0"
    },
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
    filterByCity: PropTypes.func.isRequired,
    filterByDistrict: PropTypes.func.isRequired,
    filterByStartDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Filters);
