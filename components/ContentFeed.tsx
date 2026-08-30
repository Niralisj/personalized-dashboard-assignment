"use client";
import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUnifiedFeed, loadTrendingFeed, resetContent } from "@/store/slices/contentSlice";
import ArticleCard from "./ArticleCard";
import FeedItemCard from "./FeedItemCard";

export default function ContentFeed({ view }: { view: "feed" | "trending" | "favorites" }) {
  const dispatch = useAppDispatch();
  const { feed, status, page, hasMore } = useAppSelector((state) => state.content);
  const favorites = useAppSelector((state) => state.favorites.items);
  const selectedCategories = useAppSelector((state) => state.preferences.selectedCategories);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (view === "feed") {
      dispatch(resetContent());
      dispatch(loadUnifiedFeed({ categories: selectedCategories, page: 1 }));
    } else if (view === "trending") {
      dispatch(resetContent());
      dispatch(loadTrendingFeed({ categories: selectedCategories, page: 1 }));
    }
  }, [view, selectedCategories, dispatch]);

    const loadMore = useCallback(() => {
    if (status !== "loading" && hasMore) {
      const thunk = view === "trending" ? loadTrendingFeed : loadUnifiedFeed;
      dispatch(thunk({ categories: selectedCategories, page }));
    }
  }, [dispatch, status, hasMore, page, selectedCategories, view]);

  useEffect(() => {
    if (view === "favorites") return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) observerRef.current.observe(currentTrigger);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, view, feed.length]);

  if (view === "favorites") {
    if (favorites.length === 0) {
      return <p className="text-gray-500 text-center py-12">No favorites yet.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    );
  }

  if (status === "loading" && feed.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div role="status" aria-label="Loading feed" className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-3">Failed to load feed.</p>
          <button
          onClick={() => {
            const thunk = view === "trending" ? loadTrendingFeed : loadUnifiedFeed;
            dispatch(thunk({ categories: selectedCategories, page: 1 }));
          }}
          className="px-4 py-2 border rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No content found for the selected categories.</p>
        <p className="text-sm mt-1">Try selecting different categories in Settings.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-5">
  {feed.map((item) => (
    <div
      key={item.id}
      className="mb-5 break-inside-avoid"
    >
      <FeedItemCard item={item} />
    </div>
  ))}
</div>
      <div ref={loadMoreTriggerRef} className="h-10 flex items-center justify-center mt-4">
        {status === "loading" && <p className="text-sm text-gray-500">Loading more...</p>}
        {!hasMore && <p className="text-sm text-gray-400">No more content.</p>}
      </div>
    </div>
  );
}