import React, { useEffect, useRef, useState } from "react";
// import Axios, { url } from "../../../extra/axios";
import "./BrandOrTag.css";
import { ObjectWithName } from "../../../../../extra/types/ObjectWithName";
import { useOnClickOutside } from "usehooks-ts";
import { useGlobalContext } from "../CreateContext";
import { ProductActionsKind } from "../createDispatch";

function Tag() {
  //const [chosenItems, setChosenItems] = useState<string[]>([]);
  const { product, productDispatch } = useGlobalContext();
  const [listOfObjects, setListOfObjects] = useState<ObjectWithName[]>([]);
  // const ref = useRef<HTMLInputElement>(null);
  // const menuRef = useRef<HTMLDivElement>(null);

  // useOnClickOutside(menuRef, function () {
  //   if (listOfObjects.length != 0) {
  //     setListOfObjects([]);
  //   }
  //   if (ref.current != null) {
  //     ref.current.value = "";
  //   }
  // });

  const onKeyDownHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //func([...data, event.currentTarget.value.trimLeft().trimRight()]);
      productDispatch({
        type: ProductActionsKind.ADD_TAGS,
        payload: [
          ...product.tags,
          event.currentTarget.value.trimLeft().trimRight(),
        ],
      });
      event.preventDefault();
      event.currentTarget.value = "";
    }
  };
  return (
    <div
      className="brand-div"
      // onClick={() => {
      //   if (ref.current != null) {
      //     ref.current.focus();
      //   }
      // }}
    >
      <div className="brand-box">
        {product.tags && product.tags.length != 0
          ? product.tags.map((item, index) => {
              return (
                <div className="chosen-item-box " key={index}>
                  <label className="item-name">{item}</label>
                  <img
                    src={"close500.png"}
                    alt="x"
                    className="delete-img"
                    onClick={() => {
                      const index = product.tags.indexOf(item);
                      let placeholder = product.tags;
                      if (index !== -1) {
                        placeholder.splice(index, 1);
                      }
                      productDispatch({
                        type: ProductActionsKind.ADD_TAGS,
                        payload: placeholder,
                      });
                    }}
                  />
                </div>
              );
            })
          : ""}
        <input
          // ref={ref}
          onKeyDown={onKeyDownHandle}
          onSubmit={(event) => event.preventDefault()}
        />
      </div>
    </div>
  );
}

export default Tag;
