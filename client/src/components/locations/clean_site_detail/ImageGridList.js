import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import withStyles from "@material-ui/core/styles/withStyles";
import {GridList} from "@material-ui/core";

const styles = {

};


class ImageGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static displayImageGrid(imageList) {
        if (imageList.length === 1) {
            return (
                <GridList cellHeight={400}>
                    <GridListTile>
                        <img src={imageList[0].img} alt={imageList[0].img}/>
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
                    </GridListTile>
                </GridList>
            )
        }
    }

    render() {
        const { imageList } = this.props;
        return(
            <div>
                {ImageGridList.displayImageGrid(imageList)}
            </div>
        )
    }
}

export default withStyles(styles)(ImageGridList)
