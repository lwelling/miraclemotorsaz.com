import React, { useState, useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";

import rootReducer from '../../reducers';
import "../App/styles.css";
import HomePage from "../HomePage";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import firebase from "../firebase";
import Contact from "../Contact";
import CurrentInv from "../CurrentInv";
import WishList from "../WishList";

const theme = createMuiTheme();
const store = createStore(rootReducer);

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });
  return firebaseInitialized !== false ? (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/currentinv" component={CurrentInv} />
            <Route exact path="/wishlist" component={WishList} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
