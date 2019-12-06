import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";
import logo from "../assets/imgs/website_logo.png"
import Grid from "@material-ui/core/Grid"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = {
    logo: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    logoWrapper: {
        width: 220,
        height: 120,
        padding: "20px"
    },
    infoWrapper: {
        width: 200,
        height: 120
    },
    copyright: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 11
    },
    footerWrapper: {
        padding: 20,
        height: 150,
        width: "100%",
        backgroundColor: "#F6FBF2",
        position: "absolute",
        // bottom: 0
    },
    icon: {
        width: 50,
        height: 50
    },
    typoText: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 12
    },
    typoTitle: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 17,
        textTransform: "uppercase",
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
    navBtn: {
        padding: 5,
        outline: "none",
        textDecoration: "none",
        fontSize: 12,
        fontFamily: "'Quicksand', sans-serif;",
        textTransform: "none",
        border: "none",

        "&:hover": {
            backgroundColor: "transparent",
            color: "#4c7037"
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },


};

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes} = this.props;

        return (

                <Grid
                    container
                    className={classes.footerWrapper}
                >

                    <Grid item sm={3}>
                        <Grid container className={classes.logoWrapper}>
                            <img src={logo} className={classes.logo} alt="logo"/>
                            <Typography variant="h6" className={classes.copyright}>
                                © 2019 Vietnam Sạch và Xanh
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item sm={3}>
                        <Grid container className={classes.infoWrapper} direction="row">
                            <Typography className={classes.typoTitle}>Navigation</Typography>
                            <Grid item sm={12}>
                                <Button
                                    component={Link}
                                    to="/"
                                    className={classes.navBtn}>
                                    Home
                                </Button>
                                <Button
                                    component={Link}
                                    to="/profile"
                                    className={classes.navBtn}>
                                    Profile
                                </Button>
                                <Button
                                    component={Link}
                                    to="/about-us"
                                    className={classes.navBtn}>
                                    About Us
                                </Button>
                                <Button
                                    component={Link}
                                    to="/create-cleanup"
                                    className={classes.navBtn}>
                                    Create Clean Up
                                </Button>
                                <Button
                                    component={Link}
                                    to="/join-cleanup"
                                    className={classes.navBtn}>
                                    Join Clean Up
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item sm={3}>
                        <Grid container className={classes.infoWrapper}>
                            <Typography className={classes.typoTitle}>Address</Typography>
                            <Typography className={classes.typoText}>101/66/26 Le Van Luong Street</Typography>
                            <Typography className={classes.typoText}>Nha Be District, Ho Chi Minh City, Vietnam</Typography>
                            <Typography className={classes.typoText}>Email: tam@vietnamsachvaxanh.org</Typography>
                        </Grid>

                    </Grid>

                    <Grid item sm={3}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography  className={classes.typoTitle} >Connect with us</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton className={classes.iconBtn} href="https://www.facebook.com/">
                                    <Icon className="fab fa-facebook-f"/>
                                </IconButton>
                                <IconButton className={classes.iconBtn} href="https://twitter.com">
                                    <Icon className="fab fa-twitter"/>
                                </IconButton>
                                <IconButton className={classes.iconBtn} href="https://mail.google.com/">
                                    <Icon className="far fa-envelope"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

        );
    }
}

export default withStyles(styles)(Footer);
