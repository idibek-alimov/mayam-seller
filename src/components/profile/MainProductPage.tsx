import React from "react";
import "./Profile.css";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MyProducts from "../profile/MyProducts";
import WithoutPictureProducts from "../profile/WithoutPictureProducts";

const MainProductPage = () => {
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location.pathname);
  return (
    <div className="main-div">
      <div className="main-option-list">
        <button
          className="add-product-button"
          onClick={() => navigate("/create")}
        >
          Добавить
        </button>
        <div
          className={
            location.pathname === "/products"
              ? "list-option-span chosen"
              : "list-option-span"
          }
          onClick={() => navigate("")}
        >
          All products
        </div>
        <div
          className={
            location.pathname === "/products/without-picture"
              ? "list-option-span chosen"
              : "list-option-span"
          }
          onClick={() => navigate("without-picture")}
        >
          Without picture
        </div>
        <div
          className={
            location.pathname === "/products/removable"
              ? "list-option-span chosen"
              : "list-option-span"
          }
          onClick={() => navigate("removable")}
        >
          Basket
        </div>
      </div>
      <div className="main-product-list">
        <Outlet />
      </div>
    </div>
  );
};

export default MainProductPage;
