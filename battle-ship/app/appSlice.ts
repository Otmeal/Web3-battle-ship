import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    userAddress: "",
    isStarted: false,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
  },
});

export const { setUserAddress, setIsStarted } = appSlice.actions;

export default appSlice.reducer;
