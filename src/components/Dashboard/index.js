import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import { Nav, Form, FormControl, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../MM-Icon1.png";

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
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
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
	listStyleType: "none",
  },

  NavBrand: {
	  height: theme.spacing(10),
	  width: 'auto',
  }
});

function Dashboard(props) {
  const { classes } = props;

  const [wish, setWish] = useState("");

  useEffect(() => {
    firebase.getCurrentUserWish().then(setWish);
  }, []);

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please register or login to access your dashboard.");
    props.history.replace("/login");
    return null;
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <br />
        <Typography component="h5" variant="h5">
          {!!wish ? (
            `Weekly Inventory Updates every Friday Night.`
          ) : (
            <CircularProgress size={40} />
          )}
        </Typography>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} className={classes.NavBrand} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outlined">Search</Button>
            </Form>
			<NavDropdown
                title={firebase.getCurrentUsername()}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">WishList</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  BidBetter
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
			  </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Typography component="h1" variant="h2">
          <ul className={classes.fauxList}>
            <li>LIST ITEM 1</li>
            <li>LIST ITEM 2</li>
            <li>LIST ITEM 3</li>
            <li>LIST ITEM 4</li>
            <li>LIST ITEM 5</li>
          </ul>
        </Typography>
      </Paper>
    </main>
  );

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }
}

export default withRouter(withStyles(styles)(Dashboard));
