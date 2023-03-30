import { Color } from "./Color";
import { Dimensions } from "./Dimensions";
import { Inventory } from "./Inventory";
import { Picture } from "./Picture";

export interface Article {
  id: number;
  brand: string;
  likes: boolean;
  color?: string;
  inventories: Inventory[];
  pictures: Picture[];
  product_id: number;
  name: string;
  description: string;
  category: string;
  dimensions: Dimensions;
  sellerArticle?: string;
}
