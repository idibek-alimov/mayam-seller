import React, { useState, useEffect } from "react";
import "./ProductPics.css";
import { AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { ArticleCreateProp } from "../ArticleCreate";

type PicsProp = {
  pics: File[][];
  articleIndex: number;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const ProductPics = ({ articleIndex, pics, setState }: PicsProp) => {
  //  console.log("article index in func", articleIndex);
  let IndexOfArticle = articleIndex;
  // useEffect(() => {
  //   console.log("useEffect index", articleIndex);
  //   setIndexOfArticle(articleIndex);
  // }, []);
  // const [IndexOfArticle, setIndexOfArticle] = useState<number>(articleIndex);
  // const [picsUrl,setPicsUrl] = useState<URL[]|string[]>([]);
  const [picsUrl, setPics] = useState<File[]>([]);

  const onInputChangeHandle = (
    event: React.FormEvent<HTMLInputElement>,
    IndexOfArticle: number
  ) => {
    console.log("before condition article index", IndexOfArticle);
    if (event.currentTarget.files) {
      let piclist = [];
      for (let i = 0; i < event.currentTarget.files?.length; i++) {
        piclist.push(event.currentTarget.files[i]);
      }
      console.log("current index", IndexOfArticle);

      let newpics = [...pics[IndexOfArticle], ...piclist];
      console.log(newpics);
      let articlesData = pics;
      articlesData[IndexOfArticle] = newpics;
      setPics(newpics);
      setState(articlesData);
    }
  };

  const onRemovePicHandle = (pic: File) => {
    // console.log(pic);
    // let piclist: File[] = pics;
    // piclist = piclist.filter((item) => pic.name !== item.name);
    // console.log(piclist);
    // setPics(piclist);

    let articlePics: File[] = pics[IndexOfArticle];
    let articleData = pics;
    articlePics = articlePics.filter((item) => pic.name !== item.name);
    articleData[IndexOfArticle] = articlePics;
    setPics(articlePics);
    setState(articleData);
  };
  return (
    <div className="pics-div">
      <div className="pics-input-box">
        <label
          className="pics-input-label"
          onChange={(event: React.FormEvent<HTMLLabelElement>) => {
            //event.target;
          }}
          htmlFor={String(IndexOfArticle)}
        >
          <input
            name=""
            type="file"
            id={String(IndexOfArticle)}
            onChange={(event) => {
              onInputChangeHandle(event, IndexOfArticle);
              console.log("div ", IndexOfArticle);
            }}
            //   onChange={(event) => {
            //     let piclist = [];

            //     if (event.target.files) {
            //       for (let i = 0; i < event.target.files?.length; i++) {
            //         piclist.push(event.target.files[i]);
            //       }
            //       let articlePics: File[] = articles[articleIndex]["pics"];
            //       let articleData = articles;
            //       //articlePics = articlePics.filter((item) => pic.name !== item.name);
            //       articlePics = [...articlePics, ...piclist];
            //       articleData[articleIndex]["pics"] = articlePics;
            //       setState(articleData);
            //       //setPics([...pics, ...piclist]);
            //     }
            //   }
            // }
            hidden
            multiple={true}
          />
          <AiOutlinePlus />
        </label>
      </div>
      <div className="pics-show-div">
        {/* {articles[articleIndex]["pics"] ? (
          articles[articleIndex]["pics"].map((pic, index) => {
            return (
              <div className="pic-div" key={index}>
                <span
                  className="pic-delete-icon"
                  onClick={() => onRemovePicHandle(pic)}
                >
                  <TiDeleteOutline className="icon" />
                </span>
                <img src={URL.createObjectURL(pic)} alt="nopic" />
              </div>
            );
          })
        ) : (
          <div>nothing yet</div>
        )} */}
        {/* {picsUrl.map((pic, index) => {
          return (
            <div className="pic-div" key={index}>
              <span
                className="pic-delete-icon"
                onClick={() => onRemovePicHandle(pic)}
              >
                <TiDeleteOutline className="icon" />
              </span>
              <img src={URL.createObjectURL(pic)} alt="nopic" />
            </div>
          );
        })} */}
        {pics
          ? pics[articleIndex].map((pic, index) => {
              return (
                <div className="pic-div" key={index}>
                  <span
                    className="pic-delete-icon"
                    onClick={() => onRemovePicHandle(pic)}
                  >
                    <TiDeleteOutline className="icon" />
                  </span>
                  <img src={URL.createObjectURL(pic)} alt="nopic" />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default ProductPics;
