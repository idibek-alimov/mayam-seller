import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { Category } from "../../../extra/types/Category";
import Axios, { url } from "../../../extra/axios";
interface PropInput {
  text: string;
  func: (text: string) => void;
  linktext?: string;
}

const InputWithChooseList = ({ text, func, linktext }: PropInput) => {
  const [data, setData] = useState<Category[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();

  const onChangeHandler = (text: string) => {
    if (text === "") {
      axios
        .get(url + "/api/category/common/30")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(url + "/api/category/name/similar/" + text)
        .then((res) => setData(res.data))
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
          value={text}
          onChange={(event) => {
            onChangeHandler(event.target.value);
            func(event.target.value);
          }}
          onBlur={() =>
            setTimeout(() => {
              setShow(!show);
            }, 200)
          }
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
            ? data.map((item) => {
                return (
                  <div
                    className="category-item"
                    onClick={() => {
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
