import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    loading: false,
    fetching: false,
    allRecipes: [],
    communityRecipes: [],
    likedRecipes: [],
    followingRecipes: [],
    usersCommunitiesRecipes: [],
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setLikedRecipes: (state, action) => {
      state.likedRecipes = action.payload;
    },
    setAllRecipes: (state, action) => {
      state.allRecipes = action.payload;
    },
    setCommunityRecipes: (state, action) => {
      state.communityRecipes = action.payload;
    },
    setFollowingRecipes: (state, action) => {
      state.followingRecipes = action.payload;
    },
    setUsersCommunitiesRecipes: (state, action) => {
      state.usersCommunitiesRecipes = action.payload;
    },
  },
});

export const {
  setLoading,
  setFetching,
  setAllRecipes,
  setCommunityRecipes,
  setLikedRecipes,
  setFollowingRecipes,
  setUsersCommunitiesRecipes,
} = recipeSlice.actions;
export default recipeSlice.reducer;
