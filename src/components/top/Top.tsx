import React from "react";
import "./Top.css";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";

const Top = () => {
  const token = useAppSelector((state) => state.token.access_token);
  const credentials = useAppSelector((state) => state.user);
  return (
    <div className="top-div">
      <div className="top-top">
        <Link to="/" className="top-top">
          <h3 style={{ color: "blueviolet", marginLeft: 20 }}>MM partners</h3>
        </Link>
      </div>
      <Link to="/products" className="top-top">
        <h4> my products</h4>
      </Link>
      <Link to="/marketplace" className="top-top">
        <h4>marketplace</h4>
      </Link>
      <div className="top-bottom">
        {token ? (
          <div className="hello-user">
            hello , {credentials.username?.toUpperCase()}
          </div>
        ) : (
          <Link to="/login">LogIn</Link>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Top;
