import React, { useState, useEffect } from "react";
import ArticleCreateProp, {
  emptyArticle,
} from "../../../extra/types/ArticleCreateProp";
import { Category } from "../../../extra/types/Category";
import "./ColorAndSize.css";
import ColorBox from "./colorBox/ColorBox";
import BrandOrTag from "../brandortag/BrandOrTag";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addColors } from "../../../store/features/createArticles/createArticlesSlice";
import createArticleSlice from "../../../store/features/createArticles/createArticlesSlice";

interface ColorAndSizeProp {
  articles: ArticleCreateProp[];
  pics: File[][];
  colors: string[][];
  category: Category;
  setArticles: React.Dispatch<React.SetStateAction<any>>;
  setPics: React.Dispatch<React.SetStateAction<any>>;
  setColors: React.Dispatch<React.SetStateAction<any>>;
  func: (arr: string[][]) => void;
}

function ColorAndSize({
  articles,
  pics,
  colors,
  category,
  setArticles,
  setPics,
  setColors,
  func,
}: ColorAndSizeProp) {
  const [currentColor, setCurrentColor] = useState(0);

  const dispatch = useAppDispatch();
  const articlesRedux = useAppSelector((state) => state.createArticles);
  let [articlesSecond, setArticlesSecond] = useState<ArticleCreateProp[]>([
    ...emptyArticle,
  ]);
  console.log("COlor and Size render");
  // const [colors, setColors] = useState<string[][]>([[]]);

  //   const [colorArticles, setColorArticles] = useState<ArticleCreateProp[]>([
  //     ...articles,
  //   ]);
  //   const [colorPics, setColorPics] = useState<File[][]>(pics);

  const onColorsChangeHandle = (colorsArray: string[]) => {
    let colorsPlaceholder: string[][] = colors;
    colorsPlaceholder[0] = colorsArray;
    setColors(colorsPlaceholder);
    // console.log(colors);
    // let articlePlaceholder = articlesSecond;
    // articlePlaceholder[0]["color"].push("hi         ");
    // console.log(articlePlaceholder);
    // console.log(articlePlaceholder[0].color);
    //articlePlaceholder[0].color = [...colors];
    //setArticlesSecond(articlePlaceholder);
    // articlePlaceholder[0].color = [...colors];

    // dispatch(addColors({ index: 0, color: ["gree", "blue"] }));
    // console.log(articlesRedux);
    // console.log("before");
    // console.log(articlesRedux[0].color);
    // console.log("after");
  };

  useEffect(() => {
    console.log("rerendoercolorchage");
  }, []);

  return (
    <div className="color-and-size-div">
      <button className="add-color-button">add color</button>
      <div className="color-box-wrapper">
        <ColorBox text="Color 1" />
      </div>

      <div className="category-box" style={{ marginTop: 20 }}>
        <span className="gray-name">Colors</span>
        <BrandOrTag
          data={colors[0]}
          func={function (colorarray: string[]) {
            console.log("fucntion colled");
            let arr: string[][] = colors;
            arr[0] = colorarray;
            func(arr);
            //setColors(arr);
            console.log(colors);
          }}
        />
      </div>
    </div>
  );
}

export default ColorAndSize;
