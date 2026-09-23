import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavorisState {
  ids: number[];
}
const initialState: FavorisState = {
  ids: [],
 };

   const favorisSlice = createSlice({
     name: "favoris",
      initialState,
  reducers: {
    toggleFavori: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
    },
    removeFavori: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((favId) => favId !== action.payload);
    },
  },
});

export const { toggleFavori, removeFavori } = favorisSlice.actions;
export default favorisSlice.reducer;