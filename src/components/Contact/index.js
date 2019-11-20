import React from "react";
import { Typography, Button, Card, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/Email";
import { Form } from "react-bootstrap";
import { useTheme } from "@material-ui/styles";

const Contact = () => {
  const theme = useTheme();
  return (
    <main style={theme.main}>
      <Card style={theme.card}>
        <Avatar style={theme.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography variant="inherit">Contact us</Typography>
        <Form style={theme.form}>
          <Form.Group controlId="email.controlInput">
            <Form.Control type="email" placeholder="email" />
          </Form.Group>
          <Form.Group controlId="subject.controlInput">
            <Form.Control type="text" placeholder="subject" />
          </Form.Group>
          <Form.Group controlId="message.controlInput">
            <Form.Control
              as="textarea"
              rows="5"
              width="auto"
              placeholder="message"
            />
          </Form.Group>
          <Button style={theme.root1} type="submit" fullWidth>
            Submit
          </Button>
        </Form>
      </Card>
    </main>
  );
};

export default Contact;
