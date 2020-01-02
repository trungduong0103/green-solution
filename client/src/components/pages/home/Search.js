import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import Fab from "@material-ui/core/Fab";
import {DatePicker} from "@material-ui/pickers";

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
        this.props.reset();
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

Search.propTypes = {
    filterByKeyword: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
