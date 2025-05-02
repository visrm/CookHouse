import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    loadingRecipe: false,
    fetching: false,
    allRecipes: [],
    communityRecipes: [],
    likedRecipes: [],
    followingRecipes: [],
    usersCommunitiesRecipes: [],
    searchedRecipeQuery: "",
  },
  reducers: {
    // actions
    setLoadingRecipe: (state, action) => {
      state.loadingRecipe = action.payload;
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
    setSearchedRecipeQuery: (state, action) => {
      state.searchedRecipeQuery = action.payload;
    },
  },
});

export const {
  setLoadingRecipe,
  setAllRecipes,
  setCommunityRecipes,
  setLikedRecipes,
  setFollowingRecipes,
  setUsersCommunitiesRecipes,
  setSearchedRecipeQuery
} = recipeSlice.actions;
export default recipeSlice.reducer;
