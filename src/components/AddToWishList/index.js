import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";

const AddToWishList = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [miles, setMiles] = useState('');


  const newVehicle = {
    year,
    make,
    model,
    price,
    miles
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add To Your WishList
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add To Your WishList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                name="year"
                onChange={e => setYear(e.target.value)}
                type="number"
                placeholder="Enter year"
              />
            </Form.Group>
            <Form.Group controlId="formMake">
              <Form.Label>Make</Form.Label>
              <Form.Control
                name="make"
                onChange={e => setMake(e.target.value)}
                type="text"
                placeholder="Make"
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                name="model"
                onChange={e => setModel(e.target.value)}
                type="text"
                placeholder="Model"
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Maximum Price</Form.Label>
              <Form.Control
                name="price"
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="Max Price"
              />
            </Form.Group>
            <Form.Group controlId="formMiles">
              <Form.Label>Miles</Form.Label>
              <Form.Control
                name="miles"
                onChange={e => setMiles(e.target.value)}
                type="number"
                placeholder="Max Mileage"
              />
            </Form.Group>
            <Button
              variant="primary"
              size="md"
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

export default withRouter(AddToWishList);
