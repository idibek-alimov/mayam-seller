import { Color } from "./Color";
import { Inventory } from "./Inventory";
import { Picture } from "./Picture";

export interface Article {
  id: number;
  likes: boolean;
  color?: Color;
  inventories: Inventory[];
  pictures: Picture[];
  product_id: number;
  name: string;
  description: string;
}
