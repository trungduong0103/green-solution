import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import withStyles from "@material-ui/core/styles/withStyles";
import {filterByKeyword, resetFilters} from "../../../redux/actions/LocationFilterActions";

const styles = {};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSearch = () => {
        this.props.filterByKeyword(this.state.keyword);
    };

    resetKeyword = () => {
        this.setState({keyword: ""});
        this.props.resetFilters();
    };

    render() {
        const {classes} = this.props;
        const {keyword} = this.state;
        return (
            <Grid item sm={6} style={{border: "1px solid black"}}>
                <Grid container spacing={2}>
                    <Grid item sm={8}>
                        <TextField
                            variant="outlined"
                            className={classes.margin}
                            name="keyword"
                            value={keyword}
                            id="input-with-icon-textfield"
                            label="Location Search"
                            fullWidth
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {!keyword ? <SearchIcon/> : <ClearIcon onClick={this.resetKeyword} cursor="pointer" />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <Fab onClick={this.handleSearch} variant="extended">
                            Search
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = {
    filterByKeyword,
    resetFilters
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Search));
