"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCategory } from "@/store/slices/preferencesSlice";
import { Category } from "@/types";

const ALL_CATEGORIES: Category[] = [
  "technology",
  "sports",
  "business",
  "entertainment",
  "health",
  "science",
];

export default function SettingsPanel() {
  const dispatch = useAppDispatch();

  const selected = useAppSelector(
    (state) => state.preferences.selectedCategories
  );

  return (
    <fieldset>
      <legend className="font-semibold mb-3">Select news categories to display</legend>
      <div className="space-y-2">
        {ALL_CATEGORIES.map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer capitalize">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => dispatch(toggleCategory(cat))}
              className="w-4 h-4"
            />
            {cat}
          </label>
        ))}
      </div>
    </fieldset>
  );
}