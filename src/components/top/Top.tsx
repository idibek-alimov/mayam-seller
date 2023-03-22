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
          <h2>maryam partners</h2>
        </Link>
      </div>
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
