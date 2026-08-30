"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/preferencesSlice";

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-3 py-2 border rounded-md"
      aria-label="Toggle dark mode"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}