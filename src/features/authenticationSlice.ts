import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    user: {} as User | null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("userId", action.payload.uid);
    },
    handleLogoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, handleLogoutUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
