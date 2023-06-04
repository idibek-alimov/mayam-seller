import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { Category } from "../../../../../extra/types/Category";
import Axios, { url } from "../../../../../extra/axios";
import { ObjectWithName } from "../../../../../extra/types/ObjectWithName";
import { useGlobalContext } from "../UpdateContext";
import { ProductActionsKind } from "../updateDispatch";

const CategoryChooseList = () => {
  const { product, productDispatch } = useGlobalContext();
  const [category, setCategory] = useState<Category>(product.category);
  const [data, setData] = useState<ObjectWithName[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();
  const onChangeHandler = (text: string) => {
    setCategory({ name: text });
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
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          value={category.name ? category.name : ""}
          disabled
          onChange={(event) => {
            //onChangeHandler(event.target.value);
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
          src={"up.png"}
          alt="up.png"
          onClick={() => setShow(!show)}
        />
      </div>
      {/* <div className="category-list-div">
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
                      if (item.name) setCategory(item);
                      productDispatch({
                        type: ProductActionsKind.ADD_CATEGORY,
                        payload: item,
                      });
                      setShow(!show);
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                );
              })
            : ""}
        </div>
      </div> */}
    </div>
  );
};

export default CategoryChooseList;
