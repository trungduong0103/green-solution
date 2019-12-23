import {CreateCleanUpMap} from "../../locations/maps/CreateCleanUpMap";
import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NavBar from "../../navigation/NavBar";

const styles = {

};

class CleanUpFormMap extends Component {

    getLocation = (childData) => {
        this.props.getLocation()
    };



    render() {
        const { classes } = this.props;
        return(
            <div>
                <NavBar/>
                <Grid container className={classes.wrapper}>
                    <Grid item sm={12} className={classes.formWrapper}>
                        <Card className={classes.cardForm}>
                            <CardContent>
                                <Grid container>
                                    <Grid item sm={12}>
                                        <Typography className={classes.title}>Tạo sự kiện</Typography>
                                        <CreateCleanUpMap/>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <Button
                                            onClick={this.back}
                                        >
                                            Trở lại
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>


            </div>

        )
    }
}
export default withStyles(styles)(CleanUpFormMap);
