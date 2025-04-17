import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Slice imports
import authSlice from "./slices/auth.slice.js";
import userSlice from "./slices/user.slice.js";
import postSlice from "./slices/post.slice.js";
import recipeSlice from "./slices/recipe.slice.js";

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  posts: postSlice,
  recipes: recipeSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
