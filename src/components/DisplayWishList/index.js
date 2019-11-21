import React, { useState } from "react";
import {
  ExpansionPanel,
  Typography,
  ExpansionPanelSummary
} from "@material-ui/core";
import AreYouSure from "../AreYouSure/index";
import "./style.css";
import { Row, Col, Container } from "react-bootstrap";
import VehicleEditor from "../VehicleEditor";
import { useTheme } from "@material-ui/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const ListItem = ({ item, idx }) => {
  const theme = useTheme();

  return !item ? null : (
    <ExpansionPanel
      style={theme.flexContainer}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Container style={theme.flexRow}>
          <Col>
            <span style={theme.title}>
              {item.year} {item.make} {item.model}{" "}
            </span>
            <br />
            <Typography color="textSecondary">
              {numberWithCommas(item.mileage) + `mi`}
            </Typography>
          </Col>

          <Col lg={"auto"} md={"auto"} sm={"auto"} xl={"auto"} xs={"auto"}>
            <span className="permanentMarker">
              {`$` + numberWithCommas(item.price)}
            </span>
          </Col>
        </Container>
      </ExpansionPanelSummary>
      <Container>
        <Row>
          <AreYouSure idx={idx} />
        </Row>
        <Row>
          <VehicleEditor action={"Edit"} vehicle={item} idx={idx} />
        </Row>
      </Container>
    </ExpansionPanel>
  );
};

const DisplayWishList = ({ list }) => {
  return (
    <>
      {list.map((item, idx) => (
        <ListItem item={item} idx={idx} />
      ))}
    </>
  );
};

export default DisplayWishList;
