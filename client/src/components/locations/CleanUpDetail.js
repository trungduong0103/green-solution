import React from 'react';
import {connect} from "react-redux";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";
import NavBar from "../navigation/NavBar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid"
import GridListTile from "@material-ui/core/GridListTile"
import placeholderImage from "../../assets/imgs/home_page_img.jpg";
import myImage from "../../assets/imgs/aboutus.jpg"
import img2 from "../../assets/imgs/img2.jpg"
import img1 from "../../assets/imgs/img1.jpg"
import Button from "@material-ui/core/Button"
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined'
import CardHeader from "@material-ui/core/CardHeader"
import {CleanUpDetailMap} from "./maps/CleanUpDetailMap"
import {GridList} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Chip from "@material-ui/core/Chip"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        backgroundColor: "#F6EDD9",
    },
    title: {

        fontFamily: "'Oswald', sans-serif;",
    },

    text: {
        fontFamily: "'Quicksand', sans-serif;",
    },

    margin: {
        marginTop: 10
    },
    gridContent: {
        height: "auto",
        margin: "5px 0"
    },


    gridHeader: {
        // backgroundColor: "#7da968",
        padding: "20px",
        marginTop: "10px",
        height: "auto",
    },

    image: {

        borderRadius: '50%',
        height: "80px",
        width: "80px",
        borderColor: "white",
        borderWidth: "3px",
        borderStyle: "solid",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",

    },
    locationGrid: {
        position: "relative",
    },

    mapCenter: {
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute"
    },
    card: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        padding: "20px",
        minWidth: "300px",
    },
    icon: {
        display: "inline",
        verticalAlign: "middle",
        padding: "0 5px"
    },
    joinButton: {
        width: "100%",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginTop: "20px"
    },
    mapContainer: {
        marginTop: "10px",
        width: "500px",
        height: "400px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    organizerAvatar: {
        height: "auto",
        justifyContent: "center",
        textAlign: "center"
    },
    mapGrid: {
        position: "relative",
        width: "100%",
        textAlign: "center",
    },

    gridListContainer: {
        height: "auto"
    },
    // grid: {
    //     margin: "10px 0"
    // },
    activeStatus: {
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "rgb(99,151,68)",
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "white"
    },
    deactBtn: {

    }



};

 const imageList = [
     {
         img: myImage,
     },
     {
         img: placeholderImage,
     },
     {
         img: img1,
     },
     {
         img: img2,
     },

 ];

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            maxStep: imageList.length,

            location: {
                organizer: "Đại học RMIT",
                name: 'Sự kiện dọn dẹp trường RMIT',
                description: 'Dọn trường',
                address: '702 Nguyễn Văn Linh Q7 TPHCM',
                startDate: '2019-12-24',
                startTime: '06:50:00',
                endDate: '2019-12-24',
                endTime: '14:30:00',
                agenda: "23:45: Meet up\n 00:00 - 01:30: Clean\n 01:30 - 02:00: Classify trash etc.",
                lat: 10.763963,
                lng: 106.68189970000003

            }
        }
    }

    displayImages(imageList) {
        const { classes } = this.props;
        if (imageList.length === 1) {
            return (
                <GridList cellHeight={200}>
                    <GridListTile>
                        <img src={imageList[0].img} alt="location-image"/>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 2) {
            return (
                <GridList cellHeight={200} cols={2} spacing={0}>
                    <GridListTile>
                        <img src={imageList[0].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt="location-image"/>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 3) {
            return (
                <GridList cellHeight={300} cols={3} spacing={0}>
                    <GridListTile>
                        <img src={imageList[0].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[2].img} alt="location-image"/>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 4) {
            return (
                <GridList cellHeight={200} cols={3} spacing={0}>
                    <GridListTile cols={2} rows={1}>
                        <img src={imageList[0].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[2].img} alt="location-image"/>
                    </GridListTile>
                    <GridListTile cols={2} rows={1}>
                        <img src={imageList[3].img} alt="location-image"/>
                    </GridListTile>
                </GridList>
            )
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>

                <Grid container>
                    {this.displayImages(imageList)}
                </Grid>

                <Grid container className={classes.gridHeader}>
                    <Grid item sm={2}/>

                    <Grid item sm={8}>
                        <Grid container>
                            <Grid item sm={8}>
                                <Grid container
                                      direction="column"
                                >
                                    <Typography variant="h3" className={classes.title}>{this.state.location.name}</Typography>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h5" className={classes.title}>Địa chỉ:</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant="h6" className={classes.text}>{this.state.location.address}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Trạng thái:</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Chip className={classes.activeStatus} label="Còn chỗ"></Chip>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Ngày bắt đầu:</Typography>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography variant="subtitle1" className={classes.text}>
                                                <EventNoteOutlinedIcon className={classes.icon}/>
                                                {`     ${this.state.location.startDate}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.margin}>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" className={classes.title}>Thời gian:</Typography>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography variant="subtitle1" className={classes.text}>
                                                <AccessTimeOutlinedIcon className={classes.icon}/>
                                                {`${this.state.location.startTime} - ${this.state.location.endTime}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item sm={1}></Grid>

                            <Grid item sm={3}>
                                <Grid container
                                      direction="column"
                                      alignItems="center"
                                      justify="center"
                                      className={classes.organizerAvatar}
                                >
                                    <img src={placeholderImage} alt="location-avatar" className={classes.image}/>
                                    <Typography variant="subtitle1" className={classes.text}>{this.state.location.organizer}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}></Grid>
                </Grid>

                <br/>

                <Grid container>
                    <Grid item sm={3}></Grid>
                    <Grid item sm={6}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item sm={3}></Grid>
                </Grid>

                <Grid container className={classes.gridHeader} spacing={3}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={4}>
                        <Grid container className={classes.gridContent}>
                            <Grid item>
                                <Grid container direction="column" >
                                    <Typography className={classes.title} variant="h6">Miêu tả:</Typography>
                                    <Typography className={classes.text} paragraph>{this.state.location.description}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.gridContent}>
                            <Grid item>
                                <Grid container direction="column" >
                                    <Typography className={classes.title} variant="h6">Lịch trình:</Typography>
                                    <Typography className={classes.text} paragraph>{this.state.location.agenda}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={6}>
                        <Grid container style={{textAlign: "center"}}>
                            <div>
                                <Typography gutterBottom variant="h4"  className={classes.title}>Bản đồ</Typography>
                                <div className={classes.mapContainer}>
                                    <CleanUpDetailMap coord={{lat: this.state.location.lat, lng: this.state.location.lng}}/>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    location: state.locationsData.location
});

const mapDispatchToProps = {
    getLocation,
    updateLocation,
    getAllLocations,
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CleanUpDetail));
