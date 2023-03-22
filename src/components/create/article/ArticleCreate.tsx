import React, { useState, useEffect } from "react";
import ProductInventory from "./productinventory/ProductInventory";
import "./ArticleCreate.css";
import ProductPics from "./productpics/ProductPics";
import Color from "./productcolor/Color";
import { Color as ColorType } from "../../../extra/types/Color";
import { Inventory } from "../../../extra/types/Inventory";
export interface InventoryProp {
  product_size: string;
  quantity: number | undefined;
  price: number;
}

export interface ArticleCreateProp {
  inventories: InventoryProp[];
  color: ColorType;
  // pics: File[];
}
export interface ArticleListProp {
  articles: ArticleCreateProp[];
}

type stateProp = {
  articles: ArticleCreateProp[];
  setArticles: React.Dispatch<React.SetStateAction<any>>;
  pics: File[][];
  setPics: React.Dispatch<React.SetStateAction<any>>;
};

const ArticleCreate = ({ articles, setArticles, pics, setPics }: stateProp) => {
  // const emptyArticle: ArticleCreateProp = {
  //   inventories: [{ size: "", amount: 1 }],
  //   color: { name: "" },
  //   pics: [],
  // };
  // const [articles, setArticles] = useState<ArticleCreateProp[]>([emptyArticle]);

  const addField = () => {
    const emptyArticle: ArticleCreateProp = {
      inventories: [{ product_size: "", quantity: 1, price: 1 }],
      color: { name: "" },
      // pics: [],
    };
    setPics([...pics, []]);
    setArticles([...articles, emptyArticle]);
    console.log(articles);
    console.log("this is empty Article", emptyArticle);
  };
  const onRemoveColorHandle = (index: number) => {
    let articleData: ArticleCreateProp[] = [...articles];
    articleData.splice(index, 1);
    let picData: File[][] = [...pics];
    picData.splice(index, 1);
    setArticles(articleData);
    setPics(picData);
  };
  useEffect(() => {
    setArticles(articles);
    setPics(pics);
  }, [onRemoveColorHandle, articles, pics]);

  return (
    <div className="article-create-wrapper">
      {articles && pics
        ? articles.map((article, articleIndex) => {
            return (
              <div className="article-create-div" key={articleIndex}>
                <Color
                  articleIndex={articleIndex}
                  setState={setArticles}
                  articles={articles}
                />
                <ProductInventory
                  articleIndex={articleIndex}
                  setState={setArticles}
                  articles={articles}
                />
                <ProductPics
                  articleIndex={articleIndex}
                  setState={setPics}
                  pics={pics}
                />
                {articleIndex != 0 ? (
                  <button
                    className="remove-color"
                    onClick={() => onRemoveColorHandle(articleIndex)}
                  >
                    Remove the chit out of it
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })
        : ""}
      {/* // <div className="article-create-div">
      //   <Color />
      //   <ProductInventory />
      //   <ProductPics />
      // </div> */}
      <div className="add-color-button-div">
        <button onClick={addField} className="add-color-button">
          add color
        </button>
      </div>
    </div>
  );
};

export default ArticleCreate;
