import React from "react";
import { Tooltip, Typography, Paper, Avatar } from "@material-ui/core";
import { Button, Container, Col, Row, Image } from "react-bootstrap";
import { useTheme } from "@material-ui/styles";

import firebase from "../firebase";
// import UpdatePhoneNumber from "../UpdatePhoneNumber";

function Dashboard() {
  const theme = useTheme();
  const currentUser = firebase.getCurrentUserObject();
  const dateCreated = "Joined " + currentUser.metadata.creationTime;

  const firstName = currentUser.displayName
    ? currentUser.displayName
        .split(" ")
        .slice(0, -1)
        .join(" ")
    : null;

  return (
    <main style={theme.main}>
      <Paper style={theme.paper}>
        <Container style={theme.siteText}>
          <Row>
            <Col>
              <Tooltip title={dateCreated} placement="top-end">
                <h1>{firstName}</h1>
              </Tooltip>
              <h5>Welcome to your Dashboard</h5>
              <Typography
                style={{ color: "grey" }}
                variant="overline"
                display="block"
                gutterBottom
              >
                {currentUser.email}
                {currentUser.emailVerified ? (
                  <sup>
                    <span style={theme.checkMark}>&#10004;</span>
                  </sup>
                ) : null}
                <br />
                {/* <UpdatePhoneNumber /> */}
              </Typography>
            </Col>
            <Col>
              <Row>
                <Avatar style={theme.dashboardAvatar}>
                  {currentUser.photoURL ? (
                    <Image fluid src={currentUser.photoURL} roundedCircle />
                  ) : null}
                </Avatar>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="primary"
                    href={"/wishlist"}
                    style={theme.root1}
                  >
                    My WishList
                  </Button>
                  <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="secondary"
                    href={"/inventory"}
                    style={theme.root1}
                  >
                    Browse Inventory
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Paper>
    </main>
  );
}

export default Dashboard;
