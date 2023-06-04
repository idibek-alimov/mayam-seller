import React, { useState, useEffect } from "react";
import Axios, { url } from "../../../../extra/axios";
import { useParams } from "react-router-dom";
import {
  ProductCreateType,
  emptyProductCreate,
} from "../../../../extra/types/create/ProductCreateType";
import {
  ArticleCreateType,
  emptyArticleType,
} from "../../../../extra/types/create/ArticleCreateType";
import { Picture } from "../../../../extra/types/Picture";
import { WrapperContext } from "./UpdateContext";
import Update from "./Update";

const UpdateWrapper = () => {
  const [wProduct, setProduct] = useState<ProductCreateType>();
  const [wArticles, setArticles] = useState<ArticleCreateType[]>();
  const [wOldPics, setOldPics] = useState<number[][]>([[]]);

  const axios = Axios();
  let { id } = useParams();
  useEffect(() => {
    console.log(id);
    axios
      .get(url + "/api/product/" + id)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        console.log("articles", res.data.articles);
        setArticles(res.data.articles);
        let oldPicsPlaceholder: number[][] = [[]];
        res.data.articles.map((article: ArticleCreateType, index: number) => {
          if (article.pictures) {
            if (index != 0) {
              oldPicsPlaceholder.push([]);
            }
            article.pictures.map((picture: Picture, innerIndex: number) => {
              oldPicsPlaceholder[index].push(picture.id);
            });
          }
        });
        setOldPics(oldPicsPlaceholder);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {wProduct && wArticles && wOldPics ? (
        <WrapperContext.Provider value={{ wProduct, wArticles, wOldPics }}>
          <div>
            <Update />
          </div>
        </WrapperContext.Provider>
      ) : (
        <div>sd</div>
      )}
    </div>
  );
};

export default UpdateWrapper;
