import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    allUsers: [],
    allFollowing: [],
    allFollowers: [],
    allNotifications: [],
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllFollowing: (state, action) => {
      state.allFollowing = action.payload;
    },
    setAllFollowers: (state, action) => {
      state.allFollowers = action.payload;
    },
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
  },
});

export const {
  setLoading,
  setAllUsers,
  setAllFollowing,
  setAllFollowers,
  setAllNotifications,
} = userSlice.actions;
export default userSlice.reducer;
