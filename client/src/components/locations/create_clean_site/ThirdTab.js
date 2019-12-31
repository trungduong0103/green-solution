import React, {Component} from "react"
import Dropzone from "react-dropzone-uploader"
import 'react-dropzone-uploader/dist/styles.css'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";

const styles = {
    backdrop: {
        zIndex: 1,
        color: '#fff',
    },
    wrapper: {
        padding: "30px"
    },
    formWrapper: {
        width: "50vw",
        height: "50vh",
        padding: "0 10px"
    },
    cardForm: {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
    }
};

class ThirdTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: ""
        }
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, are you sure?";
        };
    }

    getUploadParams = ({meta}) => {
        const url = `https://httpbin.org/post`;
        return {url, meta: {fileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
    };

    handleChangeStatus = ({meta}, status) => {

    };

    handleSubmit = (files, allFiles) => {
        const {creator, locationId, history} = this.props;
        const image = files[0].file;
        console.log(image);
        const reader = new FileReader();
        reader.onloadend = () => {
            this.props.uploadLocationLogo({
                image: reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                username: creator,
                event: locationId
            }, history, locationId);
        };
        reader.readAsDataURL(image);
    };

    render() {
        console.log(this.props);
        const {classes, uploadingLogo, doneUploadLogo} = this.props;
        return (
            <Grid container spacing={0} className={classes.wrapper}>
                <Grid item sm={3}/>
                <Grid item sm={6} className={classes.formWrapper}>
                    <Card className={classes.cardForm}>
                        <CardContent>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Dropzone
                                        getUploadParams={this.getUploadParams}
                                        onChangeStatus={this.handleChangeStatus}
                                        onSubmit={this.handleSubmit}
                                        accept="image/*"
                                        maxFiles={1}
                                        inputContent={(files, extra) => (extra.reject ? 'Chỉ nhận file hình' : 'Kéo thả logo vào đây')}
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
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={3}/>
                <Backdrop
                    className={classes.backdrop}
                    open={uploadingLogo}
                >
                    {doneUploadLogo ? (<CheckIcon fontSize="large"/>) : <CircularProgress color="inherit"/>}
                </Backdrop>
            </Grid>
        )
    }
}

export default withStyles(styles)(ThirdTab);
