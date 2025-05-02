import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loadingPost: false,
    allPosts: [],
    communityPosts: [],
    likedPosts: [],
    followingPosts: [],
    usersCommunitiesPosts: [],
  },
  reducers: {
    // actions
    setLoadingPost: (state, action) => {
      state.loadingPost = action.payload;
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
    setUsersCommunitiesPosts: (state, action) => {
      state.usersCommunitiesPosts = action.payload;
    },
  },
});

export const {
  setLoadingPost,
  setAllPosts,
  setCommunityPosts,
  setLikedPosts,
  setFollowingPosts,
  setUsersCommunitiesPosts,
} = postSlice.actions;
export default postSlice.reducer;
