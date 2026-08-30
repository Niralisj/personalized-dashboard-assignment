"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadArticles,
  resetContent,
} from "@/store/slices/contentSlice";
import ArticleCard from "./ArticleCard";

export default function ContentFeed({
  view,
}: {
  view: "feed" | "trending" | "favorites";
}) {
  const dispatch = useAppDispatch();

  const { articles, status, page } = useAppSelector(
    (state) => state.content
  );

  const favorites = useAppSelector((state) => state.favorites.items);

  const selectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories
  );

  useEffect(() => {
    if (view === "feed" || view === "trending") {
      dispatch(resetContent());
      dispatch(loadArticles({ categories: selectedCategories, page: 1 }));
    }
  }, [view, selectedCategories, dispatch]);

  if (view === "favorites") {
    if (favorites.length === 0)
      return <p className="text-gray-500">No favorites yet.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    );
  }

  if (status === "loading" && articles.length === 0) {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Failed to load articles.</p>;
  }

  if (articles.length === 0) {
    return <p className="text-gray-500">No articles found.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

      <button
        onClick={() =>
          dispatch(loadArticles({ categories: selectedCategories, page }))
        }
        disabled={status === "loading"}
        className="mt-4 w-full py-2 border rounded-md disabled:opacity-50"
      >
        {status === "loading" ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}