"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, ALL_CATEGORIES } from "@/store/slices/preferencesSlice";

export default function CategoryChips() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.preferences.selectedCategory
  );

  return (
    <div className="flex gap-2 overflow-x-auto pb- mb-6 scrollbar-hide">
      {ALL_CATEGORIES.map((cat) => {
        const active = selectedCategory === cat;

          return (
          <button
            key={cat}
            onClick={() => dispatch(setCategory(cat))}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active
                ? "text-white"
                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
            style={
              active
                ? {
                    background: "var(--news)",
                    boxShadow: "0 0 0 2px #FFD700, 0 0 14px 2px rgba(255, 215, 0, 0.65)",
                  }
                : undefined
            }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        );
      })}
    </div>
  );
}