import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import ViewListIcon from "@material-ui/icons/ViewList"
import AppsIcon from "@material-ui/icons/Apps"
import locationAvatar from "../../assets/imgs/download.jpeg";
import Typography from "@material-ui/core/Typography"
import { CircularProgress } from "@material-ui/core";

const styles = {
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        padding: 10,
        textAlign: "center"
    },
    formTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
        textAlign: "center"
    },
    wrapper: {
        height: "auto",

    },
    card: {
        minWidth: 275
    },
    text: {
        "& a":{
            color:'green',
            textDecoration: 'none'
        }
    },

};

class RegisteredLocations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: 6
        };

    }

    setGrid = () => {
        this.setState({grid: 6})
    };

    setList = () => {
        this.setState({grid: 12})
    };

    render() {
        const { classes, locations, loaded } = this.props;
        const { grid } = this.state;
        return (
            <div>
                {loaded ? 
                
                <CircularProgress variant="indeterminate" className={classes.locationProgress2} />
                
                :
                    <div>
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            <IconButton onClick={this.setGrid}>
                                <AppsIcon />
                            </IconButton>
                            <IconButton onClick={this.setList}>
                                <ViewListIcon />
                            </IconButton>
                        </div>

                        <Grid container spacing={5} className={classes.wrapper}>
                            {locations.map(location => (
                                <Grid item xs={grid} key={location.id} className={classes.gridForm}>
                                    <Card>
                                    {grid === 6 ? (location.locationImages !== undefined && location.locationImages.length > 0) ?
                                            <CardMedia component="img"
                                                height="140"
                                                image={`${location.locationImages[0]}`}
                                                alt="Site's Image"
                                                title="Site's Image"
                                            /> : location.logoUrl !== undefined ? <CardMedia component="img"
                                                height="140"
                                                image={`${location.logoUrl}`}
                                                alt="Site's Image"
                                                title="Site's Image"
                                            /> : <CardMedia component="img"
                                                height="140"
                                                image={locationAvatar}
                                                alt="Site's Image"
                                                title="Site's Image"
                                                /> : <div></div>}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                                                <a href={`/cleanup-detail/${location.id}`} target="_blank" rel="noopener noreferrer">{location.name}</a>
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {location.description}
                                            </Typography>
                                        
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </div>
                }


            </div>
        )
    }
}

export default withStyles(styles)(RegisteredLocations)
