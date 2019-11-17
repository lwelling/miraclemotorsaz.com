import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/CardGiftcard";
import withStyles from "@material-ui/core/styles/withStyles";

import NavigationBar from "../NavigationBar";
import AddToWishList from "../AddToWishList";
import DisplayWishList from "../DisplayWishList";
import app from "firebase/app";

const styles = theme => ({
  main: {
    width: "auto",
    backgroundColor: "#e6f2ff",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
      width: "auto",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    background:
      "linear-gradient(175deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#4da6ff",
    secondary: "red"
  },
  root1: {
    marginTop: theme.spacing(3),
    backgroundColor: "#4da6ff",
    "&:hover": {
      background: "#99ccff"
    }
  },
  root2: {
    marginTop: theme.spacing(3),
    backgroundColor: "#ff6666",
    "&:hover": {
      background: "#ff9999"
    }
  },

  fauxList: {
    listStyleType: "none"
  },

  NavBrand: {
    height: theme.spacing(10),
    width: "auto"
  }
});

class WishList extends React.Component {
  state = {
    wishListItems: []
  };

  componentDidMount = async () => {
    this.unsubscribe = app
      .firestore()
      .doc(`/wishLists/${app.auth().currentUser.uid}`)
      .onSnapshot(snapshot => {
        const wishes = snapshot.data();
        if (wishes && wishes.listItems) {
          this.setState(prevState => ({
            ...prevState,
            wishListItems: wishes.listItems
          }));
        }
      });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  unsubscribe = null;

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <NavigationBar />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <AddToWishList />
          <DisplayWishList list={this.state.wishListItems} />
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(WishList);
