import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"


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
            participants:0,
            weight:0,
            organic:0,
            recyclable:0,
            nonRecyclable:0,

        }
    }


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    submit = () => {
        const result = {
            participants:this.state.participants,
            weight:this.state.weight,
            organic:this.state.organic,
            recyclable: this.state.recyclable,
            nonRecyclable:this.state.nonRecyclable
        };
        //this.props.updateResult(result);
        console.log(result)
        this.props.handleOpenResultForm();
    };

    render() {
        const {classes, open, handleOpenResultForm} = this.props;
        const {participants, weight, organic, recyclable,nonRecyclable} = this.state;
        
        return (
            <Dialog open={open} onClose={() => handleOpenResultForm()}>
                <DialogTitle>Kết quả sự kiện</DialogTitle>
                <DialogContent>
                    <Paper className={classes.paper}>
                        <div className={classes.form}>
                            <div>
                                <TextField
                                    label="Số lượng người tham gia"
                                    type="number"
                                    name="participants"
                                    placeholder="Số lượng người tham gia"
                                    className={classes.formInput}
                                    onChange={this.handleChange}
                                    value={participants}
                                    fullWidth
                                />

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
