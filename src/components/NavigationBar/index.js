import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import firebase from "../firebase";

import logo from "../../MM-Icon1.png";

const NavigationBar = props => {
  return !firebase.checkAuthStatus() ? (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Log in/ Sign up</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img style={{ height: "75px", width: "auto" }} src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/inventory">Inventory</Nav.Link>
          <Nav.Link href="/wishlist">WishList</Nav.Link>
          <NavDropdown
            title={firebase.getCurrentUsername()}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => firebase.logout(props)}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavigationBar);
