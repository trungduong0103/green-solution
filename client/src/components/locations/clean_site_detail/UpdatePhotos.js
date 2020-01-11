import React, {Component} from 'react';
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import Dropzone from "react-dropzone-uploader"
import {getAllLocationImages, uploadLocationPhotos} from "../../../redux/actions/LocationActions";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    paper: {
        padding: 20,
        minWidth: "400px"
    },
    form: {
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
    }
};

class UpdatePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doneUploadPhotos !== this.props.doneUploadPhotos && this.props.doneUploadPhotos === true) {
            this.props.handleOpenDropImages();
        }
    }

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
            this.setState({images: []});
            reader.onloadend = () => {
                const imagesList = this.state.images;
                imagesList.push(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
                this.setState({images: imagesList});
            };
            reader.readAsDataURL(img);
        });
    };

    submitToFirebase = () => {
        const {location} = this.props;
        const {images} = this.state;
        const photosObj = {
            images: images,
            username: location.creator,
            event: location.id
        };
        console.log(photosObj);
        this.props.uploadLocationPhotos(photosObj);
    };


    render() {
        console.log(this.state);
        const {classes, open, doneUploadPhotos, loading} = this.props;
        return (
            <Dialog open={open} onClose={this.props.handleOpenDropImages}>
                <Typography variant="h5"
                            style={{fontFamily: "'Quicksand', sans-serif", textAlign: "center", paddingTop: 20}}>Đăng
                    ảnh sự kiện của bạn</Typography>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div className={classes.form}>
                            <div>
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
                    {doneUploadPhotos ? (<CheckIcon fontSize="large"/>) :
                        (loading ? (<CircularProgress size={35}/>) :
                                (
                                    <div>
                                        <Button onClick={this.props.handleOpenDropImages} color="primary">
                                            Hủy
                                        </Button>
                                        <Button disabled={this.state.images.length === 0}
                                                onClick={this.submitToFirebase} color="secondary" autoFocus>
                                            Cập nhật
                                        </Button>
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
    doneUploadPhotos: state.UI.doneUploadPhotos,
    loading: state.UI.loading,
    imageLoading: state.locationsData.loading
});

const mapDispatchToProps = {
    uploadLocationPhotos,
    getAllLocationImages
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdatePhoto));
