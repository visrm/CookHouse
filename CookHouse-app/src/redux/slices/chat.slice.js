import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loadingMessages: false,
    singleChatMessages: [],
    selectedConversation: null,
  },
  reducers: {
    // actions
    setLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload;
    },
    setSingleChatMessages: (state, action) => {
      state.singleChatMessages = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const {
  setLoadingMessages,
  setSingleChatMessages,
  setSelectedConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
