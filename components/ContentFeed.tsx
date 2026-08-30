"use client";
import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadArticles, resetContent } from "@/store/slices/contentSlice";
import ArticleCard from "./ArticleCard";

export default function ContentFeed({ view }: { view: "feed" | "trending" | "favorites" }) {
  const dispatch = useAppDispatch();
  const { articles, status, page, hasMore } = useAppSelector((state) => state.content);
  const favorites = useAppSelector((state) => state.favorites.items);
  const selectedCategories = useAppSelector((state) => state.preferences.selectedCategories);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (view === "feed" || view === "trending") {
      dispatch(resetContent());
      dispatch(loadArticles({ categories: selectedCategories, page: 1 }));
    }
  }, [view, selectedCategories, dispatch]);

  const loadMore = useCallback(() => {
    if (status !== "loading" && hasMore) {
      dispatch(loadArticles({ categories: selectedCategories, page }));
    }
  }, [dispatch, status, hasMore, page, selectedCategories]);

  useEffect(() => {
    if (view === "favorites") return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) observerRef.current.observe(currentTrigger);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, view, articles.length]);

  if (view === "favorites") {
    if (favorites.length === 0) return <p className="text-gray-500">No favorites yet.</p>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    );
  }

  if (status === "loading" && articles.length === 0) return <p>Loading...</p>;
  if (status === "failed") return <p className="text-red-500">Failed to load articles.</p>;
  if (articles.length === 0) return <p className="text-gray-500">No articles found.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      <div ref={loadMoreTriggerRef} className="h-10 flex items-center justify-center mt-4">
        {status === "loading" && <p className="text-sm text-gray-500">Loading more...</p>}
        {!hasMore && <p className="text-sm text-gray-400">No more articles.</p>}
      </div>
    </div>
  );
}