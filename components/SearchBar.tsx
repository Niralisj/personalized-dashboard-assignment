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
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search articles..."
      className="px-3 py-2 border rounded-md w-64 bg-transparent"
    />
  );
}