import React, {PureComponent} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    aboutContent: {
        height: "100%",
        backgroundColor: "rgb(99,151,68)",
        padding: "20px 40px",
        borderRadius: 0
    },
    moreBtn: {
        textAlign: "center",
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
        color: "white",
    },
    cardActions: {
        textAlign: "center"
    },
};

class AboutUsContent extends PureComponent {
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.aboutContent} elevation={0}>
                <CardContent>
                    <Typography variant="h4" gutterBottom className={classes.typoTitle}>
                        Giới thiệu về Việt Nam Sạch và Xanh
                    </Typography>

                    <Typography gutterBottom className={classes.typoText} paragraph>
                        Mục tiêu của Việt Nam Sạch và Xanh là nâng cao nhận thức về vấn đề rác và xả rác bừa bãi ở
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
                <CardActions className={classes.cardActions}>
                    <Button
                        variant="outlined"
                        className={classes.moreBtn}
                        component={Link}
                        to="/about-us">
                        Xem thêm
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(AboutUsContent);
