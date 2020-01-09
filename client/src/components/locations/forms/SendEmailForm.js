import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { Card, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import {sendEmail} from "../../../redux/actions/LocationActions"

const styles = {
    customBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "15%",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },
    submitBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        color: "white",
        backgroundColor: "rgb(103,156,69)",
        padding: "5px 15px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "rgb(80,127,63)",
            outline: "none"
        }
    },
    cancelBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        color: "black",
        backgroundColor: "rgb(203,78,71)",
        padding: "5px 15px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "rgb(185,72,66)",
            outline: "none"
        }

    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    dialog:{
        width:'100%',
        height:'100%'
    },
    chip: {
        color: "rgb(99,151,68)",
        backgroundColor: "#E3F7D3",
        border: "none",
        margin: "0.2em",
    }
};

class SendEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredUsers: [],
            subject: "",
            content: "",
            addedUser: "",
            errors: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.location) {
            return {
                location: props.location
            }
        }
        return null;
    }

    componentDidMount(){
        this.setState({
            registeredUsers:this.props.emailList
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.emailList !== this.props.emailList) {
            this.setState({
                registeredUsers:this.props.emailList
            })
        }}

    validateDataBeforeSubmit(data) {
        const errors = {};
        if (data.subject === "") errors.subject = "Không được để trống";
        if (data.content === "") errors.content = "Không được để trống";
        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return false
        }
        return true;
    }

    clearForm = () => {
        this.setState({
            subject: "",
            content: "",
            errors: {}});
    };

    handleRemove = (participant) => {
        const filterList = this.state.registeredUsers.filter(p => p !== participant);
        this.setState({
            registeredUsers: filterList
        })
    };

    addParticipant = () => {
        const errors = {};
        const registeredUsers = this.state.registeredUsers;
        const addedUser = this.state.addedUser;
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (emailRegex.test(addedUser)) {
            registeredUsers.push(addedUser);
            this.setState({
                registeredUsers
            });
            this.setState({
                addedUser: "",
                errors: {}
            })
        } else  {
            errors.addedUser = "Sai format email";
            this.setState({
                errors
            })
        }
    };

    submitEmailNotification = () => {
        const data = {
            email: this.state.registeredUsers,
            subject: this.state.subject,
            content: this.state.content,
        };
        if (this.validateDataBeforeSubmit(data)) {
            console.log(data);
            this.props.sendEmail(data)
            this.clearForm()
            this.props.clear()
            this.props.handleOpenEmailForm()
        }
        else {
            alert("Please check your form again")
        }
    };

    handleClose = ()=>{
        this.props.clear()
        this.props.handleOpenEmailForm()
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    render() {
        const {errors,} = this.state;
        const {classes, open,  handleOpenEmailForm, emailList} = this.props;
        console.log(emailList)
        return (
            <div>
                <Dialog open={open} onClose={() => handleOpenEmailForm()} maxWidth="md">
                <DialogTitle>Kết quả sự kiện</DialogTitle>
                <DialogContent>
                <Grid container style={{marginTop: "50px"}}>
                    <Grid item sm={3}/>

                    <Grid item sm={6}>
                        <Card>
                            <CardContent>
                                <Typography  style={{margin: "0.3em "}} variant="subtitle1" className={classes.input}>Người nhận:</Typography>
                                {this.state.registeredUsers!==undefined && this.state.registeredUsers.map((participant, index) =>
                                    (
                                        <Chip
                                            variant="outlined"
                                            className={classes.chip}
                                            label={participant}
                                            onDelete={() => this.handleRemove(participant)}
                                            key={index}
                                        />
                                    )
                                )}

                                <TextField
                                    variant="outlined"
                                    style={{margin: "0.5em 0"}}
                                    className={classes.formInput}
                                    name="addedUser"
                                    required
                                    type="text"
                                    label="Thêm người nhận"
                                    onChange={this.handleChange}
                                    value={this.state.addedUser}
                                    helperText={errors.addedUser}
                                    error={!!errors.addedUser}
                                    fullWidth
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{
                                        className: classes.input,
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                {!this.state.addedUser ? "": <AddCircleOutlineTwoToneIcon onClick={this.addParticipant} cursor="pointer"/>}
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    variant="outlined"
                                    style={{margin: "0.5em 0"}}
                                    className={classes.formInput}
                                    name="subject"
                                    required
                                    type="text"
                                    label="Chủ đề"
                                    onChange={this.handleChange}
                                    value={this.state.subject}
                                    helperText={errors.subject}
                                    error={!!errors.subject}
                                    fullWidth
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                />
                                <TextField
                                    style={{margin: "0.5em 0"}}
                                    variant="outlined"
                                    className={classes.formInput}
                                    name="content"
                                    required
                                    multiline
                                    rows={5}
                                    type="text"
                                    label="Nội dung"
                                    onChange={this.handleChange}
                                    value={this.state.content}
                                    helperText={errors.content}
                                    error={!!errors.content}
                                    fullWidth
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                />
                            </CardContent>

                            <CardActions style={{padding: "10px 16px"}}>
                                <Button className={classes.submitBtn} onClick={this.submitEmailNotification} >Gửi</Button>
                                <Button className={classes.cancelBtn} onClick={this.handleClose}>Huỷ</Button>

                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={3}/>
                </Grid>
                </DialogContent></Dialog>
            </div>
        );
    }
}

SendEmailForm.propTypes = {};

const mapStateToProps = (state) => ({

});

const mapDisPatchToProps = {
    sendEmail
};

export default connect(mapStateToProps, mapDisPatchToProps)(withStyles(styles)(SendEmailForm));
