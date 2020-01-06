import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";
import {VIETNAMESE_CITIES, HCMC_DISTRICTS} from "../../../environments/Environments";
import {
    filterByCity,
    filterByDistrict,
    filterByStartDate,
    resetFilters
} from "../../../redux/actions/LocationFilterActions";


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
    chip: {
        fontFamily: "'Quicksand', sans-serif;",
    }
};

const today = new Date();
today.setHours(0, 0, 0, 0);

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCity: "",
            filterDistrict: "",
            labelWidth: 0,
            startDate: today,
            filters: {
                startDate: today,
                cities: [],
                districts: []
            }
        }
    }

    handleCityChange = (event) => {
        const cityToFilter = event.target.value;
        const {filters} = this.state;
        const {cities, startDate} = this.state.filters;
        if (!cities.includes(cityToFilter)) filters.cities.push(cityToFilter);
        this.setState({filterCity: cityToFilter, startDate});
        if (startDate !== today) return this.props.filterByCity(cities, startDate);
        return this.props.filterByCity(cities);
    };

    handleDistrictChange = (event) => {
        const districtToFilter = event.target.value;
        const {filters} = this.state;
        const {cities, startDate, districts} = this.state.filters;
        if (!districts.includes(districtToFilter)) filters.districts.push(districtToFilter);
        this.setState({filterDistrict: districtToFilter, filters});
        if (startDate !== today && cities.length !== 0) return this.props.filterByDistrict(districts, cities, startDate);
        if (startDate !== today && cities.length === 0) return this.props.filterByDistrict(districts, cities);
        return this.props.filterByDistrict(districts);
    };

    handleDateChange = (date) => {
        const {filters} = this.state;
        const {cities, districts} = this.state.filters;
        const dateToFilter = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        filters.startDate = dateToFilter;
        this.setState({startDate: dateToFilter, filters});
        if (cities.length !== 0 && districts.length === 0) return this.props.filterByStartDate(dateToFilter, cities);
        if (districts.length !== 0) return this.props.filterByStartDate(dateToFilter, cities, districts);
        return this.props.filterByStartDate(dateToFilter);
    };

    handleResetFilters = () => {
        const {filters} = this.state;
        filters.cities = [];
        filters.districts = [];
        filters.startDate = today;
        this.setState({filters});
        this.props.resetFilters();
    };

    render() {
        const {classes} = this.props;
        const {filterCity, filterDistrict, startDate, filters} = this.state;
        const {cities, districts} = this.state.filters;
        return (
            <Grid item sm={6} className={classes.filterWrapper}>
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
                            {VIETNAMESE_CITIES.map(option =>
                                <MenuItem key={option.id} value={option.name}
                                          className={classes.menuSelect}>{option.name}</MenuItem>
                            )}
                        </TextField>
                    </Grid>

                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            select
                            disabled={!filters.cities.includes("Hồ Chí Minh")}
                            variant="outlined"
                            InputLabelProps={{className: classes.input}}
                            inputProps={{className: classes.input}}
                            label="Quận/huyện"
                            value={filterDistrict}
                            onChange={this.handleDistrictChange}
                        >
                            {HCMC_DISTRICTS.map(option =>
                                <MenuItem key={option.id} value={option.name}
                                          className={classes.menuSelect}>{option.name}</MenuItem>
                            )}
                        </TextField>
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    {filters.startDate !== today ? (
                        <Chip label={`${filters.startDate.getFullYear()}-${filters.startDate.getMonth()+1}-${filters.startDate.getDate()}`}
                              variant="outlined" className={classes.chip}/>
                    ) : ""}
                    {cities ? (
                        cities.map((city, index) =>
                            <Chip key={index} label={city} variant="outlined" className={classes.chip}/>
                        )
                    ) : ""}
                    {districts ? (
                        districts.map((district, index) =>
                            <Chip key={index} label={district} variant="outlined" className={classes.chip}/>
                        )
                    ) : ""}
                    {filters || startDate !== today ? (
                        <Chip label="Clear all" variant="outlined" onClick={this.handleResetFilters} className={classes.chip}/>
                    ) : ""}
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = {
    filterByStartDate,
    filterByCity,
    filterByDistrict,
    resetFilters
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Filters));
