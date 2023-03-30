import React, { useEffect, useRef, useState } from "react";
import Axios, { url } from "../../../extra/axios";
import "./BrandOrTag.css";
import { ObjectWithName } from "../../../extra/types/ObjectWithName";
import { useOnClickOutside } from "usehooks-ts";

interface FancyProp {
  data: string[];
  func: (name: string[]) => void;
  linkForAxios?: string;
  limit?: number;
}
interface SingleCategoryProp {
  name: string;
}

function BrandOrTag({ data, func, linkForAxios, limit }: FancyProp) {
  //const [chosenItems, setChosenItems] = useState<string[]>([]);
  const [listOfObjects, setListOfObjects] = useState<ObjectWithName[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const axios = Axios();

  useOnClickOutside(menuRef, function () {
    if (listOfObjects.length != 0) {
      setListOfObjects([]);
    }
    if (ref.current != null) {
      ref.current.value = "";
    }
  });

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (linkForAxios && event.currentTarget.value != "") {
      axios
        .get(url + linkForAxios + event.currentTarget.value)
        .then((res) => {
          setListOfObjects(res.data);
        })
        .catch((err) => console.log);
    }
  };

  const onKeyDownHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      func([...data, event.currentTarget.value.trimLeft().trimRight()]);
      event.preventDefault();
      event.currentTarget.value = "";
    }
  };

  const ListOfItems = () => {
    return (
      <div className="list-of-items-div" ref={menuRef}>
        <div className="list-of-items-box">
          {listOfObjects.length != 0
            ? listOfObjects.map((item) => {
                return (
                  <div
                    className="list-box-item"
                    onClick={() => {
                      if (!data.includes(item.name)) func([...data, item.name]);
                      if (ref.current != null) {
                        ref.current.value = "";
                        ref.current?.focus();
                      }
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  };

  return (
    <div
      className="brand-div"
      onClick={() => {
        if (ref.current != null) {
          ref.current.focus();
        }
      }}
    >
      <div className="brand-box">
        {data && data.length != 0
          ? data.map((item, index) => {
              return (
                <div className="chosen-item-box " key={index}>
                  <label className="item-name">{item}</label>
                  <img
                    src={"close500.png"}
                    alt="x"
                    className="delete-img"
                    onClick={() => {
                      const index = data.indexOf(item);
                      if (index !== -1) {
                        data.splice(index, 1);
                      }
                      func(data);
                    }}
                  />
                </div>
              );
            })
          : ""}
        <input
          onChange={onInputChange}
          ref={ref}
          onKeyDown={onKeyDownHandle}
          onSubmit={(event) => event.preventDefault()}
        />
      </div>
      <ListOfItems />
    </div>
  );
}

export default BrandOrTag;
