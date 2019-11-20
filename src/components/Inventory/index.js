import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/DirectionsCarTwoTone";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  ListGroup,
  Image,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  Container
} from "react-bootstrap";
import app from "firebase/app";

import "./style.css";
import firebase from "../firebase";

const styles = theme => ({
  main: {
    width: "auto",
    backgroundColor: "#e6f2ff",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
      width: "auto",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    background:
      "linear-gradient(175deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#4da6ff",
    secondary: "red"
  },
  root1: {
    marginTop: theme.spacing(3),
    backgroundColor: "#4da6ff",
    "&:hover": {
      background: "#99ccff"
    }
  },
  root2: {
    marginTop: theme.spacing(3),
    backgroundColor: "#ff6666",
    "&:hover": {
      background: "#ff9999"
    }
  },

  fauxList: {
    listStyleType: "none"
  },

  NavBrand: {
    height: theme.spacing(10),
    width: "auto"
  }
});

class Inventory extends React.Component {
  state = {
    inventoryItems: []
  };

  componentDidMount = async () => {
    this.unsubscribe = app
      .firestore()
      .doc(`/currentInventory/D6zbAVJCUSseTkp5XrC1`)
      .onSnapshot(snapshot => {
        let wishes = snapshot.data();
        if (wishes && wishes.listItems) {
          this.setState(prevState => ({
            ...prevState,
            inventoryItems: wishes.listItems
          }));
        }
      });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  unsubscribe = null;

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <DisplayInventory list={this.state.inventoryItems} />
        </Paper>
      </main>
    );
  }
}

const DisplayInventory = ({ list }) => {
  return (
    <>
    <Card raised>
        {list.map((item, idx) => (
          <ListItem item={item} idx={idx} />
        ))}
      </Card>
    </>
  );
};

export const ListItem = ({ item }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [wish, wishAdded] = useState(false);

  return !item ? null : (
    <ExpansionPanel expanded style={{ width: "100%" }}>
      <ExpansionPanelSummary>
        <Typography style={{ fontSize: "2em", fontVariant: "button" }}>
          {item.year} {item.make} {item.model}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container>
          <Row>
            <Col lg={true}>
              <a href={item.photoURL} target="_blank" rel="noopener noreferrer">
                <Image
                  className={"responsive-image"}
                  src={item.photoURL}
                  responsive="true"
                />
              </a>
            </Col>
          </Row>
      
          <Row>
            <Col lg={true}>
              <ListGroup.Item active><small>VIN: </small><br />{item.vin}</ListGroup.Item>
                <ListGroup.Item>
                  <small>Miles: </small><br />{numberWithCommas(item.mileage)}
                </ListGroup.Item>
                <ListGroup.Item><small>Trim: </small><br />{item.trim}</ListGroup.Item>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <h4 className="permanentMarkerForSale">
                ${numberWithCommas(item.price)}
              </h4>
              <Button
                disabled={wish}
                onClick={() => {
                  firebase.addToWishList(item);
                  wishAdded(true);
                }}
                variant="outline-success"
              >
                {!wish ? "Add to WishList" : "Added to WishList"}
              </Button>
            </Col>
          </Row>

        </Container>
      </ExpansionPanelDetails>

      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>More Info...</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ListGroup>
            <Row>
              <ListGroup.Item>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Kelley Book Date: {item.kbbValDate}
                    </Tooltip>
                  }
                >
                  <span>KBB Lending ${numberWithCommas(item.kbbLending)}</span>
                </OverlayTrigger>
                </ListGroup.Item>
              <ListGroup.Item>Stock #{item.stock}</ListGroup.Item>
              <ListGroup.Item>Engine: {item.engine}</ListGroup.Item>
              <ListGroup.Item>Drivetrain: {item.drivetrain}</ListGroup.Item>
              <ListGroup.Item>Transmission: {item.transmission}</ListGroup.Item>
            </Row>
          </ListGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Inventory);
