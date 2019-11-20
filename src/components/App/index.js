import React, { useState, useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../App/styles.css";
import HomePage from "../HomePage";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import firebase from "../firebase";
import Contact from "../Contact";
import Inventory from "../Inventory";
import WishList from "../WishList";
import PrivateRoute from "../PrivateRoute";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

const theme = createMuiTheme({
  main: {
    fontFamily: "Raleway,sans-serif",
    fontSize: "3em",
    width: "auto",
    display: "block",
    marginLeft: "5%",
    marginRight: "5%"
  },
  paper: {
    background:
      "linear-gradient(180deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginBottom: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `16px 24px 16px 16px`
  },
  card: {
    background:
      "linear-gradient(77deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `16px 24px 16px 16px`
  },
  form: {
    display: "block",
    width: "100%"
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#4da6ff"
  },
  dashboardAvatar: {
    width: "5em", 
    height: "auto",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  root1: {
    marginTop: "24px",
    backgroundColor: "#4da6ff",
    fontFamily: "Raleway,sans-serif",
    width: "100%",
  },
  root2: {
    marginTop: "24px",
    backgroundColor: "#ff6666",
    fontFamily: "Raleway,sans-serif",
    width: "100%",

  },
  root3: {
    marginTop: "24px",
    width: "84%",
    background:
      "linear-gradient(13deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    fontFamily: "Raleway,sans-serif",
  },
  checkMark: {
    color: "#4da6ff",
  },
  NavBrand: {
    height: "80px",
    width: "auto"
  }
});

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/contact" component={Contact} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/inventory" component={Inventory} />
          <PrivateRoute exact path="/wishlist" component={WishList} />
        </Switch>
        <Footer />
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
