import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Backdrop } from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles";
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });

function Contact(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
  
    const handleClose = () => {
      setOpen(false);
      props.history.replace('/dashboard')
    };

  return (
<div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Contact Us</h2>
            <p id="spring-modal-description">
                <a href="mailto:lucaswelling1@gmail.com">Email</a>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default withRouter(withStyles(useStyles)(Contact));
