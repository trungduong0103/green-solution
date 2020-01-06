import React, { Component } from 'react'
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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

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

class AdminLocations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            grid: 6,
            open:false,
            locationId:''
        };

        this.setGrid = this.setGrid.bind(this);
        this.setList = this.setList.bind(this);
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

    handleOpenDialog = (id)=>{
        this.setState({
            locationId:id,
            open:true
        })
    };

    handleCloseDialog = ()=>{
        this.setState({
            open:false
        })
    };

    handlePaymentCheck=()=>{
        const id = this.state.locationId;
        console.log(id);
        //function here
        this.handleCloseDialog()
    };

    render() {
        const { classes,
            locations } = this.props;
        const { grid, open} = this.state;
        console.log(locations);
        return (
            <div>

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

                                            <Typography gutterBottom variant="h5" component="h2">{location.name}</Typography>
                                            <Typography variant="body2" component="p">
                                                {location.description}
                                            </Typography>
                                            <div style={{ width: '100%', textAlign: 'right' }}>
                                                <Tooltip title="Đánh dấu đã hoàn thành">
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={() => this.handleOpenDialog(location.id)}>
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Dialog
                            open={open}
                            onClose={()=>this.handleCloseDialog()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id='alert-dialog-title'>Xác nhận đã thanh toán?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Xác nhận nhà tổ chức sự kiện này đã thanh toán đầy đủ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>this.handleCloseDialog()}>Hủy</Button>
                                <Button onClick={()=>this.handlePaymentCheck()}>Đồng ý</Button>
                            </DialogActions>

                        </Dialog>



                    </div>
                
                <br />

            </div>
        )
    }
}

export default withStyles(styles)(AdminLocations)
