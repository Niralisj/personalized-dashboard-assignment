"use client";
import { Article } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";

function estimateReadingTime(text: string | null): number {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default function ArticleCard({ article }: { article: Article }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((a) => a.id === article.id)
  );

  return (
    <article
      role="article"
      aria-label={`Article: ${article.title}`}
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col"
    >
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{article.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-3 flex-1">
          {article.description}
        </p>
        <span className="text-xs text-gray-400 mb-2">
          {estimateReadingTime(article.description)} min read
        </span>
        <div className="flex items-center justify-between">
          
      <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 dark:text-blue-400"
          >
            Read More
          </a>

          <button
            onClick={() => dispatch(toggleFavorite(article))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dispatch(toggleFavorite(article));
              }
            }}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className="text-lg"
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
}