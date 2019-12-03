import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import banner from "../assets/imgs/img1.jpg"
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const styles = {
    registerForm: {
        height: "100%",
        backgroundColor: "rgb(99,151,68)",
        padding: "60px 40px",
        borderRadius: 0
    },
    signUpBtn: {
        fontSize: 20,
        textTransform: "none",
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "rgb(53,117,58)",
        color: "white",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            transition: "all 350ms ease-in-out",
        },
        marginTop: 10,
        border: "1px solid rgb(74,117,58)",
    },
    typoTitle: {
        fontFamily: "'Merriweather', serif",
        fontWeight: "fontWeightMedium",
        fontSize: 50,
        color: "white"
    },
    typoText: {
        fontFamily: "'Quicksand', sans-serif;",
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
                <GridList cols={2} cellHeight={600}>
                    <GridListTile>
                        <img src={banner} alt="bannerBackground"/>
                    </GridListTile>

                    <GridListTile>
                        <Card className={classes.registerForm} elevation={0}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom className={classes.typoTitle}>
                                    Giới thiệu về Green Solution
                                </Typography>

                                <Typography gutterBottom className={classes.typoText} paragraph>
                                    Mục tiêu của Green Solution là nâng cao nhận thức về vấn đề rác và xả rác bừa bãi ở
                                    Việt
                                    Nam.

                                </Typography>

                                <Typography className={classes.typoText} paragraph>
                                    Chúng tôi hiểu rằng, trong khi có nhiều vấn đề khác tác động đến môi trường, chúng
                                    tôi
                                    tập trung vào vấn nạn xả rác bởi tin rằng đây là yếu tố cơ bản nhất dẫn đến những
                                    vấn đề
                                    môi trường khác
                                    và là nền tảng trong chương trình giáo dục về bảo vệ môi trường.
                                </Typography>

                                <Typography className={classes.typoText} paragraph>
                                    Ở thời điểm hiện tại, tồ chức chúng tôi đang triển khai nhiều chiến dịch dọn dẹp môi
                                    trường với hy vọng có thể giáo dục và nâng cao ý thức của thế hệ trẻ về bảo vệ môi
                                    trường.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="outlined"
                                    className={classes.signUpBtn}
                                    component={Link}
                                    to="/register">
                                    Xem thêm
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                </GridList>


                <Grid container>

                </Grid>


                {/*<Footer/>*/}

            </div>
        );
    }
}

export default withStyles(styles)(Home);
