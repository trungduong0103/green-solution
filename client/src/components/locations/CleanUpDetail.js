import React from 'react';
import {connect} from "react-redux";
import {deleteLocation, getAllLocations, getLocation, updateLocation} from "../../redux/actions/LocationActions";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import JoinCleanUpForm from "./forms/JoinCleanSiteForm";

const styles = {
    joinButton: {
        textAlign: "center"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        backgroundColor: "#F6EDD9",
        borderRadius: "10px 50px"
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 35,
        textAlign: "center",
    },
    helpTitle: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 14,
        textAlign: "center",
    },
};

class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        }
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.location) {
            return {
                location: props.location
            }
        }
        return null;
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.cardForm}>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
                        {this.state.location.name}
                    </Typography>
                    <br/>
                    <Typography variant="body2" component="p" className={classes.helperText}>
                        {this.state.location.description}
                    </Typography>
                    <br/>
                    <JoinCleanUpForm locationId={this.state.location.id}/>

                </CardContent>

            </Card>
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
