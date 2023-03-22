import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import { CartArticle } from "../../../store/features/cart/cartSlice";
const ItemCard: React.FC<CartArticle> = (article: CartArticle): JSX.Element => {
  const [pic, setPic] = useState<string>(
    "/uploads/" + article.pictures[0].src.split("/").pop()
  );
  // useEffect(() => {
  //   console.log(article);
  //   setPic("/uploads/" + article.pictures[0].src.split("/").pop());
  // }, [article]);
  return (
    <div className="item-card-div">
      {article ? (
        <div className="item-card-content">
          <div className="item-card-left">
            <div className="item-card-image-box">
              <img src={pic} alt="" />
            </div>
            <div className="item-card-info">
              <span className="item-card-name">{article.name}</span>
              <span className="item-card-price">
                {article.inventories[0].price}
              </span>
            </div>
          </div>
          <div className="item-card-buttons">
            <button>one</button>
            <button>two</button>
            <button>three </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemCard;
