import React, { useState, useEffect, useReducer } from "react";
import "./Create.css";
import { Category, emptyCategory } from "../../extra/types/Category";
import Axios, { url } from "../../extra/axios";
import FancyInput from "../create/productDescribe/FancyInput";
import InputWithChooseList from "./category/CategoryChooseList";
import { Dimensions, emptyDimensions } from "../../extra/types/Dimensions";
import DimensionsComponent from "./dimension/Dimensions";
import SimpleInput from "./input/SimpleInput";
import NameAndDescription, {
  emptyNameAndDescription,
} from "../../extra/types/NameAndDescription";
import BrandOrTag from "./brandortag/BrandOrTag";
import BrandsAndTags, {
  emptyBrandsAndTags,
} from "../../extra/types/BrandsAndTags";
import ArticleCreateProp, {
  emptyArticle,
} from "../../extra/types/ArticleCreateProp";
import ColorAndSize from "./colorAndSize/ColorAndSize";
import { Inventory, emptyInventory } from "../../extra/types/Inventory";

function Create() {
  const [category, setCategory] = useState<Category>(emptyCategory);
  const [dimensions, setDimensions] = useState<Dimensions>(emptyDimensions);
  const [nameAndDescription, setNameAndDescription] =
    useState<NameAndDescription>(emptyNameAndDescription);
  const [brandsAndTags, setBrandsAndTags] =
    useState<BrandsAndTags>(emptyBrandsAndTags);
  let [articles, setArticles] = useState<ArticleCreateProp[]>([
    ...emptyArticle,
  ]);
  let [colors, setColors] = useState<string[][]>([[]]);
  let [inventories, setInventories] = useState<Inventory[][]>([
    [emptyInventory],
  ]);
  const [pics, setPics] = useState<File[][]>([[]]);
  const axios = Axios();

  ////////////////////////ColorAndSize START///////////////////////////////////
  ///////////////ColorBOX START////////////////////
  // interface TextProp {
  //   text: string;
  // }
  // function ColorBox({ text }: TextProp) {
  //   return (
  //     <div className="color-box-div">
  //       <div className="color-box-left"></div>
  //       <div className="color-box-right">
  //         <span>{text}</span>
  //       </div>
  //     </div>
  //   );
  // }

  ///////////////ColorBOX END////////////////////

  // function ColorAndSize() {
  //   const [data, setData] = useState<string[]>(colors[0]);

  //   const [, forceUpdate] = useReducer((x) => x + 1, 0);

  //   function handleClick() {
  //     forceUpdate();
  //   }
  //   return (
  //     <div className="color-and-size-div">
  //       <button className="add-color-button">add color</button>
  //       <div className="color-box-wrapper">
  //         <ColorBox text="Color 1" />
  //       </div>

  //       <div className="category-box" style={{ marginTop: 20 }}>
  //         <span className="gray-name">Colors</span>
  //         {data ? (
  //           <BrandOrTag
  //             data={data}
  //             func={function (colorarray: string[]) {
  //               console.log(colorarray);
  //               setData(colorarray);
  //               handleClick();
  //               // console.log("function called");
  //               // let colorPlaceholder = colors;
  //               // colorPlaceholder[0] = colorarray;
  //               // setColors(colorPlaceholder);
  //               // console.log("after set colors", colors);
  //             }}
  //           />
  //         ) : (
  //           ""
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  ////////////////////////ColorAndSize END///////////////////////////////////

  // if (category.name === "") {
  //   return (
  //     <div className="new-create-div">
  //       <div className="new-create-box">
  //         <span className="information-text">
  //           Information about the product
  //         </span>

  //         <div className="category-box">
  //           <span>Category</span>
  //           <InputWithChooseList
  //             chosenCategory={category}
  //             func={function (category: Category) {
  //               console.log(category);
  //               setCategory(category);
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <div className="new-create-div">
      <div className="new-create-box">
        <span className="information-text">Information about the product</span>

        <div className="category-box">
          <span className="gray-name">Category</span>
          <InputWithChooseList
            chosenCategory={category}
            func={function (category: Category) {
              console.log(category);
              setCategory(category);
            }}
          />
        </div>
        <div className="category-box">
          <span className="gray-name">Dimensions</span>
          <DimensionsComponent
            dimensions={dimensions}
            func={function (dimensions: Dimensions) {
              setDimensions(dimensions);
            }}
          />
        </div>
        <div className="category-box" style={{ marginTop: 20 }}>
          <span className="gray-name">Name</span>
          <SimpleInput
            text={nameAndDescription.name}
            func={function (text: string) {
              console.log(text);
              setNameAndDescription({ ...nameAndDescription, name: text });
            }}
          />
        </div>
        <div className="category-box" style={{ marginTop: 20 }}>
          <span className="gray-name">Brand</span>
          <BrandOrTag
            data={brandsAndTags.brands}
            func={function (brands: string[]) {
              setBrandsAndTags({ ...brandsAndTags, brands: brands });
            }}
            //linkForAxios="/api/brand/name/similar/"
          />
        </div>
        <div className="category-box" style={{ marginTop: 20 }}>
          <span className="gray-name">Tags</span>
          <BrandOrTag
            data={brandsAndTags.tags}
            func={function (tags: string[]) {
              setBrandsAndTags({ ...brandsAndTags, tags: tags });
            }}
            linkForAxios="/api/brand/name/similar/"
          />
        </div>
      </div>
      <div className="new-create-box">
        <span className="information-text">Description</span>
        <div className="category-box" style={{ marginTop: 20 }}>
          <SimpleInput
            text={nameAndDescription.description}
            func={function (text: string) {
              console.log(nameAndDescription);
              setNameAndDescription({
                ...nameAndDescription,
                description: text,
              });
            }}
            textArea={true}
          />
        </div>
      </div>
      <div className="new-create-box">
        <span className="information-text">Description</span>
        <div className="category-box" style={{ marginTop: 20 }}>
          <ColorAndSize
            colors={colors}
            setColors={setColors}
            inventories={inventories}
            setInventories={setInventories}
            pics={pics}
            setPics={setPics}
          />
        </div>
      </div>
    </div>
  );
  // }
}

export default Create;
