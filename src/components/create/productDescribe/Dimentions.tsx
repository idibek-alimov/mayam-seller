import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { CategoryBDProp } from "./ProductDescribe";
interface DimensiontProp {
  categoryBD: CategoryBDProp;
  setCategoryBD: React.Dispatch<React.SetStateAction<any>>;
}

export const Dimentions = ({ categoryBD, setCategoryBD }: DimensiontProp) => {
  const onChangeHandle = (event: React.FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "length":
        setCategoryBD({
          ...categoryBD,
          dimensions: {
            ...categoryBD.dimensions,
            length: event.currentTarget.value,
          },
        });
        break;
      case "width":
        setCategoryBD({
          ...categoryBD,
          dimensions: {
            ...categoryBD.dimensions,
            width: event.currentTarget.value,
          },
        });
        break;
      case "height":
        setCategoryBD({
          ...categoryBD,
          dimensions: {
            ...categoryBD.dimensions,
            height: event.currentTarget.value,
          },
        });
        break;
    }
    console.log(categoryBD);
  };
  return (
    <div className="dimension-box">
      <div className="dimen-item">
        <span>Length (in cm)</span>
        <input
          type="number"
          //value={categoryBD.dimensions.length}
          name="length"
          onChange={onChangeHandle}
        />
      </div>
      <div className="dimen-item">
        <span>Width (in cm)</span>
        <input
          type="number"
          //value={categoryBD.dimensions.width}
          name="width"
          onChange={onChangeHandle}
        />
      </div>
      <div className="dimen-item">
        <span>Height (in cm)</span>
        <input
          type="number"
          //value={categoryBD.dimensions.height}
          name="height"
          onChange={onChangeHandle}
        />
      </div>
    </div>
  );
};
