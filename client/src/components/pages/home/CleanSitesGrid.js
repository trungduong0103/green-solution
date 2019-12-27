import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import withStyles from "@material-ui/core/styles/withStyles";
import avatar from "../../../assets/imgs/download.jpeg"
import Typography from "@material-ui/core/Typography"


const styles = {
    text: {
        fontFamily: "'Quicksand', sans-serif;",
        "& a":{
            color:'green',
            textDecoration: 'none'
        }
    },
    locationCard: {
        boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
        width: 800,
        padding: "0 20px"
    },
    wrapper: {
        width: '100%',
        height: '100%',
        padding: '20px'
    }

};

class CleanSitesGrid extends Component {

    render() {
        const { classes, locations, grid } = this.props;
        return (
            <div>
                <Grid container spacing={5} className={classes.wrapper}>
                    {locations.map((location, index)=> (
                        <Grid item xs={grid} key={location.id} onMouseEnter={() => this.props.enlarge(index)}>
                            <Card>
                                <CardMedia component="img"
                                    height="140"
                                    image={avatar}
                                    alt="Site's Image"
                                    title="Site's Image"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h5" className={classes.text}>
                                        <a href={`/cleanup-detail/${location.id}`} target="_blank" rel="noopener noreferrer">{location.name}</a>
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.text}>{location.address}</Typography>
                                    <Typography variant="subtitle2" className={classes.text}>{location.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(CleanSitesGrid)
