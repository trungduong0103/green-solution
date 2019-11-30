import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";
import logo from "../assets/imgs/MyLogo.png"
import Grid from "@material-ui/core/Grid"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button";

const styles = {
    logo: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    logo_wrapper: {
        width: 200,
        height: 120,
        padding: "20px"
    },
    info_wrapper: {
        width: 200,
        height: 120
    },
    copyright: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 11
    },
    footer_wrapper: {
        padding: 30,
        height: 200,
        width: "100%"
    },
    icon: {
        width: 50,
        height: 50
    },
    typo_txt: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 15
    },
    typo_title: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 17,
        fontWeight: "fontWeightMedium"
    },
    iconBtn: {
        color: "black",
        padding: "5px 10px 5px 5px",
        "&:hover": {
            backgroundColor: "transparent",
            color: "#4c7037"
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    textField: {
        // height: "100px",
        width: "300px"
    },
    input: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 15,
        border: "none",
        '&::placeholder': {
            fontFamily:"'Quicksand', sans-serif;",
            fontSize: 15,
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    subscribeBtn: {
        width: "120px",
        fontSize: 17,
        textTransform: "none",
        fontFamily:"'Quicksand', sans-serif;",
        color: "black",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            transition: "all 350ms ease-in-out",
        },
        marginTop: 20,
        border: "1px solid black",
    }

};

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container className={classes.footer_wrapper}>
                    <Grid item sm={3}>
                        <Grid container className={classes.logo_wrapper}>
                            <img src={logo} className={classes.logo} alt="logo"/>
                            <Typography variant="h6" className={classes.copyright}>
                                © 2019 Green Solution
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item sm={3}>
                        <Grid container className={classes.info_wrapper}>
                            <Typography className={classes.typo_title}>Green Solution HQ</Typography>
                            <Typography className={classes.typo_txt}>702 Nguyen Van Linh St, Ward 7</Typography>
                            <Typography className={classes.typo_txt}>Ho Chi Minh City, Vietnam</Typography>
                            <Typography className={classes.typo_txt}>Tel: +84 93412788</Typography>
                        </Grid>

                    </Grid>

                    <Grid item sm={3}>
                        <Grid container className={classes.social_wrapper}>
                            <Grid item sm={12}>
                                <Typography  className={classes.typo_title} >Connect with us</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton className={classes.iconBtn}>
                                    <Icon className="fab fa-facebook-f"/>
                                </IconButton>
                                <IconButton className={classes.iconBtn}>
                                    <Icon className="fab fa-twitter"/>
                                </IconButton>
                                <IconButton className={classes.iconBtn}>
                                    <Icon className="far fa-envelope"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={3}>
                        <Grid container className={classes.subscribe_wrapper}>
                            <Grid item sm={12}>
                                <Typography className={classes.typo_title}>Stay in touch with us </Typography>
                            </Grid>
                            <Grid item>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            id="standard-basic"
                                            className={classes.textField}
                                            label="Your Email"
                                            InputLabelProps={{
                                                className: classes.input
                                            }}
                                            InputProps={{
                                                className: classes.input
                                            }}
                                        />
                                    </div>
                                </form>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    className={classes.subscribeBtn}>
                                    Subscribe
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(Footer);
