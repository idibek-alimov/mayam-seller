import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="main-div">
      <div className="main-box">
        <div className="main-top-wrapper">
          <div className="top-part">
            <div className="name">Product cards</div>
            <div>
              <button onClick={() => navigate("/create")}>add product</button>
            </div>
          </div>
          <div className="bottom-part">
            <div>Created</div>
            <div>Draft</div>
          </div>
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Main;
