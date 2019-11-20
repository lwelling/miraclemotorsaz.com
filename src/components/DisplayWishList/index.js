import React from "react";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AreYouSure from "../AreYouSure/index";
import "./style.css";
import { Row, Col, Container } from "react-bootstrap";
import VehicleEditor from "../VehicleEditor";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "90%",
    maxWidth: "95%",
    background:
      "linear-gradient(5deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: "10px"
  },
  title: {
    fontSize: 14,
  },
});

function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const ListItem = ({ item, idx }) => {
  const classes = useStyles();
  return !item ? null : (
    <Card raised style={{ paddingBottom: "10px" }} className={classes.flexContainer}>
      <CardContent>
        <Container>
          <Row>
            <Col lg={"auto"} md={"auto"} sm={"auto"} xl={"auto"} xs={"auto"}>
            <Typography variant="h5" component="h2">
                {item.year} {item.make} {item.model}
              </Typography>

              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {!!!item.mileage
                  ? null
                  : numberWithCommas(item.mileage) + `mi`}
              </Typography>
            </Col>

            <Col lg={"auto"} md={"auto"} sm={"auto"} xl={"auto"} xs={"auto"}>
              <span className="permanentMarker">
                {!!!item.mileage && item.price
                  ? `$` + numberWithCommas(item.price)
                  : `$` + numberWithCommas(item.price)}
              </span>
            </Col>
          </Row>
        </Container>
      </CardContent>
      <CardActions disableSpacing>
        <AreYouSure idx={idx} />
        <VehicleEditor action={"Edit"} vehicle={item} idx={idx} />
      </CardActions>
    </Card>
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
