import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import Dropzone from "react-dropzone-uploader"
import Chip from "@material-ui/core/Chip"


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
            recyclable: 0,
            nonRecyclable: 0,

        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    submit = () => {
        const result = {
            participants: this.state.participants,
            weight: this.state.weight,
            organic: this.state.organic,
            recyclable: this.state.recyclable,
            nonRecyclable: this.state.nonRecyclable
        };
        //this.props.updateResult(result);
        console.log(result)
        this.props.handleOpenResultForm(0);
    };

    getUploadParams = ({meta}) => {
        const url = `https://httpbin.org/post`;
        return {url, meta: {fileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
    };

    handleChangeStatus = ({meta}, status) => {

    };

    handleSubmitImage = (files) => {
        // const {creator, locationId, history} = this.props;
        files.map(f=>{
            const img = f.file
            const reader = new FileReader()
            reader.onloadend = ()=>{
                console.log(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
            }
            reader.readAsDataURL(img)
        })
    };

    handleRemove=(participant)=>{
        const filteredList = this.state.participants.filter(p => p!==participant)
        this.setState({
            participants:filteredList
        })
    }

    componentDidMount(){
        if(this.props.location.registeredUsers!==undefined)
        {this.setState({
            participants:this.props.location.registeredUsers
        })}
    }

    componentDidUpdate(prevProps){
        if(prevProps.location!==this.props.location){
            if(this.props.location!==undefined && this.props.location.registeredUsers!==undefined)
            {this.setState({
                participants:this.props.location.registeredUsers
            })}
        }
    }

    render() {
        const { classes, open, handleOpenResultForm } = this.props;
        const { participants, weight, organic, recyclable, nonRecyclable } = this.state;

        return (
            <Dialog open={open} onClose={() => handleOpenResultForm()}>
                <DialogTitle>Kết quả sự kiện</DialogTitle>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div className={classes.form}>
                            <div>
                                <Typography>Danh sách người tham gia</Typography>

                                {participants.map((participant,index)=>
                                (
                                    <Chip 
                                        label={participant}
                                        onDelete={()=>this.handleRemove(participant)}
                                        key={index}
                                    />
                                )
                                )}

                                <TextField
                                    label="Tổng khối lượng rác thu được (kg)"
                                    type="number"
                                    name="weight"
                                    placeholder="Tổng khối lượng rác thu được"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={weight}
                                    fullWidth
                                />

                                <TextField
                                    label="Khối lượng rác hữu cơ (kg)"
                                    type="number"
                                    name="organic"
                                    placeholder="Khối lượng rác hữu cơ"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={organic}
                                    fullWidth
                                />

                                <TextField
                                    label="Khối lượng rác tái chế (kg)"
                                    type="number"
                                    name="recyclable"
                                    placeholder="Khối lượng rác tái chế"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={recyclable}
                                    fullWidth
                                />

                                <TextField
                                    label="Khối lượng rác không tái chế (kg)"
                                    type="number"
                                    name="nonRecyclable"
                                    placeholder="Khối lượng rác không tái chế"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={nonRecyclable}
                                    fullWidth
                                />

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
                    <Button onClick={() => handleOpenResultForm()}>Close</Button>
                </DialogActions>
            </Dialog>

        );
    }
}


export default ((withStyles(styles)(EventResultForm)));
