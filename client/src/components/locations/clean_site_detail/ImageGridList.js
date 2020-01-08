import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import withStyles from "@material-ui/core/styles/withStyles";
import {GridList} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const styles = {
    iconButton:{
        right:"0",
        bottom:"0",
        position:"absolute",
        color:"white",
        "&:hover, &.Mui-focusVisible":{
            backgroundColor:"rgba(255,255,255,0.3)"
        },
        padding:"5px",
        margin:"10px"
    },
    image:{
        zIndex:0,
        position:"absolute"
    },
    text:{
        fontSize:"14px",
        paddingLeft:"5px"
    }
};


class ImageGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static displayImageGrid(imageList, classes, open) {
        if (imageList.length === 1) {
            return (
                <GridList cellHeight={400}>
                    <GridListTile>
                        <img src={imageList[0].img} alt={imageList[0].img}/>
                        <Button 
                            size="medium"
                            className={classes.iconButton}
                            onClick={()=>open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Upload Photos</Typography>
                        </Button>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 2) {
            return (
                <GridList cellHeight={400} cols={2} spacing={0}>
                    <GridListTile>
                        <img src={imageList[0].img} alt={imageList[0].img}/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt={imageList[1].img}/>
                        <Button 
                            size="medium"
                            className={classes.iconButton}
                            onClick={()=>open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Upload Photos</Typography>
                        </Button>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 3) {
            return (
                <GridList cellHeight={400} cols={3} spacing={0}>
                    <GridListTile>
                        <img src={imageList[0].img} alt={imageList[0].img}/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt={imageList[1].img}/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[2].img} alt={imageList[2].img}/>
                        <Button 
                            size="medium"
                            className={classes.iconButton}
                            onClick={()=>open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Upload Photos</Typography>
                        </Button>
                    </GridListTile>
                </GridList>
            )
        }
        else if (imageList.length === 4) {
            return (
                <GridList cellHeight={200} cols={3} spacing={0}>
                    <GridListTile cols={2} rows={1}>
                        <img src={imageList[0].img} alt={imageList[0].img}/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[1].img} alt={imageList[1].img}/>
                    </GridListTile>
                    <GridListTile>
                        <img src={imageList[2].img} alt={imageList[2].img}/>
                    </GridListTile>
                    <GridListTile cols={2} rows={1}>
                        <img src={imageList[3].img} alt={imageList[3].img}/>
                        <Button 
                            size="medium"
                            className={classes.iconButton}
                            onClick={()=>open()}>
                            <AddAPhotoIcon/>
                            <Typography className={classes.text}>Upload Photos</Typography>
                        </Button>
                    </GridListTile>
                </GridList>
            )
        }
    }

    render() {
        const { imageList, classes, open } = this.props;
        return(
            <div>
                {ImageGridList.displayImageGrid(imageList, classes, open)}
            </div>
        )
    }
}

export default withStyles(styles)(ImageGridList)
