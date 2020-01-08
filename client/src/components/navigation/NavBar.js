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
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import avatar from "../../assets/imgs/img2.jpg"
// import PropTypes from 'prop-types';

import {openAuthenticationSnackbar} from "../../redux/actions/UIActions";
import {signUserOut} from "../../redux/actions/UserActions";
import jwtDecode from "jwt-decode";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Popover} from "@material-ui/core";

const styles = {
    appBar: {
        backgroundColor: "white",
        height: "80px",
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
        marginTop: 15
    },
    logoBtn: {
        marginRight: "auto",
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
        marginTop: 15,
    },
    avatar: {
        width: "50px",
        height: "50px",
    },
    avatarBtn: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    popoverMenu: {
        width: 300,
        height: 300
    }
};


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        }
    }

    handleProfileMenu = (event) => {
        this.setState({
            open: !this.state.open,
            anchorEl: event.currentTarget
        })
    };


    render() {

        const {classes} = this.props;
        const {anchorEl, open} = this.state;
        const auth = sessionStorage.getItem("FBIdToken");
        let email = "";
        if (auth) {
            const decodedIdToken = jwtDecode(auth);
            email = decodedIdToken.email;
        }

        return (
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolbar} style={{padding: "0 2% 0 2%"}} >
                    <Grid container>
                        <Grid item sm={3}>
                            <Button
                                component={Link}
                                to="/home"
                                className={classes.logoBtn}
                            >
                                <img src={logo} className={classes.logo} alt="logo" style={{ width: 200, height: 60}}/>
                            </Button>
                        </Grid>

                        <Grid item sm={6}>
                            <Grid container spacing={2} justify="center" alignItems="center">
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

                        <Grid item sm={3}>
                            <Grid container>
                                <Grid item sm={3}/>
                                <Grid item sm={9}>
                                    {auth ? (
                                        <Grid container justify="center" alignContent="center">
                                            <IconButton className={classes.avatarBtn} onClick={this.handleProfileMenu}>
                                                <Avatar
                                                    src={avatar}
                                                    className={classes.avatar}
                                                >
                                                </Avatar>
                                            </IconButton>
                                        </Grid>
                                        // <Button variant="contained"
                                        //         className={classes.signUpBtn}
                                        //         onClick={() => this.props.signUserOut()}>
                                        //     {`${email}`}
                                        // </Button>

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

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleProfileMenu}
                        // anchorOrigin={{
                        //     vertical: "bottom",
                        //     horizontal: "left"
                        // }}
                        // transformOrigin={{
                        //     vertical: "top",
                        //     horizontal: "left"
                        //
                        // }}
                    >

                        <MenuItem  to="/profile" component={Link} style={{fontFamily: "Quicksand, sans-serif"}}>Profile</MenuItem>
                        <MenuItem  style={{fontFamily: "Quicksand, sans-serif"}}>Logout</MenuItem>

                    </Menu>
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
