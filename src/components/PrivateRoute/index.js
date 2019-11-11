import React from "react";
import firebase from "../firebase";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ (props) => (
        firebase.checkAuthStatus() === true ?
        <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} />
);

export default PrivateRoute;
