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
import eventSlice from "./slices/event.slice.js";
import errorSlice from "./slices/error.slice.js";
import feedbackSlice from "./slices/feedback.slice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const appReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  posts: postSlice,
  recipes: recipeSlice,
  communities: communitySlice,
  chats: chatSlice,
  events: eventSlice,
  error: errorSlice,
  feedbacks: feedbackSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
