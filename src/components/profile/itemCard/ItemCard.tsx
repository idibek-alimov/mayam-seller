import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import { CartArticle } from "../../../store/features/cart/cartSlice";
import { useAppSelector } from "../../../store/hooks";
import axios from "axios";
import { url } from "../../../extra/axios";

const ItemCard: React.FC<CartArticle> = (article: CartArticle): JSX.Element => {
  const [pic, setPic] = useState<string>();

  const access_token = useAppSelector((state) => state.token.access_token);

  let custom_headers = access_token
    ? { Authorization: String("Bearer " + access_token) }
    : { Authorization: String("") };

  const axioss = axios.create({
    headers: custom_headers,
    baseURL: "http://localhost:8080/api/product",
  });
  // "/uploads/" + article.pictures[0].src.split("/").pop()
  // useEffect(() => {
  //   console.log(article);
  //   setPic("/uploads/" + article.pictures[0].src.split("/").pop());
  // }, [article]);
  const onDeleteHandle = () => {
    axioss
      .delete(url + "/api/article/delete/" + article.id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="item-card-div">
      {article ? (
        <div className="item-card-content">
          <div className="item-card-left">
            <div className="item-card-image-box">
              <img src={"uploads/" + article.pictures[0].src} alt="" />
            </div>
            <div className="item-card-info">
              <span className="item-card-name">{article.name}</span>
              <span className="item-card-price">
                {article.inventories[0].price}
              </span>
            </div>
          </div>
          <div className="item-card-buttons">
            <button onClick={onDeleteHandle}>delete</button>
            {/* <button>two</button>
            <button>three </button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemCard;
