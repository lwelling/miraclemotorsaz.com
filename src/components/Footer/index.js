import React from "react";
import { Nav } from "react-bootstrap";
import { useTheme } from "@material-ui/styles";

const Footer = () => {
  const theme = useTheme();
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Nav.Link style={{ color: "gray" }} className={theme.main} href="/contact">
          Contact Us
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Footer;
