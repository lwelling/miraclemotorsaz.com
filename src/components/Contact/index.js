import React from "react";
import NavigationBar from "../NavigationBar/index";
import { Typography, Button, Card, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/Email";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form } from "react-bootstrap";

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
  card: {
    background:
      "linear-gradient(20deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
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
    },
    width: "100%"
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
  },
});

const Contact = props => {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <NavigationBar />
      <Card className={classes.card}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography>Contact us</Typography>
        <Form>
          <Form.Group controlId="email.controlInput">
            <Form.Control type="email" placeholder="email" />
          </Form.Group>
          <Form.Group controlId="subject.controlInput">
            <Form.Control type="text" placeholder="subject" />
          </Form.Group>
          <Form.Group controlId="message.controlInput">
            <Form.Control as="textarea" rows="5" width="auto" placeholder="message" />
          </Form.Group>
          <Button className={classes.root1} type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </main>
  );
};

export default withStyles(styles)(Contact);
