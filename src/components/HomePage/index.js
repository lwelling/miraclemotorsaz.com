import React from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/DirectionsCarOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import logo from "../../MM-Icon1.png";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    background:
      "linear-gradient(180deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#4da6ff"
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
  NavBrand: {
    height: theme.spacing(10),
    width: "auto"
  }
});

function HomePage(props) {
  const { classes } = props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography
          style={{ color: "#0a1a29", textAlign: "center" }}
          component="h1"
          variant="h5"
        >
          Welcome to
        </Typography>
        <Typography style={{ textAlign: "center" }} component="h2" variant="h3">
          <a href={"/dashboard"}>
            <img src={logo} className={classes.NavBrand} alt="logo" />
          </a>
        </Typography>
        <Typography
          style={{ color: "#0a1a29", textAlign: "center" }}
          component="h1"
          variant="h6"
        >
          Login or Register <br /> for access
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
          className={classes.root1}
        >
          Register
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
          className={classes.root2}
        >
          Login
        </Button>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(HomePage);
