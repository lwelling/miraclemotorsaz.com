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

  const name = currentUser.displayName
  const firstName = name.split(' ').slice(0, -1).join(' ');
  return (
    <main style={theme.main}>
      <Paper style={theme.paper}>
      <Avatar className="center" style={theme.dashboardAvatar}>
                {currentUser.photoURL ? (
                  <Image fluid src={currentUser.photoURL} roundedCircle />
                ) : (
                  null
                )}
              </Avatar>
        <Container>
          <Row>
            <Col>
              <Tooltip title={dateCreated} placement="top-end">
                <h1>{firstName},</h1>
              </Tooltip>
              <h5>Welcome to your Dashboard,</h5>
              <Typography style={{color: "grey" }} variant="overline" display="block" gutterBottom>
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
                <Col>
                  <Button
                    type="submit"
                    variant="primary"
                    href={"/wishlist"}
                    style={theme.root1}
                  >
                    WishList
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
                    Inventory
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
