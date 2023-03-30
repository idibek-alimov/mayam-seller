import React from "react";
import { Inventory } from "../../../../extra/types/Inventory";
import "./InventoryInput.css";
import { AiOutlineDelete } from "react-icons/ai";

interface InventoryInputProp {
  inventory: Inventory;
  func: (inventory: Inventory) => void;
  delfunc: () => void;
}

const InventoryInput = ({ inventory, func, delfunc }: InventoryInputProp) => {
  return (
    <div className="inventory-box">
      <div className="input-box">
        <label>Size</label>
        <input
          value={inventory.size}
          onChange={(event) => func({ ...inventory, size: event.target.value })}
        />
      </div>
      <div className="input-box">
        <label>Quantity</label>
        <input
          value={inventory.quantity}
          type="number"
          onChange={(event) =>
            func({ ...inventory, quantity: Number(event.target.value) })
          }
        />
      </div>

      <div className="input-box">
        <label>Price</label>
        <input
          value={inventory.price}
          type="number"
          onChange={(event) =>
            func({ ...inventory, price: Number(event.target.value) })
          }
        />
      </div>
      <div onClick={() => delfunc()} className="input-box size-delete-box">
        <AiOutlineDelete style={{ width: 20, height: 20 }} />
      </div>
    </div>
  );
};

export default InventoryInput;
