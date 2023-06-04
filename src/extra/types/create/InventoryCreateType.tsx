import { SizeType, emptySize } from "./SizeType";

export type InventoryCreateType = {
  id?: number;
  originalPrice: number;
  quantity: number;
  inventorySize?: SizeType;
};
export let emptyInventoryCreate: InventoryCreateType = {
  originalPrice: 0,
  quantity: 0,
  inventorySize: { ...emptySize },
};
