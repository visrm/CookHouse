import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    fetching: false,
    allPosts: [],
    communityPosts: [],
    likedPosts: [],
    followingPosts: [],
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setCommunityPosts: (state, action) => {
      state.communityPosts = action.payload;
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setLikedPosts: (state, action) => {
      state.likedPosts = action.payload;
    },
    setFollowingPosts: (state, action) => {
      state.followingPosts = action.payload;
    },
  },
});

export const {
  setLoading,
  setFetching,
  setAllPosts,
  setCommunityPosts,
  setLikedPosts,
  setFollowingPosts,
} = postSlice.actions;
export default postSlice.reducer;
