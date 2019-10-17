import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import firebase from "../firebase";

const ChangeEmailPref = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.history.push("/currentinv");
  };

  const handleShow = () => {
    setShow(true);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign up for fresh inventory weekly!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up for Fresh Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography>
            Looks like you're not signed up for fresh inventory emails...
            <br />
            <strong>Sign up now and never miss a deal!</strong>
            <Button
              variant="primary"
              size="md"
              block
              onClick={() => {
                firebase.updateEmailPreference();
                handleClose();

              }}
            >
              Sign up now
            </Button>
          </Typography>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(ChangeEmailPref);
