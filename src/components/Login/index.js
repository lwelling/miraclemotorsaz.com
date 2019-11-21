import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useTheme } from "@material-ui/styles";
import { Link, Redirect } from "react-router-dom";

import firebase from "../firebase";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  return firebase.checkAuthStatus() === true ? (
    <Redirect
      to={{ pathname: "/dashboard", state: { from: props.location } }}
    />
  ) : (
    <main style={theme.main}>
      <Paper style={theme.paper}>
        <Avatar style={theme.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={theme.form} onSubmit={e => e.preventDefault() && false}>
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
          <Button
            type="submit"
            fullwidth="true"
            variant="contained"
            color="primary"
            onClick={login}
            style={theme.root1}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullwidth="true"
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            style={theme.root2}
          >
            Register
          </Button>
        </form>
      </Paper>
    </main>
  );

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default SignIn;
