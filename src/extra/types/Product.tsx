import { Article } from "./Article";
import { Dimensions } from "./Dimensions";
import { Inventory } from "./Inventory";

export interface Product {
  name: string;
  id: number;
  // pics?: string[];
  // inventory?: Inventory;
  description?: string;
  // price?: number;
  // likes?: boolean;
  articles?: Article[];
  brand?: string;
  tags?: string[];
  category?: string;
  gender?: string;
  dimensions?: Dimensions;
}
