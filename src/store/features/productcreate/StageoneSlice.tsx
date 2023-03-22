import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCreateStageOne } from "../../../extra/types/ProductCreateStageOne";

const initialState: ProductCreateStageOne = {
  name: "",
  description: "",
  price: 0,
};

export const StageOneSlice = createSlice({
  name: "StageOne",
  initialState,
  reducers: {
    add: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.price = action.payload.price;
    },
    clean: (state) => {
      state = { name: "", description: "", price: 0 };
    },
  },
});

export const { add, clean } = StageOneSlice.actions;
export default StageOneSlice.reducer;
