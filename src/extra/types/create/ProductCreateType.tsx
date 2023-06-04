import { Category, emptyCategory } from "../Category";
import { Dimensions, emptyDimensions } from "../Dimensions";
import { ObjectWithName } from "../ObjectWithName";
import { User } from "../User";

export type ProductCreateType = {
  id?: number;
  name: string;
  description: string;
  brand: string;
  tags: string[];
  category: Category;
  dimensions: Dimensions;
  productGender?: ObjectWithName;
  user?: User;
};

export const emptyProductCreate = {
  name: "",
  description: "",
  brand: "",
  tags: [],
  category: { ...emptyCategory },
  dimensions: { ...emptyDimensions },
};
