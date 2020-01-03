import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ViewListIcon from "@material-ui/icons/ViewList";
import DeleteIcon from "@material-ui/icons/Delete";
import AppsIcon from "@material-ui/icons/Apps";
import EditIcon from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import UpdateCleanSiteForm from "../locations/forms/UpdateCleanSiteForm";
import EventResultForm from "./EventResultForm";
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

};

const locations = [
    { name: 'abc', description: 'sdfs', id: 'jdkfhskdjf' }, { name: 'def', description: 'sdjfhns', id: 'dksjfh' }
]

class CreatedLocations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            grid: 6,
            openResultForm: false
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

    handleOpenResultForm = () => {
        this.setState({
            openResultForm: !this.state.openResultForm
        })
    }

    render() {
        const { classes,
            // locations,
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
                            {locations.map(location => (
                                <Grid item xs={grid} key={location.id} className={classes.gridForm}>
                                    <Card>
                                        {grid === 6 && <CardMedia component="img"
                                            height="140"
                                            image={locationAvatar}
                                            alt="Site's Image"
                                            title="Site's Image"
                                        />}
                                        <CardContent>

                                            <Typography gutterBottom variant="h5" component="h2">{location.name}</Typography>
                                            <Typography variant="body2" component="p">
                                                {location.description}
                                            </Typography>
                                            <div style={{ width: '100%', textAlign: 'right' }}>
                                                <Tooltip title="Xóa sự kiện">
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={() => this.props.delete(location.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cập nhật thông tin">
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={() => this.props.edit(location.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Đánh dấu đã hoàn thành">
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={() => this.handleOpenResultForm()}>
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </div>
                }
                <br />
                <UpdateCleanSiteForm email={email} open={openUpdateSite} />
                <EventResultForm open={openResultForm} handleOpenResultForm={this.handleOpenResultForm} />



            </div>
        )
    }
}

export default withStyles(styles)(CreatedLocations)
