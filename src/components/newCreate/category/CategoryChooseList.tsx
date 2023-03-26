import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { Category } from "../../../extra/types/Category";
import Axios, { url } from "../../../extra/axios";
interface PropInput {
  chosenCategory: Category;
  func: (category: Category) => void;
  linktext?: string;
}

const InputWithChooseList = ({ chosenCategory, func, linktext }: PropInput) => {
  const [category, setCategory] = useState({ text: "", valid: false });
  const [data, setData] = useState<Category[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();

  const onChangeHandler = (text: string) => {
    setCategory({ text: text, valid: false });
    if (text === "") {
      axios
        .get(url + "/api/category/common/30")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(url + "/api/category/name/similar/" + text)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(url + "/api/category/common/30")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          value={category.text}
          onChange={(event) => {
            onChangeHandler(event.target.value);
            //func(event.target.value);
          }}
          onBlur={() => {
            if (category.valid == false) {
              setCategory({ text: "", valid: false });
            }
            setTimeout(() => {
              setShow(!show);
            }, 200);
          }}
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
                      setCategory({ text: item.name, valid: true });
                      func(item);
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
