import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const WishList = props => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.history.push("/dashboard");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>WishList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center"
            }}
          >
            This is your WishList!
          </h1>
          <h3
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "lighter"
            }}
          >
            Here, you will be able to add cars to your WishList according to multiple parameters like <b>Year, Make, and Price.</b> Your personalized list is then compared to dozens of units each day for a match.
          </h3>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(WishList);
