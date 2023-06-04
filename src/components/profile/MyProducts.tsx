import React from "react";
import "./Profile.css";
import ItemList from "./itemList/ItemList";
import { Route, Routes } from "react-router-dom";

const MyProducts = () => {
  return (
    <div style={{ width: "100%" }}>
      <ItemList pathURL="/api/article/user/presentable/true" />
    </div>
  );
};

export default MyProducts;
