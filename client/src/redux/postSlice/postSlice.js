import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  postLoading: false,
  error: false
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // addpost
    addPostStart: (state) => {
      state.postLoading = true;
    },
    addPostFailure: (state, action) => {
      state.postLoading = false;
      state.error = action.payload;
    },
    addPostSuccess: (state, action) => {
      state.post = action.payload;
      state.postLoading = false;
      state.error = false;
    },
  }
});

export const {
  addPostStart,
  addPostFailure,
  addPostSuccess,
} = postSlice.actions

export default postSlice.reducer