import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../extra/types/Product";
import { act } from "react-dom/test-utils";
import { Article } from "../../../extra/types/Article";
export interface CartArticle extends Article {
  size?: string;
  amount?: number;
  price?: number;
}
interface CartSet {
  cart_products: CartArticle[];
}

const initialState: CartSet = {
  cart_products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let contains = false;
      state.cart_products.map((article) => {
        if (
          article.id === action.payload.id &&
          article.size === action.payload.size
        ) {
          contains = true;
        }
      });
      if (!contains) {
        state.cart_products.push({
          ...action.payload,
          amount: 1,
          price: action.payload.inventories[0].price,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart_products = state.cart_products.filter(
        (article) =>
          action.payload.size != article.size || action.payload.id != article.id
      );
    },
    changeAmount: (state, action) => {
      state.cart_products = state.cart_products.map((item) =>
        item.id == action.payload.id && item.size == action.payload.size
          ? { ...item, amount: action.payload.amount }
          : item
      );
    },
    clearTheCart: (state) => {
      state.cart_products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearTheCart, changeAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
