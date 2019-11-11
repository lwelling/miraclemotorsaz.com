import React from "react";

const ListItem = ({ item }) => (
  <div>
    blah blah blah
  </div>
)

const DisplayWishList = ({ list }) => {
  return (
    <>
      <ul>
        {/* {
        list.map((item, idx) => (
          <li key={idx}>
            Make: {item.make}
            Model: {item.model}
            Year: {item.year}
          </li>
        ))
      } */}
        {list.map((item, idx) => <ListItem item={item} key={idx} />)}
      </ul>
    </>
  );
};

export default DisplayWishList;
