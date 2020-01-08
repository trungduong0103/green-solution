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
        this.props.handleOpenResultForm();
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

    componentDidUpdate(prevProps) {
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
                <DialogTitle>Kết quả sự kiện</DialogTitle>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div>
                            <div>
                                <Typography>Danh sách người tham gia</Typography>
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
                                <Typography>Tổng khối lượng rác thu được (kg)</Typography>
                                <TextField
                                    type="number"
                                    name="weight"
                                    placeholder="Tổng khối lượng rác thu được"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={weight}
                                    fullWidth
                                />
                                <br/>
                                <Typography>Khối lượng rác hữu cơ (kg)</Typography>
                                <TextField
                                    type="number"
                                    name="organic"
                                    placeholder="Khối lượng rác hữu cơ"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={organic}
                                    fullWidth
                                />
                                <br/>
                                <Typography>Số lượng chai nhựa (cái)</Typography>

                                <TextField

                                    type="number"
                                    name="bottle"
                                    placeholder="Số lượng chai nhựa"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={bottle}
                                    fullWidth
                                />
                                <Typography>Số lượng ống hút (cái)</Typography>
                                <TextField

                                    type="number"
                                    name="straw"
                                    placeholder="Số lượng ống hút"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={straw}
                                    fullWidth
                                />
                                <Typography>Số lượng hộp xốp (cái)</Typography>
                                <TextField

                                    type="number"
                                    name="foamBox"
                                    placeholder="Số lượng hộp xốp"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={foamBox}
                                    fullWidth
                                />
                                <Typography>Số lượng túi nhựa (cái)</Typography>
                                <TextField

                                    type="number"
                                    name="plasticBag"
                                    placeholder="Số lượng túi nhựa"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={plasticBag}
                                    fullWidth
                                />

                                <br/>
                                <Typography>Hình ảnh sự kiện</Typography>
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

                <DialogActions>
                    {doneMarkLocation ? (
                        <CheckIcon/>
                    ) : (
                        loading ? (
                            <CircularProgress/>
                        ) : (
                            <div>
                                <Button onClick={() => this.submit()}>Lưu</Button>
                                <Button onClick={() => handleOpenResultForm()}>Hủy</Button>
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
