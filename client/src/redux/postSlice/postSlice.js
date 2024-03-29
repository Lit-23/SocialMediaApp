import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: null,
  updatePost: null,
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
    addPostSuccess: (state) => {
      state.postLoading = false;
      state.error = false;
    },

    // getPostList
    getPostListStart: (state) => {
      state.postLoading = true;
    },
    getPostListFailure: (state, action) => {
      state.postLoading = false;
      state.error = action.payload;
    },
    getPostListSuccess: (state, action) => {
      state.postList = action.payload;
      state.postLoading = false;
      state.error = false;
    },

    // update post
    updatePostStart: (state) => {
      state.postLoading = true;
    },
    updatePostFailure: (state, action) => {
      state.postLoading = false;
      state.error = action.payload;
    },
    updatePostSuccess: (state, action) => {
      state.updatePost = action.payload;
      state.postLoading = false;
      state.error = false;
    },

    // delete post
    deletePostStart: (state) => {
      state.postLoading = true;
    },
    deletePostFailure: (state, action) => {
      state.postLoading = false;
      state.error = action.payload;
    },
    deletePostSuccess: (state) => {
      state.postLoading = false;
      state.error = false;
    },
  }
});

export const {
  addPostStart,
  addPostFailure,
  addPostSuccess,
  getPostListStart,
  getPostListFailure,
  getPostListSuccess,
  updatePostStart,
  updatePostFailure,
  updatePostSuccess,
  deletePostStart,
  deletePostFailure,
  deletePostSuccess,
} = postSlice.actions

export default postSlice.reducer