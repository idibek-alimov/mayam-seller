import { Article } from "./Article";
import { Inventory } from "./Inventory";

export interface Product {
  name: string;
  id: number;
  // pics?: string[];
  // inventory?: Inventory;
  description?: string;
  // price?: number;
  // likes?: boolean;
  articles: Article[];
}
