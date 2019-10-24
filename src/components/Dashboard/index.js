import React from "react";
import { Typography, Paper, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { Button, Jumbotron, Container, Col, Row } from "react-bootstrap";

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
  },
  Jumbotron: {
    textAlign: "center"
  }
});
function Dashboard(props) {
  const { classes } = props;
  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please register or login to access your dashboard.");
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
        <Typography>Still under construction, check back soon...</Typography>
        <Jumbotron className={classes.Jumbotron} fluid>
          <Container>
            <h5>Welcome to your</h5>
            <h1>Dashboard</h1>
            <Row>
              <Col>
                <Button
                  type="submit"
                  variant="primary"
                  href={"/wishlist"}
                  className={classes.root1}
                >
                  WishList
                </Button>{" "}
                <br />
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="secondary"
                  href={"/inventory"}
                  className={classes.root2}
                >
                  Inventory
                </Button>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
