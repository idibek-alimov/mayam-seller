export interface Inventory {
  product?: number;
  product_size: string;
  price: number;
  quantity: number;
  id?: number;
}

export let emptyInventory: Inventory = {
  product_size: "",
  quantity: 1,
  price: 1,
};
