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
    },
    title: {
        fontFamily:"'Quicksand', sans-serif;",
        color: "rgb(99,151,68)"
    },
    cardGridItem: {
        "&:hover": {
            cursor: "pointer"
        }
    }

};

class CleanSitesGrid extends Component {

    onCardGridItemClick = (id) => {
        window.open(`/cleanup-detail/${id}`,'_blank')
    };

    render() {
        const { classes, locations, grid } = this.props;
        return (
            <div>
                <Grid container spacing={5} className={classes.wrapper}>
                    {locations.map((location, index)=> (
                        <Grid item xs={grid} key={location.id} onMouseEnter={() => this.props.enlarge(index)} onClick={() => this.onCardGridItemClick(location.id)}>
                            <Card className={classes.cardGridItem}>
                                <CardMedia component="img"
                                    height="140"
                                    image={avatar}
                                    alt="Site's Image"
                                    title="Site's Image"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h5" className={classes.title}>{location.name}</Typography>
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
