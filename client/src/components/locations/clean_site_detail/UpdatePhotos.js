import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dropzone from "react-dropzone-uploader"

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
            images:[]
        }
    }

    submit = () => {
        console.log(this.state.images)
        this.props.handleOpenDropImages();
    };

    getUploadParams = ({meta}) => {
        const url = `https://httpbin.org/post`;
        return {url, meta: {fileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
    };

    handleChangeStatus = ({meta}, status) => {

    };

    handleSubmitImage = (files) => {
        files.forEach(f => {
            const img = f.file
            const reader = new FileReader()
            reader.onloadend = () => {
                const imagesList=this.state.images
                imagesList.push(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
                this.setState({
                    images:imagesList
                })
            }
            reader.readAsDataURL(img)
        })
    };


    render() {
        const {classes, open, handleOpenDropImages} = this.props;

        return (
            <Dialog open={open} onClose={() => handleOpenDropImages()}>
                <DialogTitle>Update Photos</DialogTitle>
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

                <DialogActions>
                    <Button onClick={() => this.submit()}>Submit</Button>
                    <Button onClick={() => handleOpenDropImages()}>Close</Button>
                </DialogActions>
            </Dialog>

        );
    }
}


export default (withStyles(styles)(UpdatePhoto));
