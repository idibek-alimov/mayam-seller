import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import Axios, { url } from "../../../../../../extra/axios";
import { ObjectWithName } from "../../../../../../extra/types/ObjectWithName";
import { useGlobalContext } from "../../CreateContext";
import { ArticleActionsKind } from "../../createDispatch";

interface ColorChooseListProp {
  articleIndex: number;
}

const ColorChooseList = ({ articleIndex }: ColorChooseListProp) => {
  const { articles, articleDispatch } = useGlobalContext();
  const [color, setColor] = useState<ObjectWithName>();
  const [data, setData] = useState<ObjectWithName[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();
  const onChangeHandler = (text: string) => {
    setColor({ name: text });
    if (text === "") {
      // axios
      //   .get(url + "/api/category/common/30")
      //   .then((res) => setData(res.data))
      //   .catch((err) => console.log(err));
    } else {
      axios
        .get(url + "/api/color/name/similar/" + text)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (articles[articleIndex] && articles[articleIndex].color != null) {
      setColor(articles[articleIndex].color);
    }
    // axios
    //   .get(url + "/api/category/common/30")
    //   .then((res) => {
    //     console.log(res.data);
    //     setData(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, [articleIndex]);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          value={color?.name}
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
                      if (item.name) setColor(item);
                      alert(item.id);
                      articleDispatch({
                        type: ArticleActionsKind.ADD_COLOR,
                        payload: {
                          index: articleIndex,
                          value: item.name,
                          id: item.id,
                        },
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
      </div>
    </div>
  );
};

export default ColorChooseList;
