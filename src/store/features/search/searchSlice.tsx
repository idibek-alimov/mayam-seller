import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  text: string;
}
const initialState: SearchState = {
  text: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    add: (state, action) => {
      state.text = action.payload.text;
    },
  },
});

export const { add } = searchSlice.actions;
export default searchSlice.reducer;
