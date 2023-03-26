import { Color } from "./Color";
import { Inventory } from "./Inventory";

export default interface ArticleCreateProp {
  inventories: Inventory[];
  color: string[];
  // pics: File[];
}
export let emptyArticle: ArticleCreateProp[] = [
  {
    inventories: [{ product_size: "", quantity: 1, price: 0 }],
    color: [],
  },
];
