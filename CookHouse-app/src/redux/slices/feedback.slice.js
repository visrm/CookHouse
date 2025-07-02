import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loadingFeedback: false,
    allFeedbacks: [],
    singleFeedback: null,
  },
  reducers: {
    // actions
    setLoadingFeedback: (state, action) => {
      state.loadingFeedback = action.payload;
    },
    setAllFeedbacks: (state, action) => {
      state.allFeedbacks = action.payload;
    },
    setSingleFeedback: (state, action) => {
      state.singleFeedback = action.payload;
    },
  },
});

export const { setLoadingFeedback, setAllFeedbacks, setSingleFeedback } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;