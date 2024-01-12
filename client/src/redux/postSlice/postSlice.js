import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  loading: false,
  error: false
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // addpost
    addPostStart: (state) => {
      state.loading = true;
    },
    addPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPostSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
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