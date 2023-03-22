import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>
    </div>
  );
};

export default Counter;
