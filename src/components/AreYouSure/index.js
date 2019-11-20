import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import firebase from "../firebase";

const AreYouSure = ({ idx }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Remove
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>

              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to do this?</Modal.Title>
              </Modal.Header>
              <Typography style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", textAlign: "center" }} >
              <Button
                style={{ margin: "10px" }}
                variant="danger"
                type="submit"
                onClick={() => {
                  firebase.deleteFromWishList(idx);
                  handleClose();
                }}
              >
                Confirm
              </Button>
              <Button
                style={{ margin: "10px" }}
                variant="outline-danger"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
          </Typography>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AreYouSure;
