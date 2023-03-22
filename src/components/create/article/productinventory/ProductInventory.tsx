import React, { FormEvent, useState } from "react";
import "./ProductInventory.css";
import { ProductCreateStageTwo } from "../../../../extra/types/ProductCreateStageTwo";
import { ChangeEvent } from "react";
import { addinventory } from "../../../../store/features/productcreate/StagetwoSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";
// import ProductPics from "../productpics/ProductPics";
import { ArticleCreateProp } from "../ArticleCreate";
type InventoryProp = {
  articles: ArticleCreateProp[];
  articleIndex: number;
  setState: React.Dispatch<React.SetStateAction<any>>;
};
const ProductInventory = ({
  articles,
  articleIndex,
  setState,
}: InventoryProp) => {
  let dispatch = useAppDispatch();
  const [inventory, setInventory] = useState<ProductCreateStageTwo[]>([
    { product_size: "", quantity: 1, price: 0 },
  ]);
  let navigate = useNavigate();

  const handleSizeChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // let data: ProductCreateStageTwo[] = [...inventory];
    // data[index]["size"] = event.target.value;
    // setInventory(data);

    let articleData: ArticleCreateProp[] = [...articles];
    articleData[articleIndex]["inventories"][index]["product_size"] =
      event.target.value;
    setState(articleData);
    console.log("size current index", articleIndex);
    console.log(articles);
  };

  const handleAmountChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // let data: ProductCreateStageTwo[] = [...inventory];
    // data[index]["amount"] = Number(event.target.value);
    // setInventory(data);
    let articleData: ArticleCreateProp[] = [...articles];
    articleData[articleIndex]["inventories"][index]["quantity"] = Number(
      event.target.value
    );
    setState(articleData);
    console.log(articles);
  };

  const addField = () => {
    let newfiled = { product_size: "", quantity: 1, price: 1 };
    // setInventory([...inventory, newfiled]);
    let articleData: ArticleCreateProp[] = [...articles];
    articleData[articleIndex]["inventories"].push(newfiled);
    setState(articleData);
    console.log(articles);
  };

  const removeFiled = (index: number) => {
    // let data = [...inventory];
    // data.splice(index, 1);
    // setInventory(data);
    // console.log(inventory);

    let articleData: ArticleCreateProp[] = [...articles];
    articleData[articleIndex]["inventories"].splice(index, 1);
    setState(articleData);
    console.log(articles);
  };

  // const onSubmitHandle = () => {
  //   dispatch(addinventory(inventory));
  //   navigate("/create/complete");
  // };

  return (
    <div className="product-inventory-box">
      {/* <form
        className="inventory-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitHandle();
        }}
      > */}
      <div className="product-inventory-names">
        <span>Size*</span>
        <span>Amount*</span>
        <span>Price*</span>
      </div>
      {articles[articleIndex]["inventories"].map((input, index) => {
        return (
          <div key={index} className="inventory-input-box">
            <input
              name="size"
              placeholder="size"
              value={input.product_size}
              onChange={(event) => handleSizeChange(index, event)}
              className="inventory-input"
              required
            />
            <input
              type="number"
              defaultValue={1}
              name="amount"
              placeholder="amount"
              value={input.quantity}
              onChange={(event) => handleAmountChange(index, event)}
              className="inventory-input"
              required
            />
            <input
              type="number"
              defaultValue={0}
              name="price"
              placeholder="price"
              value={input.price === 0 ? "" : input.price}
              onChange={(event) => {
                //handleAmountChange(index, event);
                let articleData: ArticleCreateProp[] = [...articles];
                articleData[articleIndex]["inventories"][index]["price"] =
                  Number(event.target.value);
                setState(articleData);
              }}
              className="inventory-input"
              required
            />
            <button
              className="inventory-button remove"
              onClick={(event) => {
                event.preventDefault();
                removeFiled(index);
              }}
            >
              <BsTrash />
            </button>
          </div>
        );
      })}
      <div className="inventory-button-box">
        <div className="add-button">
          <button
            onClick={(event) => {
              event.preventDefault();
              addField();
            }}
            className="inventory-button  add"
          >
            add More
          </button>
        </div>
      </div>
      {/* <div className="pics-box">
          <ProductPics />
        </div> */}
      {/* <div className="inventory-button-box">
          <button className="inventory-button submit" type="submit">
            submit
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default ProductInventory;
