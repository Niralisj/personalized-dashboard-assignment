import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";

export const ALL_CATEGORIES: Category[] = [
  "technology",
  "sports",
  "business",
  "entertainment",
  "health",
  "science",
];

interface PreferencesState {
  selectedCategory: Category | null; // null = show all categories
  darkMode: boolean;
}

const initialState: PreferencesState = {
  selectedCategory: null,
  darkMode: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      // clicking the already-active chip clears the filter back to "all"
      state.selectedCategory =
        state.selectedCategory === action.payload ? null : action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setCategory, toggleDarkMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;