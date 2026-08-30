import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/types";

interface FavoritesState {
  items: Article[];
}

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      const exists = state.items.find((a) => a.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((a) => a.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;