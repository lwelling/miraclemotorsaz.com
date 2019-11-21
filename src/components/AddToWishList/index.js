import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import firebase from "../firebase";
import { useTheme } from "@material-ui/styles";

const AddToWishList = () => {
  const [show, setShow] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");

  const newVehicle = {
    year,
    make,
    model,
    price,
    mileage
  };


  const isFormValid = () => {
    return !!year && !!make && !!model && !!price && !!mileage
      ? true
      : false;
  };

  const resetNewVehicle = () => {
    setYear("")
    setMake("")
    setModel("")
    setPrice("")
    setMileage("")
  }

  return (
    <>
          <Button
            onClick={handleShow}
            fullwidth="true"
            variant="contained"
            color="secondary"
            style={theme.root1}
          >
        Add To Your WishList
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title centered="true">Add To Your WishList</Modal.Title>
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
            <Form.Group controlId="formPrice">
              {/* <Form.Label>Maximum Price</Form.Label> */}
              <Form.Control
                name="price"
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="Maximum Price"
              />
            </Form.Group>
            <Form.Group controlId="formMileage">
              {/* <Form.Label>Maximum Price</Form.Label> */}
              <Form.Control
                name="mileage"
                onChange={e => setMileage(e.target.value)}
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
                resetNewVehicle();
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
