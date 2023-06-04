import { Color } from "../types/Color";
import { Dimensions } from "../types/Dimensions";
import { Discount } from "../types/Discount";
import { Inventory } from "../types/Inventory";
import { ObjectWithName } from "../types/ObjectWithName";
import { ArticleCreateType } from "../types/create/ArticleCreateType";
import { ProductCreateType } from "../types/create/ProductCreateType";

//     oldPictures:["1.2.3.4.jpg"]
// product:{"name":"product with dimensins edited","description":"descripton edit"}
// inventory:[{"price":123,"quantity":4,"size":"XXXL"}]
// tags:[{"name":"summer"},{"name":"giggidi"}]
// color:{"name":"red"}
// category:{"name":"shirt"}
// gender:{"name":"female"}
// dimensions:{"length":20,"width":21,"height":3434340}
// discount:{"percentage":30}
// sellerArticle:"hello my m"
interface funcProp {
  product?: ProductCreateType;
  article?: ArticleCreateType;
  inventory?: Inventory[];
  color?: ObjectWithName;
  category?: ObjectWithName;
  tags?: string[];
  dimensions?: Dimensions;
  picture?: File[];
  pictures?: File[];
  discount?: Discount;
  gender?: ObjectWithName;
  sellerArticle?: string;
  oldPics?: number[];
}

export const ProductToForm = (productObj: funcProp) => {
  type Keys = keyof funcProp;
  let keys = [
    "product",
    "inventory",
    "article",
    "color",
    "category",
    "tags",
    "dimensions",
    "picture",
    "pictures",
    "discount",
    "sellerArticle",
    "gender",
    "oldPics",
  ] as const;
  const form_data = new FormData();
  const toBlob = (key: Keys) => {
    return new Blob([JSON.stringify(productObj[key])], {
      type: "application/json",
    });
  };
  keys.forEach(function (value) {
    if (productObj[value] && value != "pictures" && value != "picture") {
      form_data.append(String(value), toBlob(value));
    }
  });
  if (productObj.pictures) {
    productObj.pictures.map((pic) => form_data.append(`pictures`, pic));
  }
  if (productObj.picture) {
    productObj.picture.map((pic) => form_data.append(`picture`, pic));
  }

  return form_data;
};
