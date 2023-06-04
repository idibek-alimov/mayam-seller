import React from "react";
import "./Dimensions.css";
import { Dimensions } from "../../../../../extra/types/Dimensions";
import { useGlobalContext } from "../UpdateContext";
import { ProductActionsKind } from "../updateDispatch";

function DimensionsComponent() {
  const { product, productDispatch } = useGlobalContext();

  return (
    <div className="dimensions-div">
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Length(in cm)</label>
        <input
          type="number"
          name="length"
          className="dimension-input"
          value={
            product.dimensions && product.dimensions.length
              ? product.dimensions.length
              : ""
          }
          onChange={(event) =>
            productDispatch({
              type: ProductActionsKind.ADD_LENGTH,
              payload: Number(event.currentTarget.value),
            })
          }
        />
      </div>
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Width(in cm)</label>
        <input
          type="number"
          name="width"
          className="dimension-input"
          value={
            product.dimensions && product.dimensions.width
              ? product.dimensions.width
              : ""
          }
          onChange={(event) =>
            productDispatch({
              type: ProductActionsKind.ADD_WIDTH,
              payload: Number(event.currentTarget.value),
            })
          }
        />
      </div>
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Height(in cm)</label>
        <input
          type="number"
          name="height"
          className="dimension-input"
          value={
            product.dimensions && product.dimensions.height
              ? product.dimensions.height
              : ""
          }
          onChange={(event) =>
            productDispatch({
              type: ProductActionsKind.ADD_HEIGHT,
              payload: Number(event.currentTarget.value),
            })
          }
        />
      </div>
    </div>
  );
}

export default DimensionsComponent;
