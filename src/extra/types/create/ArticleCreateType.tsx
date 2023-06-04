import { ObjectWithName } from "../ObjectWithName";
import { Picture } from "../Picture";
import { DiscountType, emptyDiscount } from "./DiscountType";
import {
  InventoryCreateType,
  emptyInventoryCreate,
} from "./InventoryCreateType";
import { SizeType } from "./SizeType";

export type ArticleCreateType = {
  id?: number;
  inventory: InventoryCreateType[];
  color?: ObjectWithName;
  discounts: DiscountType[];
  sellerArticle: string;

  ///extra
  category?: string;
  brand?: string;
  product_id?: number;
  pictures?: Picture[];
};
export let emptyArticleType: ArticleCreateType = {
  inventory: [...[{ ...emptyInventoryCreate }]],
  color: { name: "" },
  discounts: [{ ...emptyDiscount }],
  sellerArticle: "",
};
