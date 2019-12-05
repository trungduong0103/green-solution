import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

//Material-UI
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import Table from "@material-ui/core/Table"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TextField from "@material-ui/core/TextField";


const styles = {
    outerContainer: {
        margin: "20px"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participatedLocations: [
                {
                    "id": 1,
                    "name": "RMIT Uni #1",
                },
                {
                    "id": 2,
                    "name": "Ton Duc Thang Uni #1",
                },
                {
                    "id": 3,
                    "name": "Kinh Te Uni #1",
                },
            ],
            createdLocations: [
                {
                    "id": 1,
                    "name": "Bien Hoa Event #1",
                },
                {
                    "id": 2,
                    "name": "Dong Nai Event #1",
                },
                {
                    "id": 3,
                    "name": "Ha Noi Event #1",
                },
            ]
        }
    }

    render() {
        const {classes} = this.props;

        return (

            <div>
                <NavBar/>
                <div className={classes.outerContainer}>
                    <Grid container spacing={5}>
                        <Grid item xs={4} className={classes.dataForm}>
                            <Typography>Danh sách sự kiện đã tham gia</Typography>
                            <Paper className={classes.root}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Số thứ tự</TableCell>
                                            <TableCell align="center">Tên sự kiện</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.participatedLocations.map(location => (
                                            <TableRow key={location.id}>
                                                <TableCell component="th" scope="row" align="center">
                                                    {location.id}
                                                </TableCell>
                                                <TableCell align="center">{location.name}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>

                        <Grid item xs={8}>
                            <Typography>Danh sách sự kiện đã tạo</Typography>
                            <Paper className={classes.root}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Số thứ tự</TableCell>
                                            <TableCell align="center">Tên sự kiện</TableCell>
                                            <TableCell align="center">Thay đổi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.createdLocations.map(location => (
                                            <TableRow key={location.id}>
                                                <TableCell component="th" scope="row" align="center">
                                                    {location.id}
                                                </TableCell>
                                                <TableCell align="center">{location.name}</TableCell>
                                                <TableCell align="center" omponent="th" scope="row">
                                                    <IconButton onClick={console.log("delete")}>
                                                        <DeleteIcon color="secondary" />
                                                    </IconButton>
                                                    <IconButton onClick={console.log("edit")}>
                                                        <EditIcon color="primary" />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>


                    </Grid>
                </div>




                {/*<Footer/>*/}

            </div>
        );
    }
}

export default withStyles(styles)(Home);
