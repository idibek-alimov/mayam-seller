import React, { useState, useEffect } from "react";
import "./Create.css";
import ProductDescribe, {
  CategoryBDProp,
  ProductDescribeProp,
  emptyCategoryBD,
} from "./productDescribe/ProductDescribe";
import ArticleCreate, { ArticleCreateProp } from "./article/ArticleCreate";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { fileURLToPath } from "url";
import { BsFile } from "react-icons/bs";
//import { ArticleCreateProp } from "./article/ArticleCreate";
//import { ProductDescribeProp, CategoryBDProp } from './productDescribe/ProductDescribe';
import { useNavigate } from "react-router-dom";
import { url } from "../../extra/axios";
import { ListToListOfObjectNames } from "../../extra/helperfunction/listToListOfObjectsName";

interface PicProp {
  pics: File[];
}

const Create = () => {
  const access_token = useAppSelector((state) => state.token.access_token);
  const navigate = useNavigate();
  /////////////////
  let custom_headers = access_token
    ? {
        Authorization: String("Bearer " + access_token),
        common: {
          "Cache-Control": "no-cache, no-store, must-revalidate",

          "Content-Type": ["multipart/form-data", "application/json"],
          // Accept: "application/json",
        },
      }
    : {
        Authorization: String(""),
        common: {
          "Cache-Control": "no-cache, no-store, must-revalidate",

          "Content-Type": ["multipart/form-data", "application/json"],
          // Accept: "application/json",
        },
      };

  const axioss = axios.create({
    headers: custom_headers,
    baseURL: "http://localhost:8080/api/product",
  });
  //////////////////

  const emptyArticle: ArticleCreateProp = {
    inventories: [{ product_size: "", quantity: 1, price: 0 }],
    color: { name: "" },
    // pics: [],
  };
  const [articles, setArticles] = useState<ArticleCreateProp[]>([emptyArticle]);
  const [product, setProduct] = useState<ProductDescribeProp>({
    name: "",
    description: "",
  });
  const [categoryBD, setCategoryBD] = useState<CategoryBDProp>(emptyCategoryBD);
  const [pics, setPics] = useState<File[][]>([[]]);
  const CreateFormData = (
    articles: ArticleCreateProp[],
    pics: File[][],
    index: number
  ) => {
    const tags = [{ name: "clothe" }];
    let form_data = new FormData();

    const sizeblob = new Blob([JSON.stringify(articles[index].inventories)], {
      type: "application/json",
    });
    const colorblob = new Blob([JSON.stringify(articles[index].color)], {
      type: "application/json",
    });
    const tagsblob = new Blob([JSON.stringify(tags)], {
      type: "application/json",
    });

    //form_data.append("product", productblob);
    //    form_data.append("article", articleblob);
    form_data.append("size", sizeblob);
    form_data.append("color", colorblob);
    //form_data.append("picture",);
    pics[index].map((pic) => form_data.append(`picture`, pic));
    //form_data.append("tags", tagsblob);
    return form_data;
  };
  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    for (let i = 0; i < articles.length; i++) {}
    const tags = ListToListOfObjectNames(categoryBD.brand);
    event.preventDefault();
    let form_data = new FormData();
    const productblob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    const sizeblob = new Blob([JSON.stringify(articles[0].inventories)], {
      type: "application/json",
    });
    const colorblob = new Blob([JSON.stringify(articles[0].color)], {
      type: "application/json",
    });
    const picsblob = new Blob([pics[0][0]], {});
    const tagsblob = new Blob([JSON.stringify(tags)], {
      type: "application/json",
    });
    const categoryblob = new Blob(
      [JSON.stringify({ name: categoryBD.category })],
      {
        type: "application/json",
      }
    );
    const brandblob = new Blob(
      [JSON.stringify(ListToListOfObjectNames(categoryBD.brand))],
      {
        type: "application/json",
      }
    );
    const dimensionsblob = new Blob([JSON.stringify(categoryBD.dimensions)], {
      type: "application/json",
    });
    const discountblob = new Blob([JSON.stringify({ percentage: 10 })], {
      type: "application/json",
    });
    form_data.append("product", productblob);
    //    form_data.append("article", articleblob);
    form_data.append("size", sizeblob);
    form_data.append("color", colorblob);
    form_data.append("category", categoryblob);
    form_data.append("brands", brandblob);
    form_data.append("dimensions", dimensionsblob);
    form_data.append("discount", discountblob);
    //form_data.append("picture",);
    pics[0].map((pic) => form_data.append(`picture`, pic));
    //form_data.append("pictures", picsblob);
    form_data.append("tags", tagsblob);
    console.log(form_data.get("product"));
    axioss
      .post(url + "/api/product/create", form_data)
      .then((res) => {
        console.log(res.data);
        for (let i = 1; i < articles.length; i++) {
          axioss
            .post(
              url + `/api/product/addarticle/${res.data.id}`,
              CreateFormData(articles, pics, i)
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
  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <div>
          <ProductDescribe
            product={product}
            setProduct={setProduct}
            categoryBD={categoryBD}
            setCategoryBD={setCategoryBD}
          />
          {articles ? (
            <ArticleCreate
              articles={articles}
              setArticles={setArticles}
              pics={pics}
              setPics={setPics}
            />
          ) : (
            ""
          )}
        </div>
        <div className="create-submit-div">
          <div className="create-submit-box">
            <button className="create-submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
