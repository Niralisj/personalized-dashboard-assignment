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
      ? state.favorites.items.some((a) => a.id === item.id)
      : false
  );

  /* ---------------- NEWS CARD ---------------- */

  if (item.contentType === "news") {
    return (
      <article className="group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300">
        {item.urlToImage && (
          <div className="relative overflow-hidden">
            <img
              src={item.urlToImage}
              alt={item.title}
              className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              News
            </span>
          </div>
        )}

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
            <span>{item.source.name}</span>
            <button
              onClick={() => dispatch(toggleFavorite(item))}
              aria-label="Favorite"
              className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isFavorite ? (
                <Bookmark size={18} className="fill-blue-600 text-blue-600" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>

          <h3 className="text-lg font-bold leading-snug line-clamp-3">
            {item.title}
          </h3>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {item.description}
          </p>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            Read story
            <ArrowUpRight size={15} />
          </a>
        </div>
      </article>
    );
  }

  /* ---------------- MOVIE CARD ---------------- */

  if (item.contentType === "recommendation") {
    return (
      <article className="overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-lg">
        <div className="relative">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-80 w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{item.rating}</span>
          </div>

          <button className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur">
            <Heart size={18} />
          </button>

          <div className="absolute bottom-0 p-5">
            <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold">
              Movie
            </span>

            <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>

            <p className="mt-2 text-sm text-white/80 line-clamp-3">
              {item.description}
            </p>

            <button className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
              <Play size={15} className="fill-black" />
              {item.actionLabel}
            </button>
          </div>
        </div>
      </article>
    );
  }

  /* ---------------- SOCIAL CARD ---------------- */

  return (
    <article className="rounded-3xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
          {item.author.charAt(0)}
        </div>

        <div>
          <h4 className="font-semibold">{item.author}</h4>
          <p className="text-xs text-zinc-500">{item.handle}</p>
        </div>
      </div>

      <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
        {item.content}
      </p>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt=""
          className="mt-4 h-48 w-full rounded-2xl object-cover"
        />
      )}

      <p className="mt-3 text-sm font-medium text-purple-600">
        {item.hashtag}
      </p>

      <div className="mt-4 flex items-center gap-5 text-zinc-500">
        <div className="flex items-center gap-1">
          <Heart size={16} />
          <span className="text-sm">{item.likes}</span>
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={16} />
          <span className="text-sm">24</span>
        </div>
      </div>
    </article>
  );
}