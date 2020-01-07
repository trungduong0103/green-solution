import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewListIcon from "@material-ui/icons/ViewList";
import AppsIcon from "@material-ui/icons/Apps";
import withStyles from "@material-ui/core/styles/withStyles";
import locationAvatar from "../../assets/imgs/download.jpeg";

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
    progress: {
        position: "absolute",
        top: "45%",
        marginLeft: "20%"
    },
    text: {
        "& a":{
            color:'green',
            textDecoration: 'none'
        }
    },

};

class CreatedLocations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            grid: 6,
            openResultForm: false,
            currentEvent:0,
        }

        this.setGrid = this.setGrid.bind(this)
        this.setList = this.setList.bind(this)
    }

    setGrid = () => {
        this.setState({
            grid: 6
        })
    };

    setList = () => {
        this.setState({
            grid: 12
        })
    };

    handleOpenResultForm = (index) => {
        this.setState({
            openResultForm: !this.state.openResultForm,
            currentEvent:index,
        })
    }

    render() {
        const { classes,
            locations,
            loaded, email, openUpdateSite } = this.props;
        const { grid, openResultForm } = this.state;
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
                            {locations.map((location,index) => (
                                <Grid item xs={grid} key={location.id} className={classes.gridForm}>
                                    <Card>
                                        {grid === 6 && <CardMedia component="img"
                                            height="140"
                                            image={locationAvatar}
                                            alt="Site's Image"
                                            title="Site's Image"
                                        />}
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
                <br />

            </div>
        )
    }
}

export default withStyles(styles)(CreatedLocations)
