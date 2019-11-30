import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Grid from "@material-ui/core/Grid";
import logo from "../assets/imgs/MyLogo.png"
//Icons
import Button from "@material-ui/core/Button";

const styles = {
    appBar: {
        backgroundColor: "white",
        height: "120px",
        justifyContent: "center"
    },
    navBtn: {
        outline: "none",
        textDecoration: "none",
        fontSize: 17,

        fontFamily:"'Quicksand', sans-serif;",
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
        height: 100
    },
    toolbar: {
        padding: "0 2% 0 2%",
    },
    signUpBtn: {
        width: "100px",
        fontSize: 15,
        borderRadius: 20,
        textTransform: "none",
        fontFamily:"'Quicksand', sans-serif;",
        color: "black",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            transition: "all 350ms ease-in-out",
        },
        marginTop: 35,
        border: "1px solid black",

    },
    signInBtn: {
        width: "120px",
        fontSize: 15,
        borderRadius: 20,
        textTransform: "none",
        fontFamily:"'Quicksand', sans-serif;",
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
        return (
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>

                    <Grid container>

                        <Grid item sm={2} md={2}>

                            <img src={logo} className={classes.logo} alt="logo"
                            />

                        </Grid>


                        <Grid item sm={8} md={8} >

                            <Grid container spacing={4} justify="center">

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

                                        className={classes.navBtn}>
                                        Tạo sự kiện
                                    </Button>
                                </Grid>


                                <Grid item>
                                    <Button
                                        to="/join_cleanup"
                                        component={Link}
                                        className={classes.navBtn}>
                                        Tham gia sự kiện
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item sm={2} md={2}>
                            <Grid container spacing={1} >
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        className={classes.signUpBtn}
                                        component={Link}
                                        to="/register">
                                        Đăng ký
                                    </Button>
                                </Grid>

                                <Grid item >
                                    <Button
                                        variant="outlined"
                                        className={classes.signInBtn}
                                        component={Link}
                                        to="/login">
                                        Đăng nhập
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

export default withStyles(styles)(NavBar);
