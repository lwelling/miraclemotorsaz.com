import React from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/DirectionsCarOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

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
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing(3)
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
        <Typography style={{ textAlign: "center" }} component="h1" variant="h5">
          Welcome to
        </Typography>
        <Typography style={{ textAlign: "center" }} component="h2" variant="h3">
          Miracle Motors
        </Typography>
        <Typography style={{ textAlign: "center" }} component="h1" variant="h6">
          Register for access
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
          className={classes.submit}
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
          className={classes.submit}
        >
          Login
        </Button>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(HomePage);
