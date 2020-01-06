import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"

const styles = {
    title: {
        fontFamily: "'Oswald', sans-serif;",
    },
    avatar: {
        padding: 10,
        borderRadius: '50%',
        height: "50px",
        width: "50px",
    },
    cardText: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    cardWrapper: {
        maxWidth: "auto",
        maxHeight: "auto",
        margin: 10
    },
    text: {
        fontSize: 13,
        fontFamily: "'Quicksand', sans-serif;",
    },
    cardContent: {
        padding: "10px 20px"
    },
    cardList: {
        overflow: 'auto',
        maxHeight: 400,
        width: '100%',
    }

};

class UserGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, userList } = this.props;
        return(
            <div>
                <Grid container justify="center" alignContent="center">
                    <Typography variant="h4" gutterBottom className={classes.title}>Danh sách tình nguyện viên</Typography>
                    <List className={classes.cardList}>
                        <Grid container>
                            {userList.map(user => (
                                <Grid item sm={4} key={user.id}>
                                    <Card className={classes.cardWrapper}>
                                        <Grid container
                                              className={classes.userCardItem}
                                              direction="row"
                                              alignItems="center"
                                              justify="center"
                                        >
                                            <Grid item sm={2}>
                                                <img src={user.img} className={classes.avatar} alt="user-avatar"/>
                                            </Grid>

                                            <Grid item sm={10}>
                                                <Grid container direction="column" className={classes.cardContent}>
                                                    <Typography  className={classes.text}>{user.email}</Typography>
                                                    <Typography  className={classes.text}>Mua dụng cụ: {user.buyTools === true ? "Có" : "Không"}</Typography>
                                                    <Typography  className={classes.text}>Size áo: {user.size}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </List>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(UserGridList)
