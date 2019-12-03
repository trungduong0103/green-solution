import React, {Component} from 'react';

//React Redux
import {connect} from "react-redux";

//React Router
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import logo from "../assets/imgs/website_logo.png"

//Material UI
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import {openAuthenticationSnackbar} from "../redux/actions/UIActions";
// import PropTypes from 'prop-types';

const styles = {
    appBar: {
        backgroundColor: "white",
        height: "100px",
        // height: "100px",
        justifyContent: "center"
    },
    navBtn: {
        outline: "none",
        textDecoration: "none",
        fontSize: 17,

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
        marginTop: 35
    },
    logo: {
        padding: 25,
        width: 200,
        height: 60
    },
    toolbar: {
        padding: "0 2% 0 2%",
    },
    signUpBtn: {
        fontSize: 15,
        textTransform: "uppercase",
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "rgb(99,151,68)",
        color: "white",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            backgroundColor: "#7F986F",
            color: "black",

        },
        marginTop: 35,
        // border: "1px solid white",

    },
    signInBtn: {

        fontSize: 15,
        borderRadius: 20,
        textTransform: "none",
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "#7da968",
        color: "black",
        "&:hover": {
            backgroundColor: "#4c7037",
            color: "black",
            transition: "all 350ms ease-in-out",
        },
        marginTop: 35,
        border: "1px solid black",
    }
};

class NavBar extends Component {


    render() {
        const {classes} = this.props;
        const auth = localStorage.getItem("FBIdToken");
        return (
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Grid container>

                        <Grid item sm={3} md={3}>

                            <img src={logo} className={classes.logo} alt="logo"/>

                        </Grid>


                        <Grid item sm={7} md={7}>

                            <Grid container spacing={5} justify="center">

                                <Grid item>
                                    <Button
                                        component={Link}
                                        to="/home"
                                        className={classes.navBtn}>
                                        Trang chủ
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button className={classes.navBtn}>
                                        Về chúng tôi
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        onClick={!auth ? () => this.props.openAuthenticationSnackbar() : () => console.log("logged in")}
                                        component={Link}
                                        to={auth ? "/create-cleanup" : "/authentication"}
                                        className={classes.navBtn}>
                                        Tạo sự kiện
                                    </Button>
                                </Grid>


                                <Grid item>
                                    <Button
                                        to="/join-cleanup"
                                        component={Link}
                                        className={classes.navBtn}>
                                        Tham gia sự kiện
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sm={2} md={2}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        className={classes.signUpBtn}
                                        component={Link}
                                        disabled = {!!auth}
                                        to="/authentication">
                                        {auth ? "LOGGED IN" : "Tham gia ngay"}

                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

// NavBar.propTypes = {};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

const mapDispatchToProps = {
    openAuthenticationSnackbar
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
