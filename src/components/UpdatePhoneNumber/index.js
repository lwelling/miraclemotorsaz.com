import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import firebase from "../firebase";
import { useTheme } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const UpdatePhoneNumber = () => {
  const theme = useTheme();
  const [number, setNumber] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const isFormValid = () => {
    return number.length === 10 ? true : false;
  };

  return number ? (
    <>
      <Typography variant="inherit">{number}</Typography>
    </>
  ) : (
    <>
      <Button
        onClick={handleShow}
        type="submit"
        variant="outline-danger"
        // style={theme.root1}
      >
        Update Phone Number
      </Button>
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title centered="true"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhoneNumber">
              <Form.Control
                style={theme.form}
                name="phoneNumber"
                onChange={e => setNumber(e.target.value)}
                type="number"
                placeholder="Enter phone number..."
              />
            </Form.Group>
            <Button
              disabled={!isFormValid()}
              style={{
                backgroundColor: "#4da6ff"
              }}
              block
              onClick={() => {
                // firebase.updatePhoneNumber(number);
                handleClose();
              }}
            >
              Confirm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdatePhoneNumber;
