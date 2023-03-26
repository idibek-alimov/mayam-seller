import React from "react";
import { Dimensions } from "../../../extra/types/Dimensions";
import "./Dimensions.css";
interface PropInput {
  dimensions: Dimensions;
  func: (dimensions: Dimensions) => void;
  linktext?: string;
}

function DimensionsComponent({ dimensions, func }: PropInput) {
  const onChangeHandle = (event: React.FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "length":
        func({ ...dimensions, length: Number(event.currentTarget.value) });
        break;
      case "width":
        func({ ...dimensions, width: Number(event.currentTarget.value) });
        break;
      case "height":
        func({ ...dimensions, height: Number(event.currentTarget.value) });
        break;
    }
    console.log(dimensions);
  };
  return (
    <div className="dimensions-div">
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Length(in cm)</label>
        <input
          type="number"
          name="length"
          className="dimension-input"
          //value={dimensions.length}
          onChange={onChangeHandle}
        />
      </div>
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Width(in cm)</label>
        <input
          type="number"
          name="width"
          className="dimension-input"
          // value={dimensions.width}
          onChange={onChangeHandle}
        />
      </div>
      <div className="single-dimension-box">
        <label className="dimension-label gray-name">Height(in cm)</label>
        <input
          type="number"
          name="height"
          className="dimension-input"
          //value={dimensions.width}
          onChange={onChangeHandle}
        />
      </div>
    </div>
  );
}

export default DimensionsComponent;
