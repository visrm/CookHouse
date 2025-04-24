import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "communities",
  initialState: {
    loadingCommunity: false,
    allCommunities: [],
    allUserCommunities: [],
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
    setAllUserCommunities: (state, action) => {
      state.allUserCommunities = action.payload;
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
  setAllUserCommunities,
  setSingleCommunity,
  setSearchedQuery,
} = communitySlice.actions;
export default communitySlice.reducer;
