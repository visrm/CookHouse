import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    allUsers: [],
    allNotifications: [],
    selfCommunity: [],
    selfPosts: [],
    selfRecipes: [],
    singleUser: null,
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
    setSelfCommunity: (state, action) => {
      state.selfCommunity = action.payload;
    },
    setSelfPosts: (state, action) => {
      state.selfPosts = action.payload;
    },
    setSelfRecipes: (state, action)=> {
      state.selfRecipes = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export const {
  setLoading,
  setAllUsers,
  setAllFollowing,
  setAllFollowers,
  setAllNotifications,
  setSelfCommunity,
  setSelfPosts,
  setSelfRecipes,
  setSingleUser,
} = userSlice.actions;
export default userSlice.reducer;
