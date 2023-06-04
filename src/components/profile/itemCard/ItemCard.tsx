import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import { CartArticle } from "../../../store/features/cart/cartSlice";
import Axios, { url } from "../../../extra/axios";
import { Article } from "../../../extra/types/Article";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ArticleCreateType } from "../../../extra/types/create/ArticleCreateType";

const ItemCard: React.FC<ArticleCreateType> = (
  article: ArticleCreateType
): JSX.Element => {
  const [pic, setPic] = useState<string>();

  const axios = Axios();
  const navigate = useNavigate();
  // "/uploads/" + article.pictures[0].src.split("/").pop()
  // useEffect(() => {
  //   console.log(article);
  //   setPic("/uploads/" + article.pictures[0].src.split("/").pop());
  // }, [article]);
  const onDeleteHandle = () => {
    axios
      .get(url + "/api/article/delete/" + article.id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {article ? (
        <tr className="item-card-box">
          <td>
            <img src="close500.png" alt="" className="item-card-img" />
          </td>
          <td className="item-card-category">{article.category}</td>
          <td className="item-card-brand">{article.brand}</td>
          <td className="item-card-seller-article">{article.sellerArticle}</td>
          <td className="item-card-color">
            {article.color ? article.color.name : ""}
          </td>
          <td className="item-card-size">
            {article.inventory[0].inventorySize
              ? article.inventory[0].inventorySize.size
              : ""}
          </td>
          <td className="item-card-id">{article.id}</td>
          <td
            className="edit-box"
            onClick={() => navigate("/update/" + article.product_id)}
          >
            <div>
              <MdModeEditOutline className="item-icon" />
            </div>
          </td>
          <td className="delete-box">
            <div onClick={onDeleteHandle}>
              <AiOutlineDelete className="item-icon" style={{ color: "red" }} />
            </div>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

export default ItemCard;
