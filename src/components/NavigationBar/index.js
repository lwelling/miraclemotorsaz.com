import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import ChangeEmailPref from "../ChangeEmailPref";
import firebase from "../firebase";
import logo from "../../MM-Icon1.png";

const NavigationBar = props => {
  const [preference, setPreference] = useState("");

  useEffect(() => {
    firebase.getCurrentEmailPreference().then(setPreference);
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img style={{ height: "75px", width: "auto" }} src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/inventory">Inventory</Nav.Link>
          <Nav.Link href="/wishlist">WishList</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <NavDropdown
            title={firebase.getCurrentUsername()}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
            {!!!preference ? <ChangeEmailPref /> : null}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }
};

export default withRouter(NavigationBar);
