import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper"
import banner from "../assets/imgs/img1.jpg"
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

const styles = {
    // home_title: {
    //     align: "center",
    // },
    homeBanner: {
        // width: "650px",
        // height: "550px",
        width: "100%",
        height: "560px",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    banner: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    registerForm: {
        width:"520px",
        height: "440px",
        position: "absolute",
        backgroundColor: "rgb(99,151,68)",
        padding: "60px 40px",
        borderRadius: 0,

    },
    signUpBtn: {
        // width: "150px",
        fontSize: 20,
        textTransform: "none",
        fontFamily:"'Quicksand', sans-serif;",
        backgroundColor: "rgb(53,117,58)",
        color: "black",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            transition: "all 350ms ease-in-out",
        },
        // marginTop: 10,
        border: "1px solid rgb(74,117,58)",
    },
    typoTitle: {
        fontFamily: "'Merriweather', serif",
        fontWeight: "fontWeightMedium",
        fontSize: 50,
        color: "white"
    },
    typoText: {
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 17,
        color: "white"
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
                    <Grid item sm={12} md={12} lg={7}>
                        <Grid container className={classes.homeBanner}>
                            <img className={classes.banner} src={banner} alt="bannerBackground"/>
                        </Grid>

                    </Grid>

                    <Grid item sm={12} md={12} lg={5}>
                        <Paper className={classes.registerForm} elevation={0}>
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

                            <Typography className={classes.typoText} paragraph>
                                Ở thời điểm hiện tại, tồ chức chúng tôi đang triển khai nhiều chiến dịch dọn dẹp môi trường với hy vọng có thể giáo dục và nâng cao ý thức của thế hệ trẻ về bảo vệ môi trường.
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
