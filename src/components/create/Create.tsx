import React, { useState, useEffect } from "react";
import "./Create.css";
import ProductDescribe, {
  CategoryBDProp,
  ProductDescribeProp,
  emptyCategoryBD,
} from "./productDescribe/ProductDescribe";
import ArticleCreate, { ArticleCreateProp } from "./article/ArticleCreate";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Axios, { url } from "../../extra/axios";
import { ProductToForm } from "../../extra/helperfunction/ProductInfoToForm";

const emptyArticle: ArticleCreateProp = {
  inventories: [{ product_size: "", quantity: 1, price: 0 }],
  color: { name: "" },
};

const Create = () => {
  const [articles, setArticles] = useState<ArticleCreateProp[]>([emptyArticle]);
  const [product, setProduct] = useState<ProductDescribeProp>({
    name: "",
    description: "",
  });
  const access_token = useAppSelector((state) => state.token.access_token);
  const [categoryBD, setCategoryBD] = useState<CategoryBDProp>(emptyCategoryBD);
  const [pics, setPics] = useState<File[][]>([[]]);
  const navigate = useNavigate();
  const axios = Axios();

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    ////////////////////////////////////////
    let new_form_data = new FormData();
    new_form_data = ProductToForm({
      product: product,
      size: articles[0].inventories,
      color: articles[0].color,
      category: { name: categoryBD.category },
      tags: categoryBD.brand.map((value) => ({ name: value })),
      brands: categoryBD.brand.map((value) => ({ name: value })),
      dimensions: categoryBD.dimensions,
      picture: pics[0],
      discount: { percentage: 20 },
    });

    axios
      .post(url + "/api/product/create", new_form_data)
      .then((res) => {
        console.log(res.data);
        for (let i = 1; i < articles.length; i++) {
          axios
            .post(
              url + `/api/product/addarticle/${res.data.id}`,

              ProductToForm({
                size: articles[i].inventories,
                color: articles[i].color,

                picture: pics[i],
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
