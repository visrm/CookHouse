import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    loading: false,
    fetching: false,
    allRecipes: [],
    likedRecipes: [],
    followingRecipes: [],
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
    setFollowingRecipes: (state, action) => {
      state.followingRecipes = action.payload;
    },
  },
});

export const {
  setLoading,
  setFetching,
  setAllRecipes,
  setLikedRecipes,
  setFollowingRecipes,
} = recipeSlice.actions;
export default recipeSlice.reducer;
