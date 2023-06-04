import React from "react";
import "./InventoryInput.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Inventory } from "../../../../../../extra/types/Inventory";
import { InventoryCreateType } from "../../../../../../extra/types/create/InventoryCreateType";
import { useGlobalContext } from "../../CreateContext";
import { ArticleActionsKind } from "../../createDispatch";

interface InventoryInputProp {
  articleIndex: number;
  inventoryIndex: number;
}

const InventoryInput = ({
  articleIndex,
  inventoryIndex,
}: InventoryInputProp) => {
  const { articles, articleDispatch } = useGlobalContext();
  return (
    <div className="inventory-box">
      <div className="input-box">
        <label>Size</label>
        <input
          value={
            articles[articleIndex].inventory[inventoryIndex].inventorySize?.size
          }
          onChange={(event) =>
            articleDispatch({
              type: ArticleActionsKind.ADD_SIZE,
              payload: {
                articleIndex: articleIndex,
                inventoryIndex: inventoryIndex,
                string_value: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="input-box">
        <label>Quantity</label>
        <input
          value={
            articles[articleIndex].inventory[inventoryIndex].quantity
              ? articles[articleIndex].inventory[inventoryIndex].quantity
              : ""
          }
          type="number"
          onChange={(event) =>
            articleDispatch({
              type: ArticleActionsKind.ADD_QUANTITY,
              payload: {
                articleIndex: articleIndex,
                inventoryIndex: inventoryIndex,
                value: event.target.value,
              },
            })
          }
        />
      </div>

      <div className="input-box">
        <label>Price</label>
        <input
          value={
            articles[articleIndex].inventory[inventoryIndex].originalPrice
              ? articles[articleIndex].inventory[inventoryIndex].originalPrice
              : ""
          }
          type="number"
          onChange={(event) =>
            articleDispatch({
              type: ArticleActionsKind.ADD_PRICE,
              payload: {
                articleIndex: articleIndex,
                inventoryIndex: inventoryIndex,
                value: Number(event.target.value),
              },
            })
          }
        />
      </div>
      <div
        onClick={() =>
          articleDispatch({
            type: ArticleActionsKind.REMOVE_INVENTORY,
            payload: {
              articleIndex: articleIndex,
              inventoryIndex: inventoryIndex,
            },
          })
        }
        className="input-box size-delete-box"
      >
        <AiOutlineDelete style={{ width: 20, height: 20 }} />
      </div>
    </div>
  );
};

export default InventoryInput;
