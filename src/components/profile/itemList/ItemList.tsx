import React, { useState, useEffect } from "react";
import "./ItemList.css";
import ItemCard from "../itemCard/ItemCard";
import Axios, { url } from "../../../extra/axios";
import { ArticleCreateType } from "../../../extra/types/create/ArticleCreateType";

interface ItemListProp {
  pathURL: string;
}

const ItemList = ({ pathURL }: ItemListProp) => {
  const [myArticles, setMyArticles] = useState<ArticleCreateType[]>();

  const axios = Axios();

  useEffect(() => {
    //"/api/article/user/presentable/true"
    axios
      .get(url + pathURL)
      .then((res) => {
        console.log(res.data);
        setMyArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="item-list-box">
      <table className="item-list-info">
        <thead className="item-card-x">
          <tr>
            <th className="item-card-img"></th>
            <th className="item-card-category">Предмет</th>
            <th className="item-card-brand">Бренд</th>
            <th className="item-card-seller-article">Артикул продовца</th>
            <th className="item-card-color">Цвет</th>
            <th className="item-card-size">Размер</th>
            <th className="item-card-id">Артикул MM</th>
            <th className="item-card-edit"></th>
            <th className="item-card-delete"></th>
          </tr>
        </thead>
        <tbody className="item-list-body">
          {myArticles
            ? myArticles.map((article, index) => {
                return <ItemCard {...article} key={index} />;
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
