import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";

interface PreferencesState {
  selectedCategories: Category[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  selectedCategories: ["technology"],
  darkMode: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter((c) => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleCategory, toggleDarkMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;