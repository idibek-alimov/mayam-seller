import React from "react";
import Top from "./top/Top";
import Main from "./main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
import Create from "./create/Create";
import NewCreate from "./newCreate/Create";
import Profile from "./profile/Profile";
const Wrapper = () => {
  return (
    <div>
      <Top />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="create/" element={<Create />} />
        <Route path="newcreate/" element={<NewCreate />} />
      </Routes>
    </div>
  );
};

export default Wrapper;
