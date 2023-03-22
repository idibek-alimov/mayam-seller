import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCreateStageOne } from "../../../extra/types/ProductCreateStageOne";
import { ProductCreateStageTwo } from "../../../extra/types/ProductCreateStageTwo";
const initialState: ProductCreateStageTwo[] = [];

export const StageTwoSlice = createSlice({
  name: "StageTwo",
  initialState,
  reducers: {
    addinventory: (state, action) => {
      let payload: ProductCreateStageTwo[] = action.payload;
      state = [];
      payload.map((size) => {
        state.push(size);
      });
    },
    clean: (state) => {
      state = [];
    },
  },
});

export const { addinventory, clean } = StageTwoSlice.actions;
export default StageTwoSlice.reducer;
