import React from "react";
import { Typography, Paper, Button, useTheme } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

import firebase from "../firebase";
import { Container, Row, Col } from "react-bootstrap";

import googleIcon from "./gSuiteIcon.png";
import logo from "../../MM-Icon1.png";

function HomePage(props) {
  const theme = useTheme();

  return firebase.checkAuthStatus() === true ? (
    <Redirect
      to={{ pathname: "/dashboard", state: { from: props.location } }}
    />
  ) : (
    <main style={theme.main}>
      <Paper style={theme.paper}>
        <Typography style={{ textAlign: "center" }} component="h2" variant="h3">
          <a href={"/dashboard"}>
            <img
              src={logo}
              alt={"Miracle Motors Emblem"}
              style={{ height: "2em", width: "auto" }}
            />
          </a>
        </Typography>
        <Button
          onClick={() => firebase.signInWithGoogle(props)}
          style={theme.root3}
          variant="contained"
        >
          {
            <img
              style={{ width: "8%", height: "auto", margin: "7px" }}
              src={googleIcon}
              alt={"Google signin button"}
            />
          }
          Sign in with Google
        </Button>
        <Container>
          <Row>
            <Col>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
                style={theme.root1}
              >
                Sign in
              </Button>
            </Col>
            <Col>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                style={theme.root2}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Container>
      </Paper>
    </main>
  );
}

export default HomePage;
