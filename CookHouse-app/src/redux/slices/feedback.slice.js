import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loadingFeedback: false,
    allFeedbacks: [],
  },
  reducers: {
    // actions
    setLoadingFeedback: (state, action) => {
      state.loadingFeedback = action.payload;
    },
    setAllFeedbacks: (state, action) => {
      state.allFeedbacks = action.payload;
    },
  },
});

export const { setLoadingFeedback, setAllFeedbacks } = feedbackSlice.actions;
export default feedbackSlice.reducer;
