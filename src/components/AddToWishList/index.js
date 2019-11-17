import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import firebase from "../firebase";

const AddToWishList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [milesMax, setMilesMax] = useState("");

  const newVehicle = {
    year,
    make,
    model,
    priceMax,
    milesMax
  };

  const isFormValid = () => {
    return !!year &&
      !!make &&
      !!model &&
      !!priceMax &&
      !!milesMax
      ? true
      : false;
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "#4da6ff"
        }}
        onClick={handleShow}
      >
        Add To Your WishList
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add To Your WishList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formYear">
              {/* <Form.Label>Year</Form.Label> */}
              <Form.Control
                name="year"
                onChange={e => setYear(e.target.value)}
                type="number"
                placeholder="Year"
              />
            </Form.Group>
            <Form.Group controlId="formMake">
              {/* <Form.Label>Make</Form.Label> */}
              <Form.Control
                name="make"
                onChange={e => setMake(e.target.value)}
                type="text"
                placeholder="Make"
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              {/* <Form.Label>Model</Form.Label> */}
              <Form.Control
                name="model"
                onChange={e => setModel(e.target.value)}
                type="text"
                placeholder="Model"
              />
            </Form.Group>
            <Form.Group controlId="formPriceMax">
              {/* <Form.Label>Maximum Price</Form.Label> */}
              <Form.Control
                name="priceMax"
                onChange={e => setPriceMax(e.target.value)}
                type="number"
                placeholder="Maximum Price"
              />
            </Form.Group>
            <Form.Group controlId="formMilesMax">
              {/* <Form.Label>Maximum Miles</Form.Label> */}
              <Form.Control
                name="milesMax"
                onChange={e => setMilesMax(e.target.value)}
                type="number"
                placeholder="Maximum Mileage"
              />
            </Form.Group>
            <Button
            disabled={!isFormValid()}
              style={{
                backgroundColor: "#4da6ff"
              }}
              block
              onClick={() => {
                handleClose();
                firebase.addToWishList(newVehicle);
              }}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddToWishList;
