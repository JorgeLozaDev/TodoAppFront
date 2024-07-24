import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        credentials: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userDetails = (state) => state.user;
export default userSlice.reducer;
