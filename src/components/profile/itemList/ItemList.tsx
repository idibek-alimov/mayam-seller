import React, { useState, useEffect } from "react";
import "./ItemList.css";
import axios from "axios";
import { useAppSelector } from "../../../store/hooks";
import { Article } from "../../../extra/types/Article";
import ItemCard from "../itemCard/ItemCard";
import { url } from "../../../extra/axios";
const ItemList = () => {
  const [myArticles, setMyArticles] = useState<Article[]>();
  const access_token = useAppSelector((state) => state.token.access_token);

  let custom_headers = access_token
    ? { Authorization: String("Bearer " + access_token) }
    : { Authorization: String("") };

  const axioss = axios.create({
    headers: custom_headers,
    baseURL: "http://localhost:8080/api/product",
  });
  useEffect(() => {
    axioss
      .get(url + "/api/article/byuser")
      .then((res) => {
        console.log(res.data);
        setMyArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {myArticles
        ? myArticles.map((article, index) => {
            return (
              <div>
                <ItemCard {...article} />
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ItemList;
