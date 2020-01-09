import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import withStyles from "@material-ui/core/styles/withStyles";
import {GridList} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const styles = {
    iconButton: {
        right: "0",
        bottom: "0",
        position: "absolute",
        color: "black",
        "&:hover": {
            backgroundColor: "white"
        },
        padding: "7px",
        margin: "10px",
        backgroundColor: "white"
    },
    locationImg: {
        width: "100%", height: "100%"
    },
    text: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: "14px",
        paddingLeft: "5px",
        fontWeight: "bold"
    }
};


class ImageGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static displayImageGrid(imageList, classes, open, checkUser) {

        if (imageList.length === 1) {
            return (
                <GridList cellHeight={400}>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[0]} alt={imageList[0]}/>
                        {checkUser && <Button
                            size="medium"
                            className={classes.iconButton}
                            onClick={() => open()}>
                            <AddAPhotoIcon/>
                             <Typography className={classes.text}>Đăng ảnh</Typography>
                        </Button>}
                    </GridListTile>
                </GridList>
            )
        } else if (imageList.length === 2) {
            return (
                <GridList cellHeight={400} cols={2} spacing={0}>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[0]} alt={imageList[0]}/>
                    </GridListTile>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[1]} alt={imageList[1]}/>
                        {checkUser && <Button
                            size="medium"
                            className={classes.iconButton}
                            onClick={() => open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Đăng ảnh</Typography>
                        </Button>}
                    </GridListTile>
                </GridList>
            )
        } else if (imageList.length === 3) {
            return (
                <GridList cellHeight={400} cols={3} spacing={0}>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[0]} alt={imageList[0]}/>
                    </GridListTile>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[1]} alt={imageList[1]}/>
                    </GridListTile>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[2]} alt={imageList[2]}/>
                        {checkUser && <Button
                            size="medium"
                            className={classes.iconButton}
                            onClick={() => open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Đăng ảnh</Typography>
                        </Button>}
                    </GridListTile>
                </GridList>
            )
        } else if (imageList.length === 4) {
            return (
                <GridList cellHeight={200} cols={3} spacing={0}>
                    <GridListTile cols={2} rows={1}>
                        <img className={classes.locationImg} src={imageList[0]} alt={imageList[0]}/>
                    </GridListTile>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[1]} alt={imageList[1]}/>
                    </GridListTile>
                    <GridListTile>
                        <img className={classes.locationImg} src={imageList[2]} alt={imageList[2]}/>
                    </GridListTile>
                    <GridListTile cols={2} rows={1}>
                        <img className={classes.locationImg} src={imageList[3]} alt={imageList[3]}/>
                        {checkUser && <Button
                            size="medium"
                            className={classes.iconButton}
                            onClick={() => open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Đăng ảnh</Typography>
                        </Button>}
                    </GridListTile>
                </GridList>
            )
        }
    }

    render() {
        const {imageList, classes, open, checkUser} = this.props;
        return (
            <div style={{width: "100%"}}>
                {ImageGridList.displayImageGrid(imageList, classes, open, checkUser)}
            </div>
        )
    }
}

export default withStyles(styles)(ImageGridList)
