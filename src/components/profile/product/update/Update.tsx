import React, { Reducer, useEffect, useReducer, useState } from "react";
import {
  ProductCreateType,
  emptyProductCreate,
} from "../../../../extra/types/create/ProductCreateType";
import {
  ArticleCreateType,
  emptyArticleType,
} from "../../../../extra/types/create/ArticleCreateType";
import {
  productReducer,
  ProductActionType,
  ProductActionsKind,
  articleReducer,
  pictureReducer,
  oldPicsReducer,
} from "./updateDispatch";
import { MyGlobalContext, useWrapperContext } from "./UpdateContext";
import CategoryChooseList from "./category/CategoryChooseList";
import DimensionsComponent from "./dimension/Dimensions";
import SimpleInput from "./input/SimpleInput";
import GenderChooseList from "./gender/GenderChooseList";
import Tag from "./tag/Tag";
import ColorAndSize from "./colorAndSize/ColorAndSize";
import { ProductToForm } from "../../../../extra/helperfunction/ProductInfoToForm";
import Axios, { url } from "../../../../extra/axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const { wArticles, wProduct, wOldPics } = useWrapperContext();
  const [product, productDispatch] = useReducer(productReducer, {
    ...wProduct,
  });
  const [articles, articleDispatch] = useReducer(articleReducer, [
    ...wArticles,
    // ...[{ ...emptyArticleType }],
  ]);
  let emptyPictures: File[][] = [];
  articles.forEach(() => {
    emptyPictures.push([]);
  });
  const [oldPics, oldPicsDispatch] = useReducer(oldPicsReducer, [...wOldPics]);
  const [pictures, picturesDispatch] = useReducer(
    pictureReducer,
    emptyPictures
  );

  const axios = Axios();
  const navigate = useNavigate();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("product ->", product);
    axios
      .post(
        url + `/api/product/update/${product.id}`,
        ProductToForm({
          product: product,
        })
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    for (let i = 0; i < articles.length; i++) {
      axios
        .post(
          url +
            `/api/article/update/${
              pictures[i].length === 0
                ? "picture/none/" + articles[i].id
                : articles[i].id
            }`,
          ProductToForm({
            article: articles[i],
            oldPics: oldPics[i],
            pictures: pictures[i],
          })
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    navigate("/");
  };

  return (
    <MyGlobalContext.Provider
      value={{
        product,
        productDispatch,
        articles,
        articleDispatch,
        pictures,
        picturesDispatch,
        oldPics,
        oldPicsDispatch,
      }}
    >
      {product && articles && oldPics ? (
        <div className="new-create-div">
          <form
            style={{ width: "100%" }}
            className="new-create-div"
            onSubmit={onFormSubmit}
          >
            <div className="new-create-box">
              <span className="information-text">
                Information about the product
              </span>

              <div className="category-box">
                <span className="gray-name">Category</span>
                <CategoryChooseList />
              </div>
              <div className="category-box">
                <span className="gray-name">Dimensions</span>
                <DimensionsComponent />
              </div>
              <div className="category-box" style={{ marginTop: 20 }}>
                <span className="gray-name">Name</span>
                <SimpleInput
                  text={product.name}
                  func={function (text: string) {
                    productDispatch({
                      type: ProductActionsKind.ADD_NAME,
                      payload: text,
                    });
                  }}
                />
              </div>

              <div className="category-box" style={{ marginTop: 20 }}>
                <span className="gray-name">Brand</span>
                <SimpleInput
                  text={product.brand}
                  func={function (text: string) {
                    productDispatch({
                      type: ProductActionsKind.ADD_BRAND,
                      payload: text,
                    });
                  }}
                />
              </div>

              <div className="category-box" style={{ marginTop: 20 }}>
                <span className="gray-name">Gender</span>
                <GenderChooseList />
              </div>

              <div className="category-box" style={{ marginTop: 20 }}>
                <span className="gray-name">Tags</span>
                <Tag />
              </div>
            </div>
            <div className="new-create-box">
              <span className="information-text">Description</span>
              <div className="category-box" style={{ marginTop: 20 }}>
                <SimpleInput
                  text={product.description}
                  func={function (text: string) {
                    productDispatch({
                      type: ProductActionsKind.ADD_DESCRIPTION,
                      payload: text,
                    });
                  }}
                  textArea={true}
                />
              </div>
            </div>

            <div className="new-create-box">
              <span className="information-text">Description</span>
              <div className="category-box" style={{ marginTop: 20 }}>
                <ColorAndSize />
              </div>
            </div>
            <div className="new-create-box">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </MyGlobalContext.Provider>
  );
};

export default Update;
