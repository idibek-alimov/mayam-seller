import React from "react";
import Top from "./top/Top";
import Main from "./main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
// import Create from "./create/Create";
import NewCreate from "./newCreate/Create";
import Profile from "./profile/MyProducts";
//import Update from "./update/Update";
import Create from "./profile/product/create/Create";
import UpdateWrapper from "./profile/product/update/UpdateWrapper";
import MyProducts from "./profile/MyProducts";
import WithoutPictureProducts from "./profile/WithoutPictureProducts";
import DeletedProducts from "./profile/DeletedProducts";
import MainProductPage from "./profile/MainProductPage";
import Marketplace from "./profile/marketplace/Marketpalce";
const Wrapper = () => {
  return (
    <div style={{ backgroundColor: "#d4d4d4", minHeight: 1000 }}>
      <Top />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="products" element={<MainProductPage />}>
          <Route path="without-picture" element={<WithoutPictureProducts />} />
          <Route path="removable" element={<DeletedProducts />} />
          <Route index element={<MyProducts />} />
        </Route>
        <Route path="marketplace" element={<Marketplace />}></Route>
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="testing/" element={<NewCreate />} />
        <Route path="update/:id/" element={<UpdateWrapper />} />
        <Route path="create/" element={<Create />} />
        {/* <Route path="aldcreate/" element={<Create />} /> */}
      </Routes>
    </div>
  );
};

export default Wrapper;
