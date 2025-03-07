import { createSlice } from "@reduxjs/toolkit";
import { createRecipe, listRecipe } from "./recipe.action";

const initialState = {
  recipes: [],
  page: 1,
  isLoading: false,
  error: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(listRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
