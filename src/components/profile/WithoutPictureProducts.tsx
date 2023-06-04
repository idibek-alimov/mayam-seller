import React from "react";
import ItemList from "./itemList/ItemList";

const WithoutPictureProducts = () => {
  return (
    <div style={{ width: "100%" }}>
      <ItemList pathURL="/api/article/user/presentable/false" />
    </div>
  );
};

export default WithoutPictureProducts;
