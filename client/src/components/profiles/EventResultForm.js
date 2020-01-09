import React, {Component} from 'react';
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import {withStyles} from "@material-ui/core";
import Dropzone from "react-dropzone-uploader"
import {markLocationAsDone} from "../../redux/actions/LocationActions";
import Grid from "@material-ui/core/Grid";

const styles = {
    paper: {
        padding: 20,
        minWidth: "600px"
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
    input: {
        fontFamily: "'Quicksand', sans-serif"
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
        marginRight: 20,
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
};

class EventResultForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            weight: 0,
            organic: 0,
            bottle: 0,
            straw: 0,
            foamBox: 0,
            plasticBag: 0,
            photos: []
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    submit = () => {
        const result = {
            id: this.props.location.id,
            participants: this.state.participants,
            weight: this.state.weight,
            organic: this.state.organic,
            bottle: this.state.bottle,
            straw: this.state.straw,
            foamBox: this.state.foamBox,
            plasticBag: this.state.plasticBag,
        };

        this.props.markLocationAsDone(result, this.props.history);
    };

    getUploadParams = ({meta}) => {
        const url = `https://httpbin.org/post`;
        return {url, meta: {fileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
    };

    handleChangeStatus = ({meta}, status) => {

    };

    handleSubmitImage = (files) => {
        files.forEach(f => {
            const img = f.file;
            const reader = new FileReader();
            reader.onloadend = () => {
                const list = this.state.photos;
                list.push(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
                this.setState({photos: list});
            };
            reader.readAsDataURL(img);
        })
    };

    handleRemove = (participant) => {
        const filteredList = this.state.participants.filter(p => p !== participant);
        this.setState({participants: filteredList});
    };

    componentDidMount() {
        if (this.props.location !== undefined) {
            this.setState({participants: this.props.location.registeredUsers});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            if (this.props.location !== undefined && this.props.location.registeredUsers !== undefined) {
                this.setState({participants: this.props.location.registeredUsers});
            }
        }
    };

    render() {
        const {classes, open, handleOpenResultForm, loading, doneMarkLocation} = this.props;
        const {participants, weight, organic, bottle, foamBox, straw, plasticBag,} = this.state;

        return (
            <Dialog open={open} onClose={() => handleOpenResultForm()} maxWidth="md">
                <Typography variant="h5" style={{fontFamily: "'Quicksand', sans-serif", textAlign: "center"}}>Kết quả sự kiện</Typography>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div>
                            <div>
                                <Typography variant="h6" style={{fontFamily: "'Quicksand', sans-serif"}}>Danh sách người tham gia</Typography>
                                {participants !== undefined && participants.map((participant, index) =>
                                    (
                                        <Chip
                                            label={participant}
                                            onDelete={() => this.handleRemove(participant)}
                                            key={index}
                                        />
                                    )
                                )}
                                <br/>
                                <Grid container spacing={3}>
                                    <Grid item sm={6}>
                                        <TextField
                                            label="Tổng khối lượng rác thu được (kg)"
                                            type="number"
                                            name="weight"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={weight}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>

                                    <Grid item sm={6}>
                                        <TextField
                                            label="Khối lượng rác hữu cơ (kg)"
                                            type="number"
                                            name="organic"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={organic}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>


                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item sm={6}>
                                        <TextField
                                            label="Số lượng chai nhựa (cái)"
                                            type="number"
                                            name="bottle"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={bottle}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>

                                    <Grid item sm={6}>
                                        <TextField
                                            label="Số lượng ống hút (cái)"
                                            type="number"
                                            name="straw"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={straw}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item sm={6}>
                                        <TextField
                                            label="Số lượng hộp xốp (cái"
                                            type="number"
                                            name="foamBox"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={foamBox}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>

                                    <Grid item sm={6}>
                                        <TextField
                                            label="Số lượng túi nhựa (cái)"
                                            type="number"
                                            name="plasticBag"
                                            className={classes.formInput}
                                            onChange={this.handleChange}
                                            value={plasticBag}
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        />
                                    </Grid>
                                </Grid>

                                <Typography variant="h5" style={{fontFamily: "'Quicksand', sans-serif"}}>Hình ảnh sự kiện</Typography>
                                <Dropzone
                                    getUploadParams={this.getUploadParams}
                                    onChangeStatus={this.handleChangeStatus}
                                    onSubmit={this.handleSubmitImage}
                                    accept="image/*"
                                    maxFiles={9}
                                    inputContent={(files, extra) => (extra.reject ? 'Chỉ nhận file hình' : 'Kéo thả hình vào đây')}
                                    styles={{
                                        dropzone: {
                                            border: ".5px dashed black",
                                            overflow: "hidden"
                                        },
                                        inputLabel: {
                                            fontFamily: 'Quicksand, sans-serif',
                                            color: "rgb(99,151,68)",
                                        },
                                        preview: {
                                            width: "100%",
                                            height: "100%",
                                            padding: 10
                                        },
                                        submitButton: {
                                            fontFamily: 'Quicksand, sans-serif',
                                            outline: "none",
                                            border: "1px solid #DDDDDD",
                                            backgroundColor: "black",
                                            padding: "10px 20px",
                                            letterSpacing: 1,
                                            textTransform: "uppercase",
                                            transition: "all 350mx ease-in-out",
                                            marginTop: "10px",
                                            color: "white"
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </Paper>
                </DialogContent>

                <DialogActions style={{display: "flex", justifyContent: "center", padding: "1em 1em 1em 1em"}}>
                    {doneMarkLocation ? (
                        <CheckIcon fontSize="large"/>
                    ) : (
                        loading ? (
                            <CircularProgress size={35}/>
                        ) : (
                            <div>
                                <Button className={classes.cancelBtn} onClick={() => handleOpenResultForm()}>Hủy</Button>
                                <Button className={classes.submitBtn} onClick={() => this.submit()}>Lưu</Button>
                            </div>
                        )
                    )}
                </DialogActions>
            </Dialog>

        );
    }
}

const mapStateToProps = (state) => ({
    location: state.locationsData.location,
    loading: state.UI.loading,
    doneMarkLocation: state.UI.doneMarkLocation
});

const mapDispatchToProps = {
    markLocationAsDone
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventResultForm));
