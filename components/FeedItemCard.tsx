"use client";

import { FeedItem } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Star,
  Play,
  ArrowUpRight,
} from "lucide-react";

export default function FeedItemCard({ item }: { item: FeedItem }) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    item.contentType === "news"
      ? state.favorites.items.some(
          (a) => (a.url && a.url === item.url) || (a.id && a.id === item.id)
        )
      : false
  );

  /* ---------------- NEWS CARD ---------------- */

  if (item.contentType === "news") {
    return (
      <article
        className="mb-5 break-inside-avoid overflow-hidden rounded-[24px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {item.urlToImage && (
          <img
            src={item.urlToImage}
            alt={item.title || "News image"}
            className="h-52 w-full object-cover"
          />
        )}

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white"
              style={{ background: "var(--news)" }}
            >
              NEWS
            </span>

            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(item))}
              aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
              className="rounded-full p-2 transition hover:bg-black/5"
            >
              <Bookmark
                size={18}
                className={
                  isFavorite ? "fill-[#9F2D2D] text-[#9F2D2D]" : "text-zinc-500"
                }
              />
            </button>
          </div>

          <h3 className="font-serif text-2xl leading-tight">
            {item.title}
          </h3>

          <p
            className="mt-3 text-sm leading-6"
            style={{ color: "var(--muted)" }}
          >
            {item.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {item.source?.name || "Unknown Source"}
            </span>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: "var(--news)" }}
            >
              Read
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </article>
    );
  }

  /* ---------------- MOVIE CARD ---------------- */

  if (item.contentType === "recommendation") {
    return (
      <article
        className="mb-5 break-inside-avoid overflow-hidden rounded-[24px] text-white"
        style={{ background: "var(--movie)" }}
      >
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title || "Movie poster"}
            className="h-64 w-full object-cover"
          />
        )}

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-white/70">
              TRENDING MOVIE
            </span>

            <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
              <Star size={13} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{item.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-3xl leading-tight">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-white/80">
            {item.description}
          </p>

          <button
            type="button"
            className="mt-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Play size={14} className="fill-black" />
            {item.actionLabel || "Watch Now"}
          </button>
        </div>
      </article>
    );
  }

  /* ---------------- SOCIAL CARD ---------------- */

    if (item.contentType === "social") {
    return (
      <article
        className="mb-5 break-inside-avoid rounded-[24px] border p-5"
        style={{
          background: "var(--social-bg)",
          borderColor: "var(--social-border)",
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-white font-bold"
            style={{ background: "var(--social)" }}
          >
            {item.author?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h4 className="font-semibold" style={{ color: "var(--foreground)" }}>{item.author}</h4>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{item.handle}</p>
          </div>
        </div>

        <p className="text-sm leading-7" style={{ color: "var(--foreground)" }}>
          {item.content}
        </p>

        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt=""
            className="mt-4 h-48 w-full rounded-2xl object-cover"
          />
        )}

        <div className="mt-4 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "var(--social-tag-bg)",
              color: "var(--social)",
            }}
          >
            {item.hashtag}
          </span>

          <div className="flex items-center gap-4" style={{ color: "var(--muted)" }}>
            <div className="flex items-center gap-1">
              <Heart size={15} className="text-pink-600" />
              <span className="text-sm font-medium">{item.likes ?? 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle size={15} />
              <span className="text-sm">24</span>
            </div>
          </div>
        </div>
      </article>
    );
  }
  return null;
}