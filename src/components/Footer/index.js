import React from "react";
import { Nav } from "react-bootstrap";
import { useTheme } from "@material-ui/styles";

const Footer = () => {
  const theme = useTheme();
  return (
    <div style={theme.siteText}>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link
            style={{ color: "gray" }}
            className={theme.main}
            href="/contact"
          >
            Contact Us
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Footer;
