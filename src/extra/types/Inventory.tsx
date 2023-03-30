export interface Inventory {
  product?: number;
  size?: string;
  price: number;
  quantity: number;
  available?: boolean;
  id?: number;
}

export let emptyInventory: Inventory = {
  size: "",
  quantity: 1,
  price: 1,
};
