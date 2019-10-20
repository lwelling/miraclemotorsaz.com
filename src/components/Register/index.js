import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
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
      "linear-gradient(165deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
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
  Switch: {
    color: "#4da6ff"
  }
});
function Register(props) {
  const { classes } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setpreference] = useState({
    licensedDealer: false,
    receiveInventory: true
  });
  const handleChange = name => event => {
    setpreference({ ...preference, [name]: event.target.checked });
  };
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                required
                variant="primary"
                className={classes.Switch}
                checked={preference.licensedDealer}
                onChange={handleChange("licensedDealer")}
                value="licensedDealer"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="I am a licensed auto dealer"
          />
          <FormControlLabel
            control={
              <Switch
                className={classes.Switch}
                checked={preference.receiveInventory}
                onChange={handleChange("receiveInventory")}
                value="receiveInventory"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="I want to receive weekly inventory"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onRegister}
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
            Go back to Login
          </Button>
        </form>
      </Paper>
    </main>
  );
  async function onRegister() {
    if (!!email && !!name && !!password & !!preference.licensedDealer) {
      try {
        await firebase.register(name, email, password);
        await firebase.addPreference({ preference });
        await firebase.updateProfile(name, email, preference);
        props.history.replace("/dashboard");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please fill out form entirely");
    }
  }
}

export default withRouter(withStyles(styles)(Register));
