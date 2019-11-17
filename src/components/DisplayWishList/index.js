import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "90%",
    maxWidth: "95%",
    background:
    "linear-gradient(5deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)",
  marginTop: "10px",
  },
});


export const ListItem = ({ item, idx }) => {
  const classes = useStyles();
  return !item ? null : (
    <>
      <Card style={{ paddingBottom: "10px" }} className={classes.flexContainer}>
        <CardContent>
          <Typography variant="h6" style={{ listStyleType: "none" }}>
            {item.year} {item.make} {item.model}
          </Typography>
          <Typography style={{ listStyleType: "none" }} variant="body1">
            {item.milesMax}mi <br />${item.priceMax}
          </Typography>
        </CardContent>
        <CardActions>
          {/* TODO: create logic for editing entries */}
          <Button
            type="submit"
            fullWidth
            onClick={() => firebase.deleteFromWishList(idx)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
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
