import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../MM-Icon1.png";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import ChangeEmailPref from "../ChangeEmailPref";

const NavigationBar = props => {
  const [preference, setPreference] = useState("");

  useEffect(() => {
    firebase.getCurrentEmailPreference().then(setPreference);
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/dashboard">
        <img style={{ height: "75px", width: "auto" }} src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/currentinv">Inventory</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="#action/3.3">BidBetter</Nav.Link>
          <NavDropdown
            title={firebase.getCurrentUsername()}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
            <NavDropdown.Divider />
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
