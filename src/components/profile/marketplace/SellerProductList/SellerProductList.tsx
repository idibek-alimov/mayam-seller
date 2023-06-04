import React from "react";
import { SellerOrderItem } from "../../../../extra/types/user/SellerOrderItem";
import SellerItem from "./SellerItem/SellerItem";

interface SellerProductListProp {
  items: SellerOrderItem[];
}
const SellerProductList = ({ items }: SellerProductListProp) => {
  // if (items && items.length == 0) {
  //   return <div>Nothing here</div>;
  // }
  return (
    <div className="item-list-box">
      <table className="item-list-info">
        <thead className="item-card-x">
          <tr>
            <th className="item-card-category">Создан</th>
            <th className="item-card-img"></th>
            <th className="item-card-brand">Бренд</th>
            <th className="item-card-seller-article">Наименование</th>
            <th className="item-card-color">Стоимость</th>
            <th className="item-card-size">Статус</th>
            <th className="item-card-id">Баркод товара</th>
            {/* <th className="item-card-edit"></th>
            <th className="item-card-delete"></th> */}
          </tr>
        </thead>
        <tbody className="item-list-body">
          {items
            ? items.map((item, index) => {
                return <SellerItem item={item} key={index} />;
              })
            : ""}
          {/* {myArticles
        ? myArticles.map((article, index) => {
            return <ItemCard {...article} key={index} />;
          })
        : ""} */}
        </tbody>
      </table>
    </div>
  );
};

export default SellerProductList;
