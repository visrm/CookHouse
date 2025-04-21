import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "communities",
  initialState: {
    loadingCommunity: false,
    allCommunities: [],
    singleCommunity: null,
    searchedQuery: "",
  },
  reducers: {
    // actions
    setLoadingCommunity: (state, action) => {
      state.loadingCommunity = action.payload;
    },
    setAllCommunities: (state, action) => {
      state.allCommunities = action.payload;
    },
    setSingleCommunity: (state, action) => {
      state.singleCommunity = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setLoadingCommunity,
  setAllCommunities,
  setSingleCommunity,
  setSearchedQuery,
} = communitySlice.actions;
export default communitySlice.reducer;
