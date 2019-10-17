import React from "react";
import { Typography, Paper, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/DirectionsCarOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import NavigationBar from "../NavigationBar";

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

function CurrentInv(props) {
  const { classes } = props;

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please register or login to access Inventory.");
    props.history.replace("/login");
    return null;
  }

  return (
    <main className={classes.main}>
      <NavigationBar />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography>This is where our current inventory will be...</Typography>
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(CurrentInv));
