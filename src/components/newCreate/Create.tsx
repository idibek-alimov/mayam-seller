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
import ArticleCreateProp, {
  emptyArticle,
} from "../../extra/types/ArticleCreateProp";
import ColorAndSize from "./colorAndSize/ColorAndSize";
import { Inventory, emptyInventory } from "../../extra/types/Inventory";
import { ProductToForm } from "../../extra/helperfunction/ProductInfoToForm";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function Create() {
  const [category, setCategory] = useState<Category>(emptyCategory);
  const [dimensions, setDimensions] = useState<Dimensions>(emptyDimensions);
  const [nameAndDescription, setNameAndDescription] =
    useState<NameAndDescription>(emptyNameAndDescription);
  const [tags, setTags] = useState<string[]>([]);
  //let [articles, setArticles] = useState<ArticleCreateProp[]>([
  //  ...emptyArticle,
  //]);
  let [colors, setColors] = useState<string[]>([""]);
  let [inventories, setInventories] = useState<Inventory[][]>([
    [emptyInventory],
  ]);
  const [pics, setPics] = useState<File[][]>([[]]);
  const axios = Axios();
  const navigate = useNavigate();
  const access_token = useAppSelector((state) => state.token.access_token);

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    alert("Form submitting");
    event.preventDefault();
    let new_form_data = new FormData();
    new_form_data = ProductToForm({
      product: nameAndDescription,
      inventory: inventories[0],
      color: { name: colors[0] },
      category: category,
      tags: tags,
      dimensions: dimensions,
      picture: pics[0],
      discount: { percentage: 20 },
      gender: { name: "male" },
      sellerArticle: "123523dss23",
    });

    axios
      .post(url + "/api/product/create", new_form_data)
      .then((res) => {
        console.log(res.data);
        for (let i = 1; i < colors.length; i++) {
          axios
            .post(
              url + `/api/product/addarticle/${res.data.id}`,

              ProductToForm({
                inventory: inventories[i],
                color: { name: colors[i] },
                picture: pics[i],
                sellerArticle: "123523dss23",
              })
            )
            .then((response) => console.log(res))
            .catch((err) => console.log(err));
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    }
  }, []);

  if (category.name === "") {
    return (
      <div className="new-create-div">
        <div className="new-create-box">
          <span className="information-text">
            Information about the product
          </span>

          <div className="category-box">
            <span>Category</span>
            <InputWithChooseList
              chosenCategory={category.name}
              func={function (name: string) {
                console.log(category);
                setCategory({ ...category, name: name });
              }}
              linkText={{
                firstLink: "/api/category/common/30",
                secondLink: "/api/category/name/similar/",
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="new-create-div">
        <form
          style={{ width: "100%" }}
          className="new-create-div"
          onSubmit={onSubmitHandle}
        >
          <div className="new-create-box">
            <span className="information-text">
              Information about the product
            </span>

            <div className="category-box">
              <span className="gray-name">Category</span>
              <InputWithChooseList
                chosenCategory={category.name}
                func={function (name: string) {
                  //console.log(category);
                  setCategory({ ...category, name: name });
                }}
                linkText={{
                  firstLink: "/api/category/common/30",
                  secondLink: "/api/category/name/similar/",
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
              <SimpleInput
                text={nameAndDescription.brand}
                func={function (text: string) {
                  console.log(text);
                  setNameAndDescription({ ...nameAndDescription, brand: text });
                }}
              />
            </div>
            {/* <div className="category-box" style={{ marginTop: 20 }}>
              <span className="gray-name">Brand</span>
              <BrandOrTag
                data={brandsAndTags.brands}
                func={function (brands: string[]) {
                  setBrandsAndTags({ ...brandsAndTags, brands: brands });
                }}
                //linkForAxios="/api/brand/name/similar/"
              />
            </div> */}
            <div className="category-box" style={{ marginTop: 20 }}>
              <span className="gray-name">Tags</span>
              <BrandOrTag
                data={tags}
                func={function (tags: string[]) {
                  setTags(tags);
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
          <div className="new-create-box">
            <button type="submit">Create product</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Create;
