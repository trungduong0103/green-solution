import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper"
import banner from "../assets/imgs/home_banner.jpg"
import {Link} from "react-router-dom";
import Footer from "../components/Footer"
import NavBar from "./NavBar";

const styles = {
    // home_title: {
    //     align: "center",
    // },
    homeBanner: {
        // width: "650px",
        // height: "550px",
        width: "100%",
        height: "450px",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    banner: {
        maxWidth: "100%",
        maxHeight: "100%"
        // width: "100%",
        // height: "100%"
    },
    registerForm: {
        width: "700px",
        position: "absolute",
        top: "20%",
        right: "5%",
        padding: "40px",
        borderRadius: 0,

    },
    signUpBtn: {
        width: "150px",
        fontSize: 20,
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
    typoTitle: {
        fontFamily:"'Quicksand', sans-serif;",
        fontWeight: "fontWeightMedium",
        fontSize: 30
    },
    typoText: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 17
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes} = this.props;

        return (

            <div>
                <NavBar/>

                <Grid container>
                    <Grid item>
                        <Grid container className={classes.homeBanner}>
                            <img className={classes.banner} src={banner} alt="bannerBackground"/>
                        </Grid>

                    </Grid>

                    <Grid item sm={6}>
                        <Paper className={classes.registerForm} elevation={5}>
                            <Typography variant="h4" gutterBottom className={classes.typoTitle}>
                                Giới thiệu về Green Solution
                            </Typography>

                            <Typography gutterBottom className={classes.typoText} paragraph>
                                Mục tiêu của Green Solution là nâng cao nhận thức về vấn đề rác và xả rác bừa bãi ở Việt Nam.

                            </Typography>

                            <Typography className={classes.typoText} paragraph>
                                Chúng tôi hiểu rằng, trong khi có nhiều vấn đề khác tác động đến môi trường, chúng tôi tập trung vào vấn nạn xả rác bởi tin rằng đây là yếu tố cơ bản nhất dẫn đến những vấn đề môi trường khác
                                và là nền tảng trong chương trình giáo dục về bảo vệ môi trường.
                            </Typography>

                            {/*<Typography paragraph className={classes.typoText}>*/}
                            {/*    Clean Up Event owner has to be at least 18, but for participant, everyone is warmly welcomed.*/}
                            {/*    Ideal places for Clean Up event are beaches, parks, shared outdoor spaces and so on.*/}
                            {/*</Typography>*/}

                            {/*<Typography className={classes.typoText} >*/}
                            {/*    We will send you a starter kit once you finish registering.*/}
                            {/*</Typography>*/}

                            <Grid container justify="center">
                                <Button
                                    variant="outlined"
                                    className={classes.signUpBtn}
                                    component={Link}
                                    to="/register">
                                    Xem thêm
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>


                <Grid container>


                </Grid>


                {/*<Footer/>*/}

            </div>
        );
    }
}

export default withStyles(styles)(Home);
