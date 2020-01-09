import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import {deleteLocation} from "../../../redux/actions/LocationActions";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class DeleteCleanSiteDialog extends Component {
    handleDeleteLocation = () => {
        const {history, location} = this.props;
        this.props.deleteLocation(location.id, history);
    };

    render() {
        const {open, loading, doneDeleteLocation} = this.props;
        return (
            <Dialog open={open} onClose={this.props.close}>
                {doneDeleteLocation ? (
                        <div style={{height: "250px", width: "400px", position: "relative"}}>
                            <CheckIcon style={{top: "44%", left: "45%", position: "absolute"}} fontSize="large"/>
                        </div>) :
                    loading ? (
                            <div style={{height: "250px", width: "400px", position: "relative"}}>
                                <CircularProgress style={{top: "44%", left: "45%", position: "absolute"}} size={35}/>
                            </div>) :
                        <div>
                            <DialogTitle
                                id="alert-dialog-title">{"Are you sure you want to delete this location ?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    This action cannot be reverted!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.props.close} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={this.handleDeleteLocation} color="secondary" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </div>
                }
            </Dialog>
        );
    }
}

DeleteCleanSiteDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    doneDeleteLocation: state.UI.doneDeleteLocation,
    location: state.locationsData.location
});

const mapDispatchToProps = {
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteCleanSiteDialog));
