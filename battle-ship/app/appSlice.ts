import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    userAddress: "",
    web3: null,
    contract: null,
    networkId: null,
    loading: true,
    error: false,
    errorMessage: "",
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setWeb3: (state, action) => {
      state.web3 = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setUserAddress,
  setWeb3,
  setContract,
  setNetworkId,
  setLoading,
  setError,
  setErrorMessage,
} = appSlice.actions;

export default appSlice.reducer;
