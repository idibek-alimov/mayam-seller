import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../extra/types/User";

const initialState: User = {
  id: null,
  username: undefined,
  name: "",
  roles: [],
};

export const userSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
    },
    removeUser: (state) => {
      state.id = null;
      state.username = undefined;
      state.name = "";
      state.roles = [];
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
