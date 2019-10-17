import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Contact = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false)
    props.history.push("/dashboard")
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
            If you don't have one of our numbers at this point. What's going on??
            <strong>
              Contact us now and get your next deal!
            </strong>
          </h1>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(Contact);
