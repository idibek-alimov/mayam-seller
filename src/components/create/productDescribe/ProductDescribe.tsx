import React, { useState, useEffect } from "react";
import "./ProductDescribe.css";
import counterSlice from "../../../store/features/counter/counterSlice";
import Axios, { url } from "../../../extra/axios";
import FancyInput from "./FancyInput";
import { Dimentions } from "./Dimentions";

export interface ProductDescribeProp {
  name: string;
  description: string;
}

interface DimensionsProp {
  length: number;
  width: number;
  height: number;
}
export const emptyCategoryBD: CategoryBDProp = {
  category: "",
  brand: [],
  dimensions: { length: 0, width: 0, height: 0 },
};

export interface CategoryBDProp {
  category: string;
  brand: string[];
  dimensions: DimensionsProp;
}

type stateProp = {
  product: ProductDescribeProp;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  categoryBD: CategoryBDProp;
  setCategoryBD: React.Dispatch<React.SetStateAction<any>>;
};

const ProductDescribe = ({
  product,
  setProduct,
  categoryBD,
  setCategoryBD,
}: stateProp) => {
  const axios = Axios();

  const onChangeHandle = (event: React.FormEvent<HTMLInputElement>) => {
    //let currentProduct = product;
    if (String(event.currentTarget.name) === "name") {
      setProduct({ ...product, name: event.currentTarget.value });
    } else {
      setProduct({ ...product, description: event.currentTarget.value });
    }
    console.log(product);
  };

  function funcCategory(name: string | string[]) {
    //console.log("name in the outside component is ", name);
    if (typeof name === "string") {
      setCategoryBD({ ...categoryBD, category: name });
    }
  }
  function funcBrand(name: string | string[]) {
    //console.log("name in the outside component is ", name);
    if (Array.isArray(name)) {
      setCategoryBD({ ...categoryBD, brand: name });
    }
  }

  return (
    <div className="product-describe-div">
      {/* <FancyInput
        data={categoryBD.category}
        func={func}
        linkForAxios="/api/category/name/similar/"
      /> */}

      <div className="category-box">
        <span>Category🔥</span>
        <div className="category-input-box">
          <FancyInput
            data={categoryBD.category}
            func={funcCategory}
            linkForAxios="/api/category/name/similar/"
          />
        </div>
      </div>
      <div className="category-box">
        <span>Dinesionts🔥</span>
        <div className="category-input-box">
          <Dimentions categoryBD={categoryBD} setCategoryBD={setCategoryBD} />
        </div>
      </div>
      <div className="category-box">
        <span>Brands🔥</span>
        <div className="category-input-box">
          <FancyInput
            data={categoryBD.brand}
            func={funcBrand}
            linkForAxios="/api/category/name/similar/"
          />
        </div>
      </div>

      <div>
        <span>Name🔥</span>
        <input name="name" value={product?.name} onChange={onChangeHandle} />
      </div>
      <div>
        <span>Description🔥</span>
        <input
          name="description"
          value={product?.description}
          onChange={onChangeHandle}
        />
      </div>
    </div>
  );
};

export default ProductDescribe;
