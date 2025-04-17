import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    fetching: false,
    allPosts: [],
    likedPosts: [],
    followingPosts: [],
    searchedQuery: "",
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setLikedPosts: (state, action) => {
      state.likedPosts = action.payload;
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setFollowingPosts: (state, action) => {
      state.followingPosts = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setLoading,
  setFetching,
  setAllPosts,
  setLikedPosts,
  setFollowingPosts,
  setSearchedQuery
} = postSlice.actions;
export default postSlice.reducer;
