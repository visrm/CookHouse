import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loadingEvent: false,
    allEvents: [],
    communityEvents: [],
    usersCommunitiesEvents: [],
  },
  reducers: {
    // actions
    setLoadingEvent: (state, action) => {
      state.loadingEvent = action.payload;
    },
    setCommunityEvents: (state, action) => {
      state.communityEvents = action.payload;
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    setUsersCommunitiesEvents: (state, action) => {
      state.usersCommunitiesEvents = action.payload;
    },
  },
});

export const {
  setLoadingEvent,
  setAllEvents,
  setCommunityEvents,
  setUsersCommunitiesEvents,
} = eventSlice.actions;
export default eventSlice.reducer;
