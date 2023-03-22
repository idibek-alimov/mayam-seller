import React, { useState } from "react";
import "./Color.css";
import { Color as ColorType } from "../../../../extra/types/Color";
import { ArticleCreateProp } from "../ArticleCreate";
type ColorProp = {
  articles: ArticleCreateProp[];
  articleIndex: number;
  setState: React.Dispatch<React.SetStateAction<any>>;
};
const Color = ({ articles, articleIndex, setState }: ColorProp) => {
  const [color, setColor] = useState<ColorType>({ name: "" });
  const onColorChangeHandle = (event: React.FormEvent<HTMLInputElement>) => {
    setColor({ name: event.currentTarget.value });
    let articleData = articles;
    articleData[articleIndex]["color"]["name"] = event.currentTarget.value;
    setState(articleData);
    console.log(articles);
  };
  return (
    <div className="color-div">
      <div className="color-box">
        <span>Color</span>
        <input
          name="color"
          value={articles[articleIndex]["color"]["name"]}
          onChange={onColorChangeHandle}
        />
      </div>
    </div>
  );
};

export default Color;
