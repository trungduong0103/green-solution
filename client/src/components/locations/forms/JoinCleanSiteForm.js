import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles = {
    form: {
        padding: "0",
        textAlign: "left"
    },
    textField: {

    }
};

class JoinCleanSiteForm extends Component {

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.form}>
                <Grid container>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Email"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Số điện thoại"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </form>
        );
    }
}

JoinCleanSiteForm.propTypes = {};

export default withStyles(styles)(JoinCleanSiteForm);
