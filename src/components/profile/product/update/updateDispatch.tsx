import { Reducer } from "react";
import { Category } from "../../../../extra/types/Category";
import {
  ProductCreateType,
  emptyProductCreate,
} from "../../../../extra/types/create/ProductCreateType";
import {
  ArticleCreateType,
  emptyArticleType,
} from "../../../../extra/types/create/ArticleCreateType";
import { emptyInventoryCreate } from "../../../../extra/types/create/InventoryCreateType";

export enum ProductActionsKind {
  ADD_CATEGORY = "ADD_CATEGORY",
  ADD_NAME = "ADD_NAME",
  ADD_DESCRIPTION = "ADD_DESCRIPTION",
  ADD_BRAND = "ADD_BRAND",
  ADD_TAGS = "ADD_TAGS",
  ADD_DIMENSIONS = "ADD_DIMENSIONS",
  ADD_WIDTH = "ADD_WIDTH",
  ADD_HEIGHT = "ADD_HEIGHT",
  ADD_LENGTH = "ADD_LENGTH",
  ADD_GENDER = "ADD_GENDER",
  ADD_WHOLE_PRODUCT = "ADD_WHOLE_PRODUCT",
}

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}
export interface ProductActionType {
  type: ProductActionsKind;
  payload: string | number | Category | ProductCreateType;
}

export const productReducer = (
  state: ProductCreateType,
  action: ProductActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case ProductActionsKind.ADD_NAME:
      if (typeof payload === "string")
        return {
          ...state,
          name: payload,
        };
      else return state;
    case ProductActionsKind.ADD_DESCRIPTION:
      if (typeof payload === "string")
        return {
          ...state,
          description: payload,
        };
      else return state;
    case ProductActionsKind.ADD_BRAND:
      if (typeof payload === "string")
        return {
          ...state,
          brand: payload,
        };
      else return state;
    case ProductActionsKind.ADD_CATEGORY:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "name" in payload
      ) {
        console.log("after parsing artificially", {
          ...state,
          category: payload,
        });
        return {
          ...state,
          category: { ...payload },
        };
      } else return state;
    case ProductActionsKind.ADD_TAGS:
      if (isArrayOfStrings(payload)) {
        console.log("after parsing artificially", {
          ...state,
          tags: payload,
        });
        return {
          ...state,
          tags: payload,
        };
      } else return state;
    case ProductActionsKind.ADD_GENDER:
      if (typeof payload === "string")
        return {
          ...state,
          productGender: { name: payload },
        };
      else return state;
    case ProductActionsKind.ADD_HEIGHT:
      if (typeof payload === "number")
        return {
          ...state,
          dimensions: { ...state.dimensions, height: payload },
        };
      else return state;
    case ProductActionsKind.ADD_WIDTH:
      if (typeof payload === "number")
        return {
          ...state,
          dimensions: { ...state.dimensions, width: payload },
        };
      else return state;
    case ProductActionsKind.ADD_LENGTH:
      if (typeof payload === "number")
        return {
          ...state,
          dimensions: { ...state.dimensions, length: payload },
        };
      else return state;
    case ProductActionsKind.ADD_WHOLE_PRODUCT:
      if (
        typeof payload === "object" &&
        payload != null &&
        "name" in payload &&
        "description" in payload &&
        "brand" in payload &&
        "category" in payload &&
        "dimensions" in payload &&
        "productGender" in payload
      ) {
        state = { ...payload };
        return { ...state };
      } else return state;
    default:
      return state;
  }
};

///////////////Article Article Article ////////////////////////////////////////

export enum ArticleActionsKind {
  ADD_WHOLE_ARTICLE = "ADD_WHOLE_ARTICLE",
  ADD_EMPTY_ARTICLE = "ADD_EMPTY_ARTICLE",
  REMOVE_ARTICLE = "REMOVE_ARTICLE",
  REMOVE_INVENTORY = "REMOVE_INVENTORY",
  ADD_EMPTY_INVENTORY = "ADD_EMPTY_INVENTORY",
  ADD_PRICE = "ADD_PRICE",
  ADD_QUANTITY = "ADD_QUANTITY",
  ADD_SIZE = "ADD_SIZE",
  ADD_COLOR = "ADD_COLOR",
  ADD_SELLER_ARTICLE = "ADD_SELLER_ARTICLE",
  ADD_DISCOUNT = "ADD_DISCOUNT",
}

export interface ArticleActionType {
  type: ArticleActionsKind;
  payload:
    | string
    | number
    | { index: number; value: string }
    | { index: number; percentage: number }
    | { index: number; length: number }
    | { index: number; value: string; id: number }
    | { articleIndex: number; inventoryIndex: number; value: number }
    | { articleIndex: number; inventoryIndex: number; string_value: string }
    | { articleIndex: number; inventoryIndex: number }
    | ArticleCreateType[];
}

