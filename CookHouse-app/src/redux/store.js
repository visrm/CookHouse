import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slice imports
import authSlice from "./slices/auth.slice.js";
import userSlice from "./slices/user.slice.js";
import postSlice from "./slices/post.slice.js";
import recipeSlice from "./slices/recipe.slice.js";
import communitySlice from "./slices/community.slice.js";
import chatSlice from "./slices/chat.slice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  posts: postSlice,
  recipes: recipeSlice,
  communities: communitySlice,
  chats: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
