import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userList: null,
  otherUser: null,
  authenticated: false,
  loading: false,
  error: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // signup
    signupStart: (state) => {
      state.loading = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },

    // signin
    signinStart: (state) => {
      state.loading = true;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.authenticated = true;
      state.loading = false;
      state.error = false;
    },

    // update
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.authenticated = true;
      state.loading = false;
      state.error = false;
    },

    // signout
    signout: (state) => {
      state.currentUser = null;
      state.authenticated = false;
      state.loading = false;
      state.error = false;
    },

    // get user collection
    getUserListStart: (state) => {
      state.loading = true;
    },
    getUserListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserListSuccess: (state, action) => {
      state.userList = action.payload;
      state.loading = false;
      state.error = false;
    },

    // search user by ID
    searchUserByIDStart: (state) => {
      state.loading = true;
    },
    searchUserByIDFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchUserByIDSuccess: (state, action) => {
      state.otherUser = action.payload;
      state.loading = false;
      state.error = false;
    },
  }
});

export const {
  signupStart,
  signupFailure,
  signupSuccess,
  signinStart,
  signinFailure,
  signinSuccess,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  signout,
  getUserListStart,
  getUserListFailure,
  getUserListSuccess,
  searchUserByIDStart,
  searchUserByIDFailure,
  searchUserByIDSuccess,
} = userSlice.actions

export default userSlice.reducer