export const articleReducer = (
  state: ArticleCreateType[],
  action: ArticleActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case ArticleActionsKind.ADD_COLOR:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "index" in payload &&
        "id" in payload
      ) {
        state[payload.index].color = { id: payload.id, name: payload.value };
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_EMPTY_ARTICLE:
      if (typeof payload === "number" && payload != state.length) {
        state.push({
          ...emptyArticleType,
          inventory: [{ ...emptyInventoryCreate }],
        });
        return [...state];
      } else return state;
    case ArticleActionsKind.REMOVE_ARTICLE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "length" in payload &&
        "index" in payload &&
        payload.length < state.length
      ) {
        let placeholder = state;
        placeholder.splice(payload.index, 1);
        return [...placeholder];
      } else return state;
    case ArticleActionsKind.ADD_SELLER_ARTICLE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "index" in payload
      ) {
        state[payload.index].sellerArticle = payload.value;
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_DISCOUNT:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "percentage" in payload &&
        "index" in payload
      ) {
        if (state[payload.index].discounts.length != 0) {
          state[payload.index].discounts[
            state[payload.index].discounts.length - 1
          ].percentage = payload.percentage;
        } else {
          state[payload.index].discounts.push({
            percentage: payload.percentage,
          });
        }
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_PRICE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        console.log("state before changing price", state);
        state[payload.articleIndex].inventory[
          payload.inventoryIndex
        ].originalPrice = payload.value;
        console.log("state after changing price", state);
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_QUANTITY:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].inventory[payload.inventoryIndex].quantity =
          payload.value;
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_SIZE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "string_value" in payload &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].inventory[
          payload.inventoryIndex
        ].inventorySize = { size: payload.string_value };
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_EMPTY_INVENTORY:
      if (typeof payload === "number") {
        state[payload].inventory.push({ ...emptyInventoryCreate });
        return [...state];
      } else return state;
    case ArticleActionsKind.REMOVE_INVENTORY:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].inventory.splice(payload.inventoryIndex);
        return [...state];
      } else return state;
    // case ArticleActionsKind.ADD_WHOLE_ARTICLE:
    //   if(
    //     typeof payload === "object" &&
    //     payload !=null &&
    //     "inventory" in payload &&
    //     payload.inventory &&
    //     "size" in payload.inventory &&
    //     "color" in payload &&
    //     "discount" in payload&&
    //     "sellerArticle" in payload
    //   )
    //     {
    //       state.push({...payload})
    //       return
    //     }
    default:
      return state;
  }
};

export enum PictureActionsKind {
  ADD_EMPTY_PICTURES = "ADD_EMPTY_PICTURES",
  ADD_PICTURE = "ADD_PICTURE",
  REMOVE_PICTURE = "REMOVE_PICTURE",
  REMOVE_PICTURE_LIST = "REMOVE_PICTURE_LIST",
}
const isFile = (input: File) => "File" in window && input instanceof File;
export interface PictureActionType {
  type: PictureActionsKind;
  payload:
    | string
    | number
    | { index: number; value: string }
    | { index: number; length: number }
    | { articleIndex: number; picture: File }
    | { articleIndex: number; pictureIndex: number };
}

export const pictureReducer = (state: File[][], action: PictureActionType) => {
  const { type, payload } = action;
  switch (type) {
    case PictureActionsKind.ADD_EMPTY_PICTURES:
      if (typeof payload === "number") {
        state.push([]);
        return [...state];
      } else return state;
    case PictureActionsKind.ADD_PICTURE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "picture" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].push(payload.picture);
        return [...state];
      } else return state;
    case PictureActionsKind.REMOVE_PICTURE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "pictureIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].splice(payload.pictureIndex, 1);
        return [...state];
      } else return state;
    case PictureActionsKind.REMOVE_PICTURE_LIST:
      if (typeof payload === "number") {
        state.splice(payload, 1);
        return [...state];
      } else return state;
    default:
      return state;
  }
};

export enum OldPicsActionsKind {
  REMOVE_PICTURE = "REMOVE_PICTURE",
}

export interface OldPicsActionType {
  type: OldPicsActionsKind;
  payload: { articleIndex: number; pictureIndex: number };
}

export const oldPicsReducer = (
  state: number[][],
  action: OldPicsActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case OldPicsActionsKind.REMOVE_PICTURE:
      if (
        typeof payload === "object" &&
        payload != null &&
        "articleIndex" in payload &&
        "pictureIndex" in payload
      ) {
        state[payload.articleIndex].splice(payload.pictureIndex, 1);
        return [...state];
      } else return state;
    default:
      return state;
  }
};
