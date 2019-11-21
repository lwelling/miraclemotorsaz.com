import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import firebase from "../firebase";
import { useTheme } from "@material-ui/styles";

const VehicleEditor = ({ vehicle, idx, action }) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    resetNewVehicle();
  };
  const [year, setYear] = useState(vehicle ? vehicle.year : "");
  const [make, setMake] = useState(vehicle ? vehicle.make : "");
  const [model, setModel] = useState(vehicle ? vehicle.model : "");
  const [price, setPrice] = useState(vehicle ? vehicle.price : "");
  const [mileage, setMileage] = useState(vehicle ? vehicle.mileage : "");

  let newVehicle = {
    year,
    make,
    model,
    price,
    mileage
  };

  const isFormValid = () => {
    return vehicle
      ? vehicle.year &&
          vehicle.make &&
          vehicle.model &&
          vehicle.price &&
          vehicle.mileage
      : newVehicle.year &&
          newVehicle.make &&
          newVehicle.model &&
          newVehicle.price &&
          newVehicle.mileage;
  };

  const resetNewVehicle = () => {
    setYear("");
    setMake("");
    setModel("");
    setPrice("");
    setMileage("");
  };

  return (
    <>
          <Button
            onClick={handleShow}
            fullwidth="true"
            variant="contained"
            color="secondary"
            style={theme.root1}
          >
        {action ? action : `Edit`}
      </Button>
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title centered="true"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formYear">
              <Form.Control
                name="year"
                onChange={e => setYear(e.target.value)}
                type="number"
                placeholder="Year"
                defaultValue={vehicle ? vehicle.year : null}
              />
            </Form.Group>
            <Form.Group controlId="formMake">
              <Form.Control
                name="make"
                onChange={e => setMake(e.target.value)}
                type="text"
                placeholder="Make"
                defaultValue={vehicle ? vehicle.make : null}
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Control
                name="model"
                onChange={e => setModel(e.target.value)}
                type="text"
                placeholder="Model"
                defaultValue={vehicle ? vehicle.model : null}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Control
                name="price"
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="Maximum Price"
                defaultValue={vehicle ? vehicle.price : null}
              />
            </Form.Group>
            <Form.Group controlId="formMileage">
              <Form.Control
                name="mileage"
                onChange={e => setMileage(e.target.value)}
                type="number"
                placeholder="Maximum Mileage"
                defaultValue={vehicle ? vehicle.mileage : null}
              />
            </Form.Group>
            <Button
              disabled={!isFormValid()}
              style={{
                backgroundColor: "#4da6ff"
              }}
              block
              onClick={async () => {
                await firebase.updateWishList(newVehicle, idx);
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

export default VehicleEditor;
