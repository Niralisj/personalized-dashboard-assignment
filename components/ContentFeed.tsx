"use client";
import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUnifiedFeed, loadTrendingFeed, loadSearchResults, resetContent } from "@/store/slices/contentSlice";
import ArticleCard from "./ArticleCard";
import FeedItemCard from "./FeedItemCard";

export default function ContentFeed({ view }: { view: "feed" | "trending" | "favorites" }) {
  const dispatch = useAppDispatch();
  const { feed, status, page, hasMore, searchQuery } = useAppSelector((state) => state.content);
  const favorites = useAppSelector((state) => state.favorites.items);
  const selectedCategory = useAppSelector((state) => state.preferences.selectedCategory);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) return; // don't clobber active search
    if (view === "feed") {
      dispatch(resetContent());
      dispatch(loadUnifiedFeed({ category: selectedCategory, page: 1 }));
    } else if (view === "trending") {
      dispatch(resetContent());
      dispatch(loadTrendingFeed({ category: selectedCategory, page: 1 }));
    }
  }, [view, selectedCategory, dispatch, searchQuery]);

  const loadMore = useCallback(() => {
    if (status !== "loading" && hasMore) {
      if (searchQuery.trim().length > 0) {
        dispatch(loadSearchResults({ query: searchQuery, page }));
      } else {
        const thunk = view === "trending" ? loadTrendingFeed : loadUnifiedFeed;
        dispatch(thunk({ category: selectedCategory, page }));
      }
    }
  }, [dispatch, status, hasMore, page, selectedCategory, view, searchQuery]);

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
      <div className="columns-1 md:columns-2 xl:columns-3 gap-5 space-y-5">
        {favorites.map((item) => (
          <FeedItemCard key={`${item.contentType}-${item.id}`} item={item} />
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
            dispatch(thunk({ category: selectedCategory, page: 1 }));
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
        <p>No content found for the selected category.</p>
        <p className="text-sm mt-1">Try a different category above.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-5">
        {feed.map((item) => (
          <div key={item.id} className="mb-5 break-inside-avoid">
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