import React, { createContext, useContext } from "react";
import { Article } from "../../../../extra/types/Article";
import {
  ProductCreateType,
  emptyProductCreate,
} from "../../../../extra/types/create/ProductCreateType";
import {
  ArticleCreateType,
  emptyArticleType,
} from "../../../../extra/types/create/ArticleCreateType";

export type GlobalContent = {
  product: ProductCreateType;
  articles: ArticleCreateType[];
  pictures: File[][];
  productDispatch: React.Dispatch<any>;
  articleDispatch: React.Dispatch<any>;
  picturesDispatch: React.Dispatch<any>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  product: emptyProductCreate,
  articles: [emptyArticleType],
  pictures: [],
  productDispatch: () => null,
  articleDispatch: () => null,
  picturesDispatch: () => null,
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export type ArticleIndexContentType = {
  articleIndex: number;
  setArticleIndex: React.Dispatch<React.SetStateAction<any>>;
};

export const ArticleIndexContext = createContext<ArticleIndexContentType>({
  articleIndex: 0,
  setArticleIndex: () => null,
});

export const useArticleIndexContext = () => useContext(ArticleIndexContext);
