import React, {Component} from 'react';

import withStyles from "@material-ui/core/styles/withStyles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import avatar from "../../../assets/imgs/download.jpeg"

const styles = {
    listWrapper: {
        maxHeight: 500,
        overflow: "auto"
    },
    locationAvatar: {
        height: "120px",
        width: "120px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    },
    text: {
        fontFamily:"'Quicksand', sans-serif;",
        "& a":{
            color:'green',
            textDecoration: 'none'
        }
    },
    locationCard: {
        boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
        width: 800,
        padding: "0 20px"
    }
};

class CleanSitesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {locations, classes} = this.props;
        return (
            <List>
                {locations.map((location, index) =>
                    <div key={location.id}
                         onMouseEnter={() => this.props.enlarge(index)}
                         onMouseLeave={this.props.minimize}>
                        <List className={classes.listWrapper}>
                            <ListItem>
                                <Card className={classes.locationCard}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item sm={4}>
                                                <img alt="location-avatar" src={avatar} className={classes.locationAvatar}/>
                                            </Grid>
                                            <Grid item sm={8}>
                                                <Typography variant="h5" component="h5" className={classes.text}>
                                                    <a href={`/cleanup-detail/${location.id}`} target="_blank" rel="noopener noreferrer">{location.name}</a>
                                                </Typography>
                                                <Typography variant="subtitle1" className={classes.text}>{location.address}</Typography>
                                                <Typography variant="subtitle2" className={classes.text}>{location.description}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </ListItem>
                        </List>
                    </div>
                )}
            </List>
        );
    }
}

CleanSitesList.propTypes = {};

export default withStyles(styles)(CleanSitesList);
