import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";
import ImageDropZone from "../../pages/ImageDropZone";

const styles = {
    wrapper: {
        padding: "30px"
    },

    formWrapper: {
        width: "50vw",
        height: "550px",
        padding: "0 10px"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 20,
        textAlign: "center",
        textTransform: "uppercase"
    },
    formInput: {
        margin: 10,
        color: "white"
    },
    picker: {
        margin: "10px 5px",
        color: "white"

    },
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
        marginTop: "20px",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },
    confirmBtn: {
        fontFamily: "'Quicksand', sans-serif;",
        outline: "none",
        borderRadius: 20,
        // border: "1px solid \"rgb(99,151,68)\"",
        backgroundColor: "rgb(99,151,68)",
        padding: "10px 30px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        marginTop: "20px",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        }
    },
    text: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 15
    },

    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
};

const today = new Date();

class ThirdTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                organizer:"",
                logo: "",
                creator: ""
            },
            errors: {}
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) window.location.href = "/authentication";
        const decodedToken = jwtDecode(auth);
        const location = this.state.location;
        location.creator = decodedToken.email;
        this.setState({location});
    }

    handleChange = (event) => {
        const location = this.state.location;
        location[event.target.name] = event.target.value;
        this.setState({location});
    };

    validateDataBeforeSubmit(data) {
        const errors = {};

        if (data.organizer === "") errors.organizer = "Không được để trống";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };


    submitForm = () => {
        const location = this.state.location;
        if (this.validateDataBeforeSubmit(location)) {
            alert("Success")

        }
        else {
            alert("Kiểm tra lại đơn đăng ký của bạn")
        }
    };

    render() {
        const {location, errors} = this.state;
        const {classes} = this.props;
        return (
            <Grid container spacing={0} className={classes.wrapper}>
                <Grid item sm={3}/>
                <Grid item sm={6} className={classes.formWrapper}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography className={classes.title}>Thông tin nhà tổ chức</Typography>
                                </Grid>

                                <Grid item sm={12}>
                                    <form>
                                        <TextField
                                            className={classes.formInput}
                                            name="organizer"
                                            required
                                            type="text"
                                            label="Tên nhà tổ chức"
                                            onChange={this.handleChange}
                                            value={location.organizer}
                                            helperText={errors.organizer}
                                            error={!!errors.organizer}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                        <br/>
                                        <ImageDropZone/>

                                        <Button
                                            variant="contained"
                                            onClick={this.submitForm}
                                            className={classes.confirmBtn}
                                        >Xác nhận</Button>

                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={3}/>
            </Grid>

        );
    }
}

export default withStyles(styles)(ThirdTab);
