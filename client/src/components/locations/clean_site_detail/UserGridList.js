import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button"

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

    handleChange = (e)=>{
        this.props.addEmail(e.target.value)
    }

    render() {
        const {classes, userList, emailList, clear, selectAll, handleOpenEmailForm} = this.props;
        return (
            <List className={classes.cardList}>
                <Typography align="center" variant="h4" gutterBottom className={classes.title}>Danh sách tình nguyện
                    viên</Typography>
                    <div style={{width:"100%",textAlign:"right"}}>
                        <Button disabled={userList===undefined || userList===null || userList.length===0}
                                onClick={()=>selectAll()}>Select All</Button>
                        <Button disabled={emailList===undefined || emailList===null || emailList.length===0}
                                onClick={()=>clear()}>Clear</Button>
                        <Button disabled={emailList===undefined || emailList===null || emailList.length===0}
                                onClick={()=>handleOpenEmailForm()}>Send Email</Button>
                    </div>
                <Grid container>
                    {userList.map(user => (
                        <Grid item sm={4} key={user.id}>
                            <Card className={classes.cardWrapper}>
                                <Grid container direction="row" alignItems="center" justify="center" spacing={4}>
                                    <Grid item sm={3}>
                                        <Avatar style={{marginLeft: "0.7em"}} alt="Remy Sharp" src={user.img}/>
                                        <input onChange={this.handleChange} value={user.email} type="checkbox" checked={emailList.includes(user.email)}></input>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography className={classes.text}>{user.email}</Typography>
                                        <Typography className={classes.text}>Mua dụng
                                            cụ: {user.buyTools === true ? "Có" : "Không"}</Typography>
                                        <Typography className={classes.text}>Size áo: {user.size}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </List>
        )
    }
}

export default withStyles(styles)(UserGridList)
