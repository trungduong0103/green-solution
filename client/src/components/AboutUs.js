import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import banner from "../assets/imgs/aboutus.jpg"
import inspire1 from "../assets/imgs/inspire1.jpg"
import inspire2 from "../assets/imgs/inspire2.jpg"
import inspire3 from "../assets/imgs/inspire3.jpg"
import inspire4 from "../assets/imgs/inspire4.jpg"
import NavBar from "./NavBar";
import Footer from "./Footer"

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const styles = {
    aboutContent: {
        height: "100%",
        backgroundColor: "#D1D1B7",
        padding: "20px 20px",
        borderRadius: 0
    },
    typoTitle: {
        padding: "0.5em 0 0 0",
        fontFamily: "'Merriweather', serif",
        fontWeight: "fontWeightMedium",
        fontSize: 30,
        color: "black",
        textAlign: "center"
    },
    typoText: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 17,
        color: "black"
    },
    gridList: {
        padding: 0
    },
    image: {
        width: 300,
        height: 200
    }

};

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes} = this.props;

        return (

            <div>
                <NavBar/>

                <GridList cols={2} cellHeight={800} spacing={0}>
                    <GridListTile>
                        <img src={banner} alt="bannerBackground"/>
                    </GridListTile>

                    <GridListTile>
                        <Card className={classes.aboutContent} elevation={0}>
                            <CardContent>
                                <Typography className={classes.typoText} paragraph>
                                    Mục tiêu của Việt Nam Sạch & Xanh (VNSVX) là nâng cao nhận thức về vấn đề rác và xả
                                    rác bừa bãi ở Việt Nam. Chúng tôi hiểu rằng, trong khi có nhiều vấn đề khác tác động
                                    đến môi trường, chúng tôi tập trung vào vấn nạn xả rác bởi tin rằng đây là yếu tố cơ
                                    bản nhất dẫn đến những vấn đề môi trường khác và là nền tảng trong chương trình giáo
                                    dục về bảo vệ môi trường. Chúng tôi tự hỏi rằng: “Làm sao để có thể giáo dục cộng
                                    đồng về những chủ đề như biến đổi khí hậu, phát triển bền vững, tái chế và năng
                                    lượng tái tạo trong khi ngay việc vứt rác đúng nơi quy định nhiều người vẫn chưa làm
                                    được?”
                                </Typography>
                                <Typography className={classes.typoText} paragraph>
                                    Bắt đầu từ năm 2013, chương trình đầu tiên của chúng tôi – Ruy Băng Xanh – đã chiến
                                    thắng Cuộc thi quốc tế Youth4Asia 2015 (Tuổi trẻ vì Châu Á) – được tài trợ bởi Ngân
                                    Hàng Phát Triển Châu Á (ADB) – khi chúng tôi làm việc với 15 trường đại học tại Việt
                                    Nam và kêu gọi được 40.000 lời cam kết không xả rác từ cộng đồng. VNSVX vô cùng vinh
                                    hạnh khi được giới thiệu Ruy Băng Xanh tới Bộ trưởng Môi Trường của các nước trong
                                    Khu vực sông Mêkong Mở rộng ở Myanmar và một lần nữa, vào năm 2016 tại Hội Thảo
                                    Thanh niên Châu Á ở Philippines.
                                </Typography>
                                <Typography className={classes.typoText} paragraph>
                                    Tháng 4 năm 2015, chúng tôi triển khai chương trình thứ hai – Dọn rác vì Cộng Đồng
                                    (Community Clean Up) ở Đảo Phú Quốc. Từ đó trở đi, tổ chức đã phát triển chương
                                    trình này đến Hà Nội, Tp. Hồ Chí Minh, Hội An, Huế và Cần Thơ và đã kết hợp với hơn
                                    50 tổ chức cùng tham gia.
                                </Typography>
                                <Typography className={classes.typoText} paragraph>
                                    Năm 2016, VNSVX phát triển những nhân vật cho Biệt Đội Rùa Xanh – một chiến dịch mới
                                    dành cho trẻ em. Chúng tôi tâm đắc rằng những nhân vật gần gũi này sẽ giáo dục trẻ
                                    em về tác hại của việc xả rác. Đối tác của tổ chức trong những nỗ lực này là Trung
                                    tâm Truyền Thông và Thiết kế của Đại học RMIT, gồm các bạn sinh viên đã thiết kế
                                    hình tượng cho Biệt Đội và trường Quốc Tế Nam Sài Gòn, nơi mà các bé học sinh tiểu
                                    học và cấp 2 đã sáng tạo nên những trò chơi thú vị dựa trên các nhân vật của Biệt
                                    Đội Rùa Xanh.
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>
                </GridList>
                <Typography className={classes.typoTitle}>Nguồn cảm hứng</Typography>
                <GridList cols={4} cellHeight={300} spacing={5} className={classes.gridList}>
                    <GridListTile>
                        <img
                            className={classes.image}
                            src={inspire1}
                            alt="bannerBackground"/>
                    </GridListTile>
                    <GridListTile>
                        <img
                            className={classes.image}
                            src={inspire2}
                            alt="bannerBackground"/>
                    </GridListTile>
                    <GridListTile>
                        <img
                            className={classes.image}
                            src={inspire3}
                            alt="bannerBackground"/>
                    </GridListTile>
                    <GridListTile>
                        <img
                            className={classes.image}
                            src={inspire4}
                            alt="bannerBackground"/>
                    </GridListTile>
                </GridList>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(styles)(AboutUs);
