import React, { useEffect, useRef, useState } from "react";
import Axios, { url } from "../../../extra/axios";
import { link } from "fs";

interface FancyProp {
  data: string | string[];
  func: (name: string | string[]) => void;
  linkForAxios?: string;
}
interface SingleCategoryProp {
  name: string;
}
function FancyInput({ data, func, linkForAxios }: FancyProp) {
  const [categories, setCategories] = useState<SingleCategoryProp[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const axios = Axios();
  //////////////////////////////
  interface Text {
    name: string;
  }
  const ItemHolder = ({ name }: Text) => {
    return (
      <div className="item-holder-box">
        <label className="item-name">{name}</label>
        <label
          className="delete-item"
          onClick={() => {
            if (typeof data === "string") {
              func("");
            } else {
              const index = data.indexOf(name);
              if (index !== -1) {
                data.splice(index, 1);
              }
              func(data);
            }
          }}
        >
          <img src={"close500.png"} alt="x" />
        </label>
      </div>
    );
  };
  /////////////////////////////
  const onChangeHandle = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    if (linkForAxios) {
      axios
        .get(url + linkForAxios + event.currentTarget.value)
        .then((res) => {
          console.log(res.data);
          setCategories(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const addNameHandler = (name: string) => {
    console.log(name, "clicked");
    console.log(typeof data === "string");
    if (typeof data === "string") {
      func(name);
      setCategories([]);
    } else if (Array.isArray(data) && !data.includes(name) && data.length < 5) {
      data.push(name);
      func(data);
    }
  };
  const onKeyDownHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNameHandler(event.currentTarget.value.trimLeft().trimRight());
      event.currentTarget.value = "";
    }
  };
  useEffect(() => {
    if (ref.current != null) ref.current.focus();
  }, [focus]);

  return (
    <div className="fancy-div">
      <div
        className="fancy-box"
        onClick={() => {
          if (ref.current != null) {
            ref.current.focus();
          }
        }}
      >
        {data && typeof data === "string" ? <ItemHolder name={data} /> : ""}
        {data && Array.isArray(data) && data.length != 0
          ? data.map((name) => <ItemHolder name={name} />)
          : ""}
        <input
          ref={ref}
          style={{
            width: ref.current ? ref.current.value.length + "ch" : "auto",
          }}
          className="fancy-input"
          onChange={onChangeHandle}
          onBlur={(event) => {
            setTimeout(() => setCategories([]), 3000);
            event.currentTarget.value = "";
          }}
          onKeyDown={onKeyDownHandle}
        />
        {/* </div> */}
      </div>
      <div className="fancy-item-div">
        <div className="fancy-item-list">
          {categories.length != 0
            ? categories.map((category) => {
                return (
                  <div
                    className="category-item"
                    onClick={() => addNameHandler(category.name)}
                  >
                    {category.name}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default FancyInput;
