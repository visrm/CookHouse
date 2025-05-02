import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "communities",
  initialState: {
    loadingCommunity: false,
    allCommunities: [],
    allUserCommunities: [],
    singleCommunity: null,
    searchedCommunityQuery: "",
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
    setSearchedCommunityQuery: (state, action) => {
      state.searchedCommunityQuery = action.payload;
    },
  },
});

export const {
  setLoadingCommunity,
  setAllCommunities,
  setAllUserCommunities,
  setSingleCommunity,
  setSearchedCommunityQuery,
} = communitySlice.actions;
export default communitySlice.reducer;
