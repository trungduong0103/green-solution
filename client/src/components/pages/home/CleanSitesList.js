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
        maxHeight: 600,
        overflowY: "scroll"
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
    },
    title: {
        fontFamily:"'Quicksand', sans-serif;",
        color: "rgb(99,151,68)"
    },
    locationCard: {
        boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
        width: 800,
        padding: "0 20px"
    },
    cardListItem: {
        "&:hover": {
            cursor: "pointer"
        }
    }
};

class CleanSitesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onCardListItemClick = (id) => {
        window.open(`/cleanup-detail/${id}`,'_blank')
    };


    render() {
        const {locations, classes} = this.props;
        return (
            <List className={classes.listWrapper}>
                {locations.map((location, index) =>
                    <div key={location.id} onMouseEnter={() => this.props.enlarge(index)} onClick={() => this.onCardListItemClick(location.id)}>
                        <ListItem className={classes.cardListItem}>
                            <Card className={classes.locationCard}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item sm={4}>
                                            <img alt="location-avatar" src={avatar} className={classes.locationAvatar}/>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography variant="h5" component="h5" className={classes.title}>{location.name}</Typography>
                                            <Typography variant="subtitle1" className={classes.text}>{location.address}</Typography>
                                            <Typography variant="subtitle1" className={classes.text}>{location.description}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </ListItem>
                    </div>
                )}
            </List>
        );
    }
}

CleanSitesList.propTypes = {};

export default withStyles(styles)(CleanSitesList);
