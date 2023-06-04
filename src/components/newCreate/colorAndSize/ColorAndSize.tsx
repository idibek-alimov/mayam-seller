import React, { useState, useEffect, useReducer } from "react";
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
import { Inventory, emptyInventory } from "../../../extra/types/Inventory";
import InventoryInput from "./inventoryInput/InventoryInput";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { publicEncrypt } from "crypto";
import InputWithChooseList from "../category/CategoryChooseList";
import SimpleInput from "../input/SimpleInput";

interface AddPicturesProp {
  width: string | number;
  height: string | number;
  pixels?: boolean;
}

interface ColorAndSizeProp {
  //articles?: ArticleCreateProp[];
  pics: File[][];
  colors: string[];
  inventories: Inventory[][];
  sellerArticle: string[];
  //category?: Category;
  //setArticles?: React.Dispatch<React.SetStateAction<any>>;
  setPics: React.Dispatch<React.SetStateAction<any>>;
  setColors: React.Dispatch<React.SetStateAction<any>>;
  setInventories: React.Dispatch<React.SetStateAction<any>>;
  setSellerArticle: React.Dispatch<React.SetStateAction<any>>;
  func?: (arr: string[][]) => void;
}

function ColorAndSize({
  colors,
  setColors,
  inventories,
  setInventories,
  pics,
  setPics,
  sellerArticle,
  setSellerArticle,
}: ColorAndSizeProp) {
  //let colorindex = 0;
  const [colorindex, setColorIndex] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
  const onAddColor = () => {
    console.log("clicked and color index", colorindex);
    let placeHolder = colors;
    let inventoryPlaceHolder = inventories;
    let picsPlaceholder = pics;
    let sellerArticlePlaceholder: string[] = sellerArticle;
    placeHolder.push("");
    sellerArticle.push("");
    inventoryPlaceHolder.push([emptyInventory]);
    picsPlaceholder.push([]);
    setColors(placeHolder);
    setInventories(inventoryPlaceHolder);
    setPics(picsPlaceholder);
    setSellerArticle(sellerArticlePlaceholder);
    //console.log("inventory after add color", inventoryPlaceHolder);
    handleClick();
  };

  const onRemoveColor = (index: number) => {
    if (colors.length > 1) {
      let placeHolder: string[] = [...colors];
      let inventoryPlaceHolder: Inventory[][] = [...inventories];
      let picsPlaceholder: File[][] = [...pics];
      let sellerArticlePlaceholder: string[] = [...sellerArticle];
      placeHolder.splice(index, 1);
      inventoryPlaceHolder.splice(index, 1);
      picsPlaceholder.splice(index, 1);
      sellerArticlePlaceholder.splice(index, 1);
      setColors(placeHolder);
      setInventories(inventoryPlaceHolder);
      setPics(picsPlaceholder);
      setSellerArticle(sellerArticlePlaceholder);

      handleClick();
      if (colorindex > placeHolder.length - 1) {
        //alert("condition worked");
        alert("condition met");
        let newindex: number = colorindex - 1;
        setColorIndex(0);
        //alert("after setting color index");
      }
    }
  };
  const onAddSize = () => {
    let inventoryPlaceHolder: Inventory[][] = [...inventories];
    inventoryPlaceHolder[colorindex].push(emptyInventory);
    setInventories(inventoryPlaceHolder);
    handleClick();
  };
  const onRemoveSize = (index: number) => {
    if (inventories[colorindex].length > 1) {
      let inventoryPlaceHolder: Inventory[][] = [...inventories];
      inventoryPlaceHolder[colorindex].splice(index, 1);
      setInventories(inventoryPlaceHolder);
      handleClick();
    }
  };
  const onAddPictures = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      let picsPlaceholder = pics;
      let piclist = [];
      for (let i = 0; i < event.currentTarget.files?.length; i++) {
        piclist.push(event.currentTarget.files[i]);
      }
      //let newpics = [...pics[colorindex], ...piclist];
      picsPlaceholder[colorindex] = [...pics[colorindex], ...piclist];
      setPics(picsPlaceholder);
      console.log(picsPlaceholder);
    }

    handleClick();
  };
  const onDeleteOneImageHandle = (index: number) => {
    let imagePlaceholder: File[][] = pics;
    imagePlaceholder[colorindex].splice(index, 1);
    setPics(imagePlaceholder);
    handleClick();
  };
  // useEffect(() => {
  //   alert("inside use effect");
  //   handleClick();
  // }, [colorindex]);
  const AddPictures = ({ width, height, pixels }: AddPicturesProp) => {
    // if(pixels && pixels){
    //   let width = Number(width);
    // }
    return (
      <label
        className="pictures-label"
        onChange={(event: React.FormEvent<HTMLLabelElement>) => {
          console.log("label", event);
        }}
        htmlFor={String(colorindex)}
        style={
          pixels
            ? { width: Number(width), height: Number(height) }
            : { width: width, height: height }
        }
      >
        <input
          name=""
          type="file"
          id={String(colorindex)}
          onChange={onAddPictures}
          hidden
          multiple={true}
        />
        <div
          className="pictures-plus-icon"
          style={
            pixels
              ? { width: Number(width), height: Number(height) }
              : { width: width, height: height }
          }
        >
          <div className="plus-icon-div">
            <AiOutlinePlus className="plus-icon" />
            <div className="pictures-add-description">
              <span className="pictures-highlight-text">Выберите фото</span>
              <span className="pictures-ordinary-text gray-name">
                Добавьте до 30 фото болше не надо добавитть
              </span>
            </div>
          </div>
        </div>
      </label>
    );
  };

  return (
    <div className="color-and-size-div">
      <button
        className="add-color-button"
        onClick={(event) => {
          event.preventDefault();
          onAddColor();
        }}
      >
        <AiOutlinePlus />
        <span>Add color</span>
      </button>
      <div className="color-box-wrapper">
        {colors
          ? colors.map((color, index) => {
              return (
                <div
                  onClick={() => {
                    setColorIndex(index);
                    handleClick();
                    //alert("clicked");
                  }}
                >
                  <ColorBox
                    text={"Color" + String(index + 1)}
                    index={index}
                    func={onRemoveColor}
                    chosen={colorindex === index}
                    oneColor={colors.length != 1 ? false : true}
                  />
                </div>
              );
            })
          : ""}
        {/* <ColorBox text="Color 1" /> */}
      </div>
      <div className="category-box" style={{ marginTop: 20 }}>
        <span className="gray-name">Seller article</span>
        <SimpleInput
          text={sellerArticle[colorindex]}
          func={function (text: string) {
            console.log("seller article", text);
            let sellerArticlePlaceholder: string[] = sellerArticle;
            sellerArticlePlaceholder[colorindex] = text;
            setSellerArticle(sellerArticlePlaceholder);
            handleClick();
          }}
        />
      </div>
      <div className="category-box" style={{ marginTop: 20 }}>
        <span className="gray-name">Colors</span>
        <InputWithChooseList
          chosenCategory={colors[colorindex]}
          func={function (name: string) {
            let placeholder: string[] = colors;
            placeholder[colorindex] = name;
            setColors(placeholder);
            //console.log(category);
          }}
          linkText={{ firstLink: "", secondLink: "/api/color/name/similar/" }}
        />
      </div>

      <div
        className="category-box"
        style={{ marginTop: 20, alignItems: "flex-start" }}
      >
        <span className="gray-name" style={{ marginTop: 10 }}>
          Inventories
        </span>
        <div style={{ width: "80%" }}>
          {inventories && inventories[colorindex]
            ? inventories[colorindex].map((inventory, index) => {
                return (
                  <InventoryInput
                    inventory={inventory}
                    func={function (inventory: Inventory) {
                      let inventoriesPlaceHolder = inventories;
                      inventoriesPlaceHolder[colorindex][index] = inventory;
                      setInventories(inventoriesPlaceHolder);
                      console.log(inventories);
                      handleClick();
                    }}
                    delfunc={() => onRemoveSize(index)}
                  />
                );
              })
            : ""}
          <div className="add-size-box">
            <div onClick={onAddSize}>
              <AiOutlinePlus className="add-size-icon" />
              <span className="add-size-text">Add Size</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pictures-div">
        <span className="pictures-text">
          Pictures for color {colorindex + 1}
        </span>
        <div className="pictures-box-big">
          {pics[colorindex] && pics[colorindex].length != 0 ? (
            <div className="pictures-box">
              {pics[colorindex].map((pic, index) => {
                return (
                  <div key={index} className="picture-wrapper">
                    <img src={URL.createObjectURL(pic)} alt="nopic" />
                    <AiOutlineDelete
                      className="pic-delete-icon"
                      width={200}
                      onClick={() => onDeleteOneImageHandle(index)}
                    />
                  </div>
                );
              })}
              <div className="picture-wrapper">
                <AddPictures width={200} height={240} />
              </div>
            </div>
          ) : (
            <AddPictures width="100%" height={300} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorAndSize;
