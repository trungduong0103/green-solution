import React, {Component} from 'react';
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField"
import EditIcon from "@material-ui/icons/Edit"
import {withStyles} from "@material-ui/core";
import userAvatar from "../../assets/imgs/home_page_img.jpg";
import {updateUserAvatar} from "../../redux/actions/UserActions";


const styles = {
    paper: {
        padding: 20,
        minWidth: "400px"
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            borderRadius: '50%',
            height: "200px",
            width: "200px",
            padding: "10px"
        },
        '& .profile-details': {
            textAlign: 'left',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4',
                textDecoration: "none"
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    formInput: {
        '& label.Mui-focused': {
            color: 'green'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green'
        },
        paddingBottom: "10px"
    },
};

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            image: ''
        }
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.props.updateUserAvatar({
                image: reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                username: this.props.user.email,
                height: 200,
                width: 200
            });
        };
        reader.readAsDataURL(image);
        this.props.handleOpenUpdateProfile();
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    submit = () => {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.props.user.email
        };
        this.props.updateUser(user);
        this.props.handleOpenUpdateProfile();
    };

    componentDidMount() {
        if (this.props.user !== undefined) {
            this.setState({
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                phoneNumber: this.props.user.phoneNumber,
                avatarUrl: this.props.user.avatarUrl
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snap) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                phoneNumber: this.props.user.phoneNumber,
                avatarUrl: this.props.user.avatarUrl
            })
        }
        if (this.props.image !== prevProps.image && this.props.image !== '') {
            this.setState({image: this.props.image})
        }
    }

    render() {
        const {classes, open, handleOpenUpdateProfile, email} = this.props;
        const {firstName, lastName, phoneNumber, image} = this.state;
        console.log(this.state);
        return (
            <Dialog open={open} onClose={() => handleOpenUpdateProfile()}>
                <DialogTitle>Update profile</DialogTitle>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img src={this.state.avatarUrl ? this.state.avatarUrl : userAvatar} alt="Profile" className="profile-image"/>
                                <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                                <IconButton onClick={this.handleEditPicture}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            <hr/>
                            <hr/>
                            <div className="profile-details">
                                <Typography>{email}</Typography>
                                <TextField
                                    label="Họ"
                                    type="text"
                                    name="lastName"
                                    placeholder="Nhập họ"
                                    className={classes.formInput}
                                    id="lastName"
                                    onChange={this.handleChange}
                                    value={lastName}
                                    fullWidth
                                />

                                <TextField
                                    label="Tên"
                                    type="text"
                                    name="firstName"
                                    placeholder="Nhập tên"
                                    className={classes.formInput}
                                    id="firstName"
                                    onChange={this.handleChange}
                                    value={firstName}
                                    fullWidth
                                />


                                <TextField
                                    label="Số điện thoại"
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Nhập số điện thoại"
                                    className={classes.formInput}
                                    id="phoneNumber"
                                    onChange={this.handleChange}
                                    value={phoneNumber}
                                    fullWidth
                                />

                            </div>

                        </div>
                    </Paper>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.submit()}>Submit</Button>
                    <Button onClick={() => handleOpenUpdateProfile()}>Close</Button>
                </DialogActions>
            </Dialog>

        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    updateUserAvatar
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(UpdateProfile)));
