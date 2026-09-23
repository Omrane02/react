import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Recipe } from "../../types/recipe";

export type FavoriRecipe = Pick<
  Recipe,
  "id" | "name" | "image" | "prepTimeMinutes" | "cookTimeMinutes"
>;

interface FavorisState {
  items: FavoriRecipe[];
}

const initialState: FavorisState = {
  items: [],
};

const favorisSlice = createSlice({
  name: "favoris",
  initialState,
  reducers: {
    toggleFavori: (state, action: PayloadAction<FavoriRecipe>) => {
      const exists = state.items.some((r) => r.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((r) => r.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFavori: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
  },
});

export const { toggleFavori, removeFavori } = favorisSlice.actions;
export default favorisSlice.reducer;