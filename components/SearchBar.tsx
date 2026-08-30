"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  loadSearchResults,
  resetContent,
  setSearchQuery,
} from "@/store/slices/contentSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim().length > 0) {
        dispatch(setSearchQuery(input));
        dispatch(resetContent());
        dispatch(loadSearchResults({ query: input, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, dispatch]);

  return (
   <div>
  <label htmlFor="search-input" className="sr-only">Search articles</label>
  <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Search news, movies..."
  className="
    w-full
    rounded-2xl
    border border-zinc-200
    bg-white
    px-4 py-3
    text-sm
    shadow-sm
    outline-none
    transition
    focus:border-blue-500
    focus:ring-4 focus:ring-blue-100
    dark:bg-zinc-900
    dark:border-zinc-700
  "
/>
  <span id="search-hint" className="sr-only">Results update as you type</span>
</div>
  );
}