import React from "react";
import "./SimpleInput.css";
import { RxCross2 } from "react-icons/rx";
interface PropInput {
  text: string;
  func: (text: string) => void;
  textArea?: boolean;
}
function SimpleInput({ text, func, textArea }: PropInput) {
  if (!textArea) {
    return (
      <div className="input-box">
        <input
          className="input-itself"
          value={text}
          onChange={(event) => func(event.target.value)}
        />
        {/* <div className="clear-icon"> */}
        {text != "" ? (
          <RxCross2
            color="black"
            className="clear-icon"
            onClick={() => func("")}
          />
        ) : (
          ""
        )}
        {/* </div> */}
      </div>
    );
  } else {
    return (
      <div className="input-box" style={{ width: "100%" }}>
        <textarea
          className="input-itself text-area"
          value={text}
          onChange={(event) => func(event.target.value)}
        />
      </div>
    );
  }
}

export default SimpleInput;
