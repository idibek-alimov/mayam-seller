import { InventoryProp } from "../../components/create/article/ArticleCreate";
import {
  ProductDescribeProp,
  CategoryBDProp,
  DimensionsProp,
} from "../../components/create/productDescribe/ProductDescribe";
import { Color } from "../types/Color";
import { Dimensions } from "../types/Dimensions";
import { Discount } from "../types/Discount";
import { Inventory } from "../types/Inventory";
import { ObjectWithName } from "../types/ObjectWithName";
interface funcProp {
  product?: ProductDescribeProp;
  inventory: Inventory[];
  color?: ObjectWithName;
  category?: ObjectWithName;
  tags?: string[];
  dimensions?: Dimensions;
  picture?: File[];
  discount?: Discount;
  gender?: ObjectWithName;
  sellerArticle?: string;
}

export const ProductToForm = (productObj: funcProp) => {
  type Keys = keyof funcProp;
  let keys = [
    "product",
    "inventory",
    "color",
    "category",
    "tags",
    "dimensions",
    "picture",
    "discount",
    "sellerArticle",
    "gender",
  ] as const;
  const form_data = new FormData();
  const toBlob = (key: Keys) => {
    return new Blob([JSON.stringify(productObj[key])], {
      type: "application/json",
    });
  };
  keys.forEach(function (value) {
    if (productObj[value] && value != "picture") {
      form_data.append(String(value), toBlob(value));
    }
  });
  if (productObj.picture) {
    productObj.picture.map((pic) => form_data.append(`picture`, pic));
  }
  return form_data;
};
