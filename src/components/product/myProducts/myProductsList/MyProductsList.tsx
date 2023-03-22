import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
const MyProductsList = () => {
  const access_token = useAppSelector((state) => state.token.access_token);
  ///////////////////////////////////////////////////

  let custom_headers = access_token
    ? { Authorization: String("Bearer " + access_token) }
    : { Authorization: String("") };

  const axioss = axios.create({
    headers: custom_headers,
    baseURL: "http://localhost:8080/api/product",
  });

  ///////////////////////////////

  return <div>MyProductsList</div>;
};

export default MyProductsList;
