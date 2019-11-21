import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import firebase from "../firebase";
import { useTheme } from "@material-ui/styles";

const AreYouSure = ({ idx }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Button
        onClick={handleShow}
        fullwidth="true"
        variant="contained"
        color="secondary"
        style={theme.root2}
      >
        Remove
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to do this?</Modal.Title>
          </Modal.Header>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Button
              fullwidth="true"
              variant="contained"
              color="secondary"
              style={theme.root2}
              onClick={() => {
                firebase.deleteFromWishList(idx);
                handleClose();
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              fullwidth="true"
              variant="contained"
              color="secondary"
              style={theme.root1}
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
