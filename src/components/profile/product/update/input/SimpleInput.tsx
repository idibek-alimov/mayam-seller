import React from "react";
import "./SimpleInput.css";
import { RxCross2 } from "react-icons/rx";
interface PropInput {
  text: string | number;
  func: (text: string) => void;
  textArea?: boolean;
  disabled?: boolean;
  textType?: string;
}
function SimpleInput({ text, func, textArea, disabled, textType }: PropInput) {
  if (!textArea) {
    return (
      <div className="input-box">
        <input
          type={textType ? textType : "text"}
          className="input-itself"
          value={text}
          onChange={(event) => func(event.target.value)}
          disabled={disabled ? true : false}
        />
        {/* <div className="clear-icon"> */}
        {text != "" ? (
          <RxCross2
            color="black"
            className="clear-icon"
            onClick={() => func("")}
            style={disabled ? { display: "none" } : {}}
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
