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
    dispatch(setSearchQuery(input));
    dispatch(resetContent());
    if (input.trim().length > 0) {
      dispatch(loadSearchResults({ query: input, page: 1 }));
    }
    // if input is empty, ContentFeed's own useEffect will now
    // fire (searchQuery is "") and reload the normal feed/trending view
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
  className="w-full rounded-2xl border px-5 py-3 bg-[color:var(--surface)] outline-none focus:ring-2 transition"
  style={{
    borderColor: "var(--border)",
  }}
/>
  <span id="search-hint" className="sr-only">Results update as you type</span>
</div>
  );
}