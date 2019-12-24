import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageDropZone from "../../pages/ImageDropZone";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 17,
        // textAlign: "center",
    },
    confirmBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        borderRadius: 20,
        color: "black",
        border: "1px solid green",
        backgroundColor: "#63a95a",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "20px 0 0 30px",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "#3b763b",
            color: "white",
            // border: "1px solid black",
            outline: "none"
        }
    },
    successBtn: {
        outline: "none",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
};

class SecondTab extends Component {
    render() {
        const {classes} = this.props;
        return (
                <Grid container>
                    <Grid item sm={2}/>
                    <Grid item sm={8}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Typography className={classes.helpTitle}>Logo của bạn</Typography>
                                    <ImageDropZone/>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item sm={4}>
                                        <Button
                                            onClick={this.props.prevStep}
                                            variant="contained"
                                            className={classes.customBtn}
                                        >Trở lại</Button>
                                        <Button
                                            onClick={this.addNewLocation}
                                            variant="contained"
                                            className={classes.confirmBtn}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}/>
                </Grid>
        );
    }
}

SecondTab.propTypes = {
    prevStep: PropTypes.func.isRequired
};

export default withStyles(styles)(SecondTab);
