import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import Fab from "@material-ui/core/Fab";

import withStyles from "@material-ui/core/styles/withStyles";
import {filterByKeyword, resetFilters} from "../../../redux/actions/LocationFilterActions";

const styles = {
    searchWrapper: {
        padding: "1em 1em 1em 1em",
        width: "100%",
        margin: "10px 0"
    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    searchBtn: {
        width: 100,
        padding: "0 20px",
        color: "white",
        backgroundColor: "rgb(99,151,68)",
        fontFamily: "'Quicksand', sans-serif;",
        "&:hover": {
            backgroundColor: "rgb(99,151,68)",
        },
    }
};

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
            <Grid item sm={6} className={classes.searchWrapper}>
                <Grid container spacing={2}>
                    <Grid item sm={8}>
                        <TextField
                            variant="outlined"
                            className={classes.margin}
                            name="keyword"
                            value={keyword}
                            id="input-with-icon-textfield"
                            label="Tìm kiếm"
                            fullWidth
                            onChange={this.handleChange}
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {!keyword ? "": <ClearIcon onClick={this.resetKeyword} cursor="pointer" />}
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{className: classes.input}}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <Fab onClick={this.handleSearch} variant="extended" className={classes.searchBtn}>
                            Tìm
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
