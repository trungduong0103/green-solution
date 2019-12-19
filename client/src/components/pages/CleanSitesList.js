import React, {Component} from 'react';

import withStyles from "@material-ui/core/styles/withStyles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const styles = {
    listItem: {
        padding: "1.3em 0 1.3em 0"
    },
    locationAvatar: {
        height: "168px",
        width: "168px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
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
                        <ListItem divider className={classes.listItem}>
                            <Grid container>

                                <Grid item sm={8}>
                                    <Typography variant="h4" component="h4" paragraph>{location.name}</Typography>
                                    <Typography variant="subtitle1">{location.address}</Typography>
                                    <Typography variant="subtitle2">{location.description}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </div>
                )}
            </List>
        );
    }
}

CleanSitesList.propTypes = {};

export default withStyles(styles)(CleanSitesList);
