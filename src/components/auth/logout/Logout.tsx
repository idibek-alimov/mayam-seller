import React from "react";
import { removeToken } from "../../../store/features/token/tokenSlice";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmitHandle = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitHandle();
        }}
      >
        <span>Are you fucking sure you want to log out!!!!!</span>
        <div>
          <button type="submit">Yes</button>
          <button onClick={() => navigate("/")}>hell no</button>
        </div>
      </form>
    </div>
  );
};

export default Logout;
