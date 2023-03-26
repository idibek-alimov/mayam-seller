import axios from "axios";

import { store } from "../store/store";
import { useAppSelector } from "../store/hooks";
//export const url = "https://maryam-backend2.onrender.com";
// export const url = "http://localhost:8080";
export const head = String(
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbWluYSIsInJvbGVzIjpbXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNjcwNjgzOTk1fQ.URcGxuGtFCYt3fFKslvqawWMLL-Nr3jve99SH8uxaOg"
);
const ActivateToken = () => {
  let state = store.getState();
  let token = state.token;
  const access_token = token.access_token;
  const refresh_token = token.refresh_token;

  let custom_headers = access_token
    ? { Authorization: String("Bearer " + access_token) }
    : { Authorization: String("") };

  return axios.create({
    headers: custom_headers,
    baseURL: "http://localhost:8080/api/product",
  });
};
let commons = {
  "Cache-Control": "no-cache, no-store, must-revalidate",

  "Content-Type": ["multipart/form-data", "application/json"],
  // Accept: "application/json",
};
//export default ActivateToken();
//export const url = "https://maryam-backend2.onrender.com";
export const url = "http://localhost:8080";
//export const url = "https://maryam-backend2.onrender.com";
export default function Axios() {
  const access_token = useAppSelector((state) => state.token.access_token);
  let custom_headers = access_token
    ? {
        Authorization: String("Bearer " + access_token),
        common: commons,
      }
    : {
        Authorization: String(""),
        common: commons,
      };
  return axios.create({
    headers: custom_headers,
    baseURL: url,
  });
}
