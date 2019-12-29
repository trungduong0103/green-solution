import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = {
    wrapper: {
        marginTop: "2%"
    },
    formWrapper: {
        width: "50vw",
        height: "auto",
        padding: "0 1.5em"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    },
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        textAlign: "center",
        textTransform: "uppercase"
    },
    formInput: {
        margin: 10,
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
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    menuSelect: {
        maxHeight: 500,
        maxWidth: 500
    },
    formControl: {
        width: "250px",
        paddingBottom: "10px"
    }
};

class FirstTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                name: "",
                organization: "",
                description: "",
                agenda: ""
            },
            errorSnackbar: false,
            errors: {}
        }
    }

    handleChange = (event) => {
        const location = this.state.location;
        location[event.target.name] = event.target.value;
        this.setState({location});
    };

    validateDataBeforeNextStep(data) {
        const errors = {};
        if (data.name === "") errors.name = "Không được để trống";
        if (data.description === "") errors.description = "Không được để trống";
        if (data.organization === "") errors.organization = "Không được để trống";
        if (data.agenda === "") errors.agenda = "Không được để trống";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };

    openErrorSnackbar = () => {
        this.setState({errorSnackbar: true});
        setTimeout(() => {
            this.setState({errorSnackbar: false});
        }, 3000);
    };

    continueToNextStep = () => {
        const location = this.state.location;
        if (this.validateDataBeforeNextStep(location)) {
            this.props.nextStep(location, 0);
        } else {
            this.openErrorSnackbar();
        }
    };

    render() {
        const {location, errors, errorSnackbar} = this.state;
        const {classes} = this.props;
        return (
            <Grid container spacing={0} className={classes.wrapper}>
                <Grid item sm={3}/>
                <Grid item sm={6} className={classes.formWrapper}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography className={classes.title}>Thông tin sự kiện</Typography>
                                </Grid>

                                <Grid item sm={12}>
                                    <form>
                                        <TextField
                                            className={classes.formInput}
                                            name="name"
                                            required
                                            type="text"
                                            label="Tên sự kiện"
                                            onChange={this.handleChange}
                                            value={location.name}
                                            helperText={errors.name}
                                            error={!!errors.name}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <TextField
                                            className={classes.formInput}
                                            name="organization"
                                            required
                                            type="text"
                                            label="Tên tổ chức"
                                            onChange={this.handleChange}
                                            value={location.organization}
                                            helperText={errors.organization}
                                            error={!!errors.organization}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                        <br/>
                                        <TextField
                                            variant="outlined"
                                            className={classes.formInput}
                                            name="description"
                                            required
                                            type="text"
                                            label="Mô tả sự kiện"
                                            onChange={this.handleChange}
                                            value={location.description}
                                            multiline
                                            rows="2"
                                            helperText={errors.description}
                                            error={!!errors.description}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <TextField
                                            variant="outlined"
                                            className={classes.formInput}
                                            name="agenda"
                                            required
                                            type="text"
                                            label="Lịch trình sự kiện"
                                            onChange={this.handleChange}
                                            value={location.agenda}
                                            multiline
                                            rows="3"
                                            helperText={errors.agenda}
                                            error={!!errors.agenda}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={this.continueToNextStep}
                                            className={classes.customBtn}
                                        >Tiếp tục</Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={3}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={errorSnackbar}
                          message={"Vui lòng điền đủ thông tin."}/>

            </Grid>

        );
    }
}

FirstTab.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default withStyles(styles)(FirstTab);
