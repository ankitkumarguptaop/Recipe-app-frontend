import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createRecipeService,
  listRecipeService,
} from "../../services/recipe.service";
import { CREATE_RECIPE, LIST_RECIPE } from "./recipe.type";

export const listRecipe = createAsyncThunk(LIST_RECIPE, async (payload) => {
  const res = await listRecipeService(payload);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const createRecipe = createAsyncThunk(CREATE_RECIPE, async (payload) => {
  const res = await createRecipeService(payload);
  const data = res.data;
  console.log("res data", data);
  return res;
});

