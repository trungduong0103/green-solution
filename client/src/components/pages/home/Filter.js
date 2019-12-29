import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";
import {cities, districts} from "../../../environments/Environments";
import Chip from "@material-ui/core/Chip";
import {
    clearAllFilters,
    clearCityFilter,
    clearDistrictFilter,
    clearStartDateFilter,
    filterLocationsByCity,
    filterLocationsByDistrict,
    filterLocationsByStartDate
} from "../../../redux/actions/LocationActions";

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
        const {startDate} = this.state;
        startDate.setHours(0, 0, 0, 0);
        const filterCity = event.target.value;
        this.setState({filterCity: filterCity});
        if (startDate !== today) this.props.filterLocationsByCity(filterCity, startDate);
        else this.props.filterLocationsByCity(filterCity);
    };

    handleDistrictChange = (event) => {
        const {startDate, filterCity} = this.state;
        startDate.setHours(0, 0, 0, 0);
        const filterDistrict = event.target.value;
        this.setState({filterDistrict: filterDistrict});
        if (startDate !== today && filterCity) this.props.filterLocationsByDistrict(filterDistrict, filterCity, startDate);
        else if (filterCity) this.props.filterLocationsByDistrict(filterDistrict, filterCity);
        else this.props.filterLocationsByDistrict(filterDistrict);
    };

    handleDateChange = (date) => {
        const {filterCity} = this.state;
        this.setState({startDate: date});
        const dateToFilter = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        dateToFilter.setHours(0, 0, 0, 0);
        console.log(dateToFilter);
        if (filterCity) {
            this.props.filterLocationsByStartDate(dateToFilter, filterCity)
        }
        else this.props.filterLocationsByStartDate(dateToFilter);
    };

    handleDeleteDistrictFilter = () => {
        const {filterCity, startDate} = this.state;
        this.setState({filterDistrict: ""});
        if (filterCity && startDate !== today) this.props.clearDistrictFilter(filterCity, startDate);
        else this.props.clearDistrictFilter(this.state.filterCity);
    };

    handleDeleteCityFilter = () => {
        const {startDate} = this.state;
        this.setState({filterCity: ""});
        if (startDate !== today) this.props.clearCityFilter(startDate);
        else this.props.clearCityFilter();
    };

    handleDeleteStartDateFilter = () => {
        const {filterCity} = this.state;
        this.setState({startDate: today});
        if (filterCity) this.props.clearStartDateFilter(filterCity);
        else this.props.clearStartDateFilter();
    };

    handleClearAllFilters = () => {
        this.setState({filterCity: "", filterDistrict: "", startDate: today});
        this.props.clearAllFilters();
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
                                <MenuItem key={option.id} value={option.name}
                                          className={classes.menuSelect}>{option.name}</MenuItem>
                            )}
                        </TextField>
                    </Grid>

                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            select
                            disabled={filterCity === ""}
                            variant="outlined"
                            InputLabelProps={{className: classes.input}}
                            inputProps={{className: classes.input}}
                            label="Quận/huyện"
                            value={filterDistrict}
                            onChange={this.handleDistrictChange}
                        >
                            {districts.map(option =>
                                <MenuItem key={option.id} value={option.name}
                                          className={classes.menuSelect}>{option.name}</MenuItem>
                            )}
                        </TextField>
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    {startDate !== today ? (
                        <Chip label={`${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`}
                              variant="outlined" onDelete={this.handleDeleteStartDateFilter}/>
                    ) : ""}
                    {filterCity ? (
                        <Chip label={filterCity} variant="outlined" onDelete={this.handleDeleteCityFilter}/>
                    ) : ""}
                    {filterDistrict ? (
                        <Chip label={filterDistrict} variant="outlined" onDelete={this.handleDeleteDistrictFilter}/>
                    ) : ""}
                    {filterCity || startDate !== today ? (
                        <Chip label="Clear all" variant="outlined" onDelete={this.handleClearAllFilters}/>
                    ) : ""}
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = {
    filterLocationsByCity,
    filterLocationsByDistrict,
    filterLocationsByStartDate,
    clearCityFilter,
    clearDistrictFilter,
    clearStartDateFilter,
    clearAllFilters
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Filters));
