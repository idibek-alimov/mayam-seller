import React, { useState } from "react";

import "./ColorAndSize.css";
import ColorBox from "./colorBox/ColorBox";

import InventoryInput from "./inventoryInput/InventoryInput";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import SimpleInput from "../input/SimpleInput";
import { ArticleIndexContext, useGlobalContext } from "../UpdateContext";
import ColorChooseList from "./colorChooseList/ColorChooseList";
import {
  ArticleActionsKind,
  OldPicsActionsKind,
  PictureActionsKind,
} from "../updateDispatch";

interface AddPicturesProp {
  width: string | number;
  height: string | number;
  pixels?: boolean;
}

function ColorAndSize() {
  const {
    articles,
    articleDispatch,
    pictures,
    picturesDispatch,
    oldPics,
    oldPicsDispatch,
  } = useGlobalContext();
  const [articleIndex, setArticleIndex] = useState<number>(0);
  console.log("old pics size   ", oldPics.length);
  const onAddPictures = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      for (let i = 0; i < event.currentTarget.files?.length; i++) {
        picturesDispatch({
          type: PictureActionsKind.ADD_PICTURE,
          payload: {
            articleIndex: articleIndex,
            picture: event.currentTarget.files[i],
          },
        });
      }
      console.log(pictures);
    }
  };

  const AddPictures = ({ width, height, pixels }: AddPicturesProp) => {
    if (pixels && pixels) {
      width = Number(width);
    }
    return (
      <label
        className="pictures-label"
        onChange={(event: React.FormEvent<HTMLLabelElement>) => {
          console.log("label", event);
        }}
        htmlFor={String(articleIndex)}
        style={
          pixels
            ? { width: Number(width), height: Number(height) }
            : { width: width, height: height }
        }
      >
        <input
          name=""
          type="file"
          id={String(articleIndex)}
          onChange={onAddPictures}
          hidden
          multiple={true}
        />
        <div
          className="pictures-plus-icon"
          style={
            pixels
              ? { width: Number(width), height: Number(height) }
              : { width: width, height: height }
          }
        >
          <div className="plus-icon-div">
            <AiOutlinePlus className="plus-icon" />
            <div className="pictures-add-description">
              <span className="pictures-highlight-text">Выберите фото</span>
              <span className="pictures-ordinary-text gray-name">
                Добавьте до 30 фото болше не надо добавитть
              </span>
            </div>
          </div>
        </div>
      </label>
    );
  };

  return (
    <ArticleIndexContext.Provider value={{ articleIndex, setArticleIndex }}>
      <div className="color-and-size-div">
        <button
          className="add-color-button"
          onClick={(event) => {
            event.preventDefault();

            articleDispatch({
              type: ArticleActionsKind.ADD_EMPTY_ARTICLE,
              payload: articles.length + 1,
            });
            picturesDispatch({
              type: PictureActionsKind.ADD_EMPTY_PICTURES,
              payload: articleIndex,
            });
          }}
        >
          <AiOutlinePlus />
          <span>Add color</span>
        </button>
        <div className="color-box-wrapper">
          {articles
            ? articles.map((article, index) => {
                return (
                  <div
                    onClick={() => {
                      console.log("setting article index to " + index);
                      setArticleIndex(index);
                    }}
                  >
                    <ColorBox index={index} />
                  </div>
                );
              })
            : ""}
        </div>
        <div className="category-box" style={{ marginTop: 20 }}>
          <span className="gray-name">Seller article</span>
          <SimpleInput
            text={
              articles[articleIndex] && articles[articleIndex].sellerArticle
                ? articles[articleIndex].sellerArticle
                : ""
            }
            func={function (text: string) {
              articleDispatch({
                type: ArticleActionsKind.ADD_SELLER_ARTICLE,
                payload: { index: articleIndex, value: text },
              });
            }}
            disabled={true}
          />
        </div>
        <div className="category-box" style={{ marginTop: 20 }}>
          <span className="gray-name">Color</span>
          <ColorChooseList articleIndex={articleIndex} />
        </div>

        <div
          className="category-box"
          style={{ marginTop: 20, alignItems: "flex-start" }}
        >
          <span className="gray-name" style={{ marginTop: 10 }}>
            Inventories
          </span>
          <div style={{ width: "80%" }}>
            {articles && articles[articleIndex]
              ? articles[articleIndex].inventory.map((inventory, index) => {
                  return (
                    <InventoryInput
                      articleIndex={articleIndex}
                      inventoryIndex={index}
                    />
                  );
                })
              : ""}
            <div className="add-size-box">
              <div
                onClick={() => {
                  articleDispatch({
                    type: ArticleActionsKind.ADD_EMPTY_INVENTORY,
                    payload: articleIndex,
                  });
                }}
              >
                <AiOutlinePlus className="add-size-icon" />
                <span className="add-size-text">Add Size</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pictures-div">
          <span className="pictures-text">
            Pictures for color {articleIndex + 1}
          </span>
          <div className="pictures-box-big">
            {(pictures[articleIndex] && pictures[articleIndex].length != 0) ||
            (oldPics[articleIndex] && oldPics[articleIndex].length != 0) ? (
              <div className="pictures-box">
                {oldPics[articleIndex].map((pic, index) => {
                  return (
                    <div key={index} className="picture-wrapper">
                      <img src={"./uploads/close50.png"} alt={""} />
                      <AiOutlineDelete
                        className="pic-delete-icon"
                        width={200}
                        onClick={() => {
                          oldPicsDispatch({
                            type: OldPicsActionsKind.REMOVE_PICTURE,
                            payload: {
                              articleIndex: articleIndex,
                              pictureIndex: index,
                            },
                          });
                        }}
                      />
                    </div>
                  );
                })}
                {pictures[articleIndex].map((pic, index) => {
                  return (
                    <div key={index} className="picture-wrapper">
                      <img src={URL.createObjectURL(pic)} alt="nopic" />
                      <AiOutlineDelete
                        className="pic-delete-icon"
                        width={200}
                        onClick={() => {
                          picturesDispatch({
                            type: PictureActionsKind.REMOVE_PICTURE,
                            payload: {
                              articleIndex: articleIndex,
                              pictureIndex: index,
                            },
                          });
                        }}
                      />
                    </div>
                  );
                })}
                <div className="picture-wrapper">
                  <AddPictures width={200} height={240} />
                </div>
              </div>
            ) : (
              <AddPictures width="100%" height={300} />
            )}
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "left" }}>
          <h3>Discount {"(optional,in %)"}</h3>
          <div style={{ width: "100%" }}>
            <SimpleInput
              text={
                articles[articleIndex].discounts &&
                articles[articleIndex].discounts[
                  articles[articleIndex].discounts.length - 1
                ] &&
                articles[articleIndex].discounts[
                  articles[articleIndex].discounts.length - 1
                ].percentage != 0
                  ? articles[articleIndex].discounts[
                      articles[articleIndex].discounts.length - 1
                    ].percentage
                  : ""
              }
              textType="number"
              func={(text) => {
                articleDispatch({
                  type: ArticleActionsKind.ADD_DISCOUNT,
                  payload: { index: articleIndex, percentage: text },
                });
                console.log(articles[articleIndex]);
              }}
            />
          </div>
        </div>
      </div>
    </ArticleIndexContext.Provider>
  );
}

export default ColorAndSize;
