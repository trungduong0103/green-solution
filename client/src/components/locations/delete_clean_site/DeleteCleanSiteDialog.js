import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class DeleteCleanSiteDialog extends Component {
    handleClose = () => {

    };

    handleDeleteLocation = () => {
        alert("delete!");
    };

    render() {
        const {open} = this.props;
        return (
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this location ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this location means deleting all of its data.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleDeleteLocation} color="secondary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeleteCleanSiteDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

export default DeleteCleanSiteDialog;
