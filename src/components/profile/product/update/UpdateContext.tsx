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
  oldPics: number[][];
  productDispatch: React.Dispatch<any>;
  articleDispatch: React.Dispatch<any>;
  picturesDispatch: React.Dispatch<any>;
  oldPicsDispatch: React.Dispatch<any>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  product: emptyProductCreate,
  articles: [emptyArticleType],
  pictures: [],
  oldPics: [[]],
  productDispatch: () => null,
  articleDispatch: () => null,
  picturesDispatch: () => null,
  oldPicsDispatch: () => null,
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

//export const useGlobalContext = () => useContext(MyGlobalContext);

export type WrapperType = {
  wProduct: ProductCreateType;
  wArticles: ArticleCreateType[];
  wOldPics: number[][];
  //setOldPics: React.Dispatch<React.SetStateAction<any>>;
};

export const WrapperContext = createContext<WrapperType>({
  wProduct: emptyProductCreate,
  wArticles: [emptyArticleType],
  wOldPics: [[]],
  //setOldPics: () => null,
});

export const useWrapperContext = () => useContext(WrapperContext);
