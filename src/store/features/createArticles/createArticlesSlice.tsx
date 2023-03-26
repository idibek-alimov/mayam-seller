import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../extra/types/Product";
import { act } from "react-dom/test-utils";
import { Article } from "../../../extra/types/Article";
import ArticleCreateProp from "../../../extra/types/ArticleCreateProp";
import { emptyArticle } from "../../../extra/types/ArticleCreateProp";

let initialState: ArticleCreateProp[] = [...emptyArticle];

export const createArticleSlice = createSlice({
  name: "createArticle",
  initialState,
  reducers: {
    addColors: (state, action) => {
      console.log(state[0].color);
      state[0].color = ["hello", "hi"];
      console.log(state[0].color);
      console.log("reducer after");
      console.log("this is state");
      console.log(state);
    },
  },
});

export const { addColors } = createArticleSlice.actions;
export default createArticleSlice.reducer;
