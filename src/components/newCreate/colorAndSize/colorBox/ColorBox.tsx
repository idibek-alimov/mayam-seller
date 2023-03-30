import React from "react";
import "./ColorBox.css";
interface TextProp {
  text: string;
  index: number;
  func: (index: number) => void;
  chosen: boolean;
  oneColor: boolean;
}
function ColorBox({ text, index, func, chosen, oneColor }: TextProp) {
  return (
    <div className={chosen ? "color-box-div chosen" : "color-box-div"}>
      <div className="color-box-left"></div>
      <div className="color-box-right">
        <span>{text}</span>
        {!oneColor ? (
          <img
            src={"close500.png"}
            style={{ width: 20, height: 20 }}
            onClick={() => func(index)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ColorBox;
