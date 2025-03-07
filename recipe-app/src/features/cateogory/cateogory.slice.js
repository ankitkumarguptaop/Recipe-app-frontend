"use client";
import { createSlice } from "@reduxjs/toolkit";
import { listCateogory } from "./cateogory.action";

const initialState = {
  cateogories: [],
  isLoading: false,
  error: null,
};

export const cateogorySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCateogory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCateogory.fulfilled, (state, action) => {
        state.cateogories = action.payload.data;
        state.isLoading = false;
      })
      .addCase(listCateogory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cateogorySlice.reducer;
