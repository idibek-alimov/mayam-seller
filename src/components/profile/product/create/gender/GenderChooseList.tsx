import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { Category } from "../../../../../extra/types/Category";
import Axios, { url } from "../../../../../extra/axios";
import { ObjectWithName } from "../../../../../extra/types/ObjectWithName";
import { useGlobalContext } from "../CreateContext";
import { ProductActionsKind } from "../createDispatch";

const GenderChooseList = () => {
  const { product, productDispatch } = useGlobalContext();

  const [show, setShow] = useState<Boolean>(false);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          value={
            product.productGender && product.productGender.name
              ? product.productGender.name
              : ""
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
          {["male", "female", "None"].map((item, index) => {
            return (
              <div
                key={index}
                className="category-item"
                onClick={() => {
                  productDispatch({
                    type: ProductActionsKind.ADD_GENDER,
                    payload: item,
                  });
                  setShow(!show);
                }}
              >
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenderChooseList;
