"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/preferencesSlice";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", Boolean(darkMode));
  }, [darkMode]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label="Toggle theme"
      className="relative flex h-9 w-16 items-center rounded-full border border-zinc-200 bg-zinc-100 p-1 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-zinc-950 ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <Sun size={14} className="text-amber-400" />
        ) : (
          <Moon size={14} className="text-zinc-600" />
        )}
      </div>
    </button>
  );
}