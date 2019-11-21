import React, { useEffect, useState } from "react";
import { Avatar, Paper } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/CardGiftcard";
import { useTheme } from "@material-ui/styles";
import app from "firebase/app";

import AddToWishList from "../AddToWishList";
import DisplayWishList from "../DisplayWishList";

const WishList = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    let unsubscribe = app
      .firestore()
      .doc(`/wishLists/${app.auth().currentUser.uid}`)
      .onSnapshot(snapshot => {
        const wishes = snapshot.data();
        if (wishes && wishes.listItems) {
          setWishListItems(wishes.listItems);
          return () => {
            unsubscribe();
          };
        }
      });
  }, []);

  return (
    <>
      <main style={theme.flexContainer}>
        <Paper style={theme.paper}>
          <Avatar style={theme.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <AddToWishList />
          <DisplayWishList list={wishListItems} />
        </Paper>
      </main>
    </>
  );
};

export default WishList;
