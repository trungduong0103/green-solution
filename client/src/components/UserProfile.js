import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";

//Material-UI
import {Link} from "react-router-dom";
import Footer from "./Footer"
import NavBar from "./NavBar";

import Table from "@material-ui/core/Table"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

import {
    getAllRegisteredLocationsWithEmail,
    getAllCreatedLocationsWithEmail, deleteLocation, getLocation
} from "../redux/actions/LocationActions";
import UpdateCleanSiteForm from "./locations/forms/UpdateCleanSiteForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {openUpdateSiteForm} from "../redux/actions/FormActions";
import {CircularProgress} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";


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
    table: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 15
    },
    wrapper: {
        height: "auto"
    },
    tableForm: {
        padding: "20px 30px"
    },
    progress: {
        position: "absolute",
        top: "45%",
        marginLeft: "20%"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredLocations: [],
            createdLocations: [],
            email: ""
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            alert("Bạn phải đăng nhập trước.");
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({
            email: decodedToken.email
        });
        this.props.getAllCreatedLocationsWithEmail({email: decodedToken.email});
        this.props.getAllRegisteredLocationsWithEmail({email: decodedToken.email});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.createdLocations !== state.createdLocations) {
            return {
                createdLocations: props.createdLocations
            }
        }
        if (props.registeredLocations !== state.registeredLocations) {
            return {
                registeredLocations: props.registeredLocations
            }
        }
        return null;
    }

    handleDeleteLocation = (locationId) => {
        this.props.deleteLocation(locationId, this.state.email);
    };

    handleEditLocation = (locationId) => {
        this.props.openUpdateSiteForm(locationId);
    };

    render() {
        const {classes, openUpdateSite, loading} = this.props;
        const {registeredLocations, createdLocations} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid container spacing={1} className={classes.wrapper}>
                    <Grid item xs={4}>
                        <Typography className={classes.title}>Danh sách sự kiện đã tham gia</Typography>
                        <Paper>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className={classes.table}>Số thứ tự</TableCell>
                                        <TableCell align="center" className={classes.table}>Tên sự kiện</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registeredLocations.map(location => (
                                        <TableRow key={location.id}>
                                            <TableCell component="th" scope="row" align="center"
                                                       className={classes.table}>
                                                {location.id}
                                            </TableCell>
                                            <TableCell align="center"
                                                       className={classes.table}>{location.name}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography className={classes.title}>Danh sách sự kiện đã tạo</Typography>
                        <Paper className={classes.root}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className={classes.table}>Số thứ tự</TableCell>
                                        <TableCell align="center" className={classes.table}>Tên sự kiện</TableCell>
                                        <TableCell align="center" className={classes.table}>Thay đổi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {createdLocations.map(location => (
                                        <TableRow key={location.id}>
                                            <TableCell component="th" scope="row" align="center"
                                                       className={classes.table}>
                                                {location.id}
                                            </TableCell>
                                            <TableCell align="center"
                                                       className={classes.table}>{location.name}</TableCell>
                                            <TableCell align="center" omponent="th" scope="row"
                                                       className={classes.table}>
                                                <IconButton
                                                    className={classes.button}
                                                    onClick={() => this.handleDeleteLocation(location.id)}>
                                                    <DeleteIcon color="secondary"/>
                                                </IconButton>
                                                <IconButton
                                                    className={classes.button}
                                                    onClick={() => this.handleEditLocation(location.id)}>
                                                    <EditIcon color="primary"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid item sm={3}/>
                    <Grid item sm={6}>
                        {loading ? (
                            <CircularProgress
                                variant="indeterminate"
                                size={50}
                                className={classes.progress} />
                        ): (
                            <Collapse in={openUpdateSite}>
                                <Card>
                                    <CardContent>
                                        <Typography className={classes.formTitle} align="center">Cập nhật thông tin sự kiện</Typography>
                                        <br/>
                                        <UpdateCleanSiteForm />
                                    </CardContent>
                                </Card>
                            </Collapse>
                        )}
                    </Grid>
                    <Grid item sm={3}/>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createdLocations: state.locationsData.createdLocations,
    registeredLocations: state.locationsData.registeredLocations,
    openUpdateSite: state.formState.openUpdateSite,
    loading: state.formState.loading
});

const mapDispatchToProps = {
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail,
    deleteLocation,
    openUpdateSiteForm
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
