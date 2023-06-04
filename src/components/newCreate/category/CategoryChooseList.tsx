import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { Category } from "../../../extra/types/Category";
import Axios, { url } from "../../../extra/axios";
import { ObjectWithName } from "../../../extra/types/ObjectWithName";
interface LinkProp {
  firstLink: string;
  secondLink: string;
}
interface PropInput {
  chosenCategory: string;
  func: (name: string) => void;
  linkText: LinkProp;
}

const InputWithChooseList = ({ chosenCategory, func, linkText }: PropInput) => {
  const [category, setCategory] = useState({
    text: chosenCategory ? chosenCategory : "",
  });
  const [data, setData] = useState<ObjectWithName[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();
  // let firstLink: string;
  // let secondLink: string;
  // useEffect(() => {
  //   if (linkText && linkText.firstLink && linkText.secondLink) {
  //     firstLink = linkText.firstLink;
  //     secondLink = linkText.secondLink;
  //   } else {
  //     firstLink = "/api/category/common/30";
  //     secondLink = "/api/category/name/similar/";
  //   }
  // }, []);

  const onChangeHandler = (text: string) => {
    setCategory({ text: text });
    if (text === "") {
      axios
        .get(url + linkText.firstLink)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(url + linkText.secondLink + text)
        .then((res) => {
          console.log(linkText.secondLink);
          console.log(url + linkText.secondLink + text);
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setCategory({
      text: chosenCategory,
    });
    axios
      .get(url + "/api/category/common/30")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    if (chosenCategory) {
    }
  }, []);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          defaultValue={chosenCategory}
          value={category && category.text ? category.text : ""}
          onChange={(event) => {
            onChangeHandler(event.target.value);
            //func(event.target.value);
          }}
          // onBlur={() => {
          //   if (category.valid == false) {
          //     setCategory({ text: "", valid: false });
          //   }
          //   setTimeout(() => {
          //     setShow(!show);
          //   }, 200);
          // }}
        />
        <img
          className={show ? "up-png" : "up-png up-png-rotated"}
          src="up.png"
          onClick={() => setShow(!show)}
        />
      </div>
      <div className="category-list-div">
        <div
          className="category-list-box"
          style={show ? { display: "flex" } : { display: "none" }}
        >
          {data.length != 0
            ? data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="category-item"
                    onClick={() => {
                      // alert("fuck you");
                      let placeholder;
                      if (item.name) setCategory({ text: item.name });
                      func(item.name);
                      setShow(!show);
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default InputWithChooseList;
