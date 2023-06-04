import React, { Reducer, useReducer, useState } from "react";
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
} from "./createDispatch";
import { MyGlobalContext } from "./CreateContext";
import CategoryChooseList from "./category/CategoryChooseList";
import DimensionsComponent from "./dimension/Dimensions";
import SimpleInput from "./input/SimpleInput";
import GenderChooseList from "./gender/GenderChooseList";
import Tag from "./tag/Tag";
import ColorAndSize from "./colorAndSize/ColorAndSize";
import { ProductToForm } from "../../../../extra/helperfunction/ProductInfoToForm";
import Axios, { url } from "../../../../extra/axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [product, productDispatch] = useReducer(productReducer, {
    ...emptyProductCreate,
  });
  const [articles, articleDispatch] = useReducer(articleReducer, [
    ...[{ ...emptyArticleType }],
  ]);
  const [pictures, picturesDispatch] = useReducer(pictureReducer, [[]]);

  const axios = Axios();
  const navigate = useNavigate();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(pictures);
    axios
      .post(
        url + "/api/product/create/new",
        ProductToForm({
          product: product,
        })
      )
      .then((res) => {
        for (let i = 0; i < articles.length; i++) {
          console.log(pictures[i].length != 0);
          axios
            .post(
              url +
                `/api/product/article/add/${
                  pictures[i].length === 0
                    ? "picture/none/" + res.data.id
                    : res.data.id
                }`,
              ProductToForm({
                article: articles[i],
                pictures: pictures[i],
              })
            )
            .then((response) => console.log(res))
            .catch((err) => console.log(err));
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (product.category.name === "") {
    return (
      <MyGlobalContext.Provider
        value={{
          product,
          productDispatch,
          articles,
          articleDispatch,
          pictures,
          picturesDispatch,
        }}
      >
        <div className="new-create-div">
          <div className="new-create-box">
            <span className="information-text">
              Information about the product
            </span>

            <div className="category-box">
              <span>Category</span>
              <CategoryChooseList />
            </div>
          </div>
        </div>
      </MyGlobalContext.Provider>
    );
  } else {
    return (
      <MyGlobalContext.Provider
        value={{
          product,
          productDispatch,
          articles,
          articleDispatch,
          pictures,
          picturesDispatch,
        }}
      >
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
              <button type="submit">Create product</button>
            </div>
          </form>
        </div>
      </MyGlobalContext.Provider>
    );
  }
};

export default Create;
