'use client'
import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./auth.action";

import Cookies from "js-cookie";
import {  redirect } from "next/navigation";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
    logout: (state, action) => {
      state.currentUser = null;
      redirect('/');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.user;
        Cookies.set("jwt", action.payload.data.user.token, {
          expires: 7,
          secure: true,
        });
        state.isLoading = false;

      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
