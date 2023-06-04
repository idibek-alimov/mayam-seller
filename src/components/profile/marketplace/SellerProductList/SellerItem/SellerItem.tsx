import React from "react";
import "./SellerItem.css";
import { SellerOrderItem } from "../../../../../extra/types/user/SellerOrderItem";

interface SellerItemProp {
  item: SellerOrderItem;
}

const SellerItem = ({ item }: SellerItemProp) => {
  return (
    <tr className="item-card-box">
      <th className="item-card-category">{item.createdAt.slice(0, 10)}</th>
      <th className="item-card-img"></th>
      {/* <th className="item-card-brand">{item.brand}</th> */}
      <th className="item-card-seller-article">
        <div>
          {item.brand}/{item.name}
        </div>
      </th>
      <th className="item-card-color">{item.originalPrice}</th>
      <th className="item-card-size">{item.status}</th>
      <th className="item-card-id">{item.sellerArticle}</th>
    </tr>
  );
};

export default SellerItem;
