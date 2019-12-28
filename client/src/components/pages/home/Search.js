import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import Fab from "@material-ui/core/Fab";

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
        this.props.reset();
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

Search.propTypes = {
    filterByKeyword: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
