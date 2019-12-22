import React, {Component} from 'react';

//React Redux
import {connect} from "react-redux";

//React Router
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import logo from "../../assets/imgs/website_logo.png"

//Material UI
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
// import PropTypes from 'prop-types';

import {openAuthenticationSnackbar} from "../../redux/actions/UIActions";
import {signUserOut} from "../../redux/actions/UserActions";
import jwtDecode from "jwt-decode";
import CreateCleanUp from "../locations/CreateCleanUp";
import CleanUpFormDetail from "../locations/forms/CleanUpFormDetail";

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
        width: 200,
        height: 60
    },
    logoBtn: {
        outline: "none",
        textDecoration: "none",
        textTransform: "none",
        border: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
        padding: 25,
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
        },
        marginTop: 35,
    }
};

class NavBar extends Component {
    render() {
        const {classes} = this.props;
        const auth = localStorage.getItem("FBIdToken");
        let email = "";
        if (auth) {
            const decodedIdToken = jwtDecode(auth);
            email = decodedIdToken.email;
        }

        return (
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Grid container>
                        <Grid item sm={3}>
                            <Button
                                component={Link}
                                to="/home"
                                className={classes.logoBtn}
                            >
                                <img src={logo} className={classes.logo} alt="logo"/>
                            </Button>
                        </Grid>

                        <Grid item sm={5}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        onClick={!auth ? () => this.props.openAuthenticationSnackbar() : () => console.log("logged in")}
                                        component={Link}
                                        to={auth ? "/profile" : "/authentication"}
                                        className={classes.navBtn}>
                                        Hồ sơ
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        component={Link}
                                        to="/about-us"
                                        className={classes.navBtn}>
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

                        <Grid item sm={4}>
                            <Grid container>
                                <Grid item sm={5}/>
                                <Grid item sm={7} >
                                    {auth ? (
                                        <Button variant="contained"
                                                className={classes.signUpBtn}
                                                onClick={() => this.props.signUserOut()}>
                                            {`${email}`}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            className={classes.signUpBtn}
                                            component={Link}
                                            disabled={!!auth}
                                            to="/authentication">
                                            Tham gia ngay
                                        </Button>
                                    )}
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
    openAuthenticationSnackbar,
    signUserOut
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
