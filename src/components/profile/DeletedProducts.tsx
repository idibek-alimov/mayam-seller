import React from "react";
import "./Profile.css";
import ItemList from "./itemList/ItemList";
import { Route, Routes } from "react-router-dom";

const DeletedProducts = () => {
  return (
    <div style={{ width: "100%" }}>
      <ItemList pathURL="/api/article/user/removable/true" />
    </div>
  );
};

export default DeletedProducts;
