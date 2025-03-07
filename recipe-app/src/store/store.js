import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/auth.slice";
import recipeReducer from "../features/recipe/recipe.slice"
import cateogoryReducer from "../features/cateogory/cateogory.slice"
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistAuthUserConfig = {
  key: "current-user",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistAuthUserConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recipe: recipeReducer,
    cateogory:cateogoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);