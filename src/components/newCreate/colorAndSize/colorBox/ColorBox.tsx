import React from "react";
import "./ColorBox.css";
interface TextProp {
  text: string;
}
function ColorBox({ text }: TextProp) {
  return (
    <div className="color-box-div">
      <div className="color-box-left"></div>
      <div className="color-box-right">
        <span>{text}</span>
      </div>
    </div>
  );
}

export default ColorBox;
