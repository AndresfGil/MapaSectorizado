import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    uid: null,
    email: null,
    displayName: null,
    lastname: null,
    age: null,
    photoURL: null,
    password: null,
    errorMessage: null,
  },
  reducers: {

    login: (state, { payload }) => {
      (state.status = "authenticated"),
      (state.uid = payload.uid);
      state.email = payload.email;
      state.errorMessage = null;
    },

    setActiveUser: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.age = payload.age;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.password = payload.password;
      state.uid = payload.uid;
      state.status = "authenticated";
    },

    logout: (state, { payload }) => {
      (state.status = "not-authenticated"),
      (state.uid = null);
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.age = null;
      state.lastname = null;
      state.errorMessage = payload?.errorMessage;
    },

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials, setActiveUser } = authSlice.actions;
