"use client";

import { useAppSelector } from "@/store/hooks";
import { FeedItem } from "@/types";
import { Flame, Film } from "lucide-react";

export default function SettingsPanel() {
  const feed = useAppSelector((state) => state.content.feed || []);

  const editorPicks = feed
    .filter((i): i is Extract<FeedItem, { contentType: "news" }> => i.contentType === "news")
    .slice(0, 3);

  const movies = feed
    .filter((i): i is Extract<FeedItem, { contentType: "recommendation" }> => i.contentType === "recommendation")
    .slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Editor Picks */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Flame size={18} style={{ color: "var(--news)" }} />
          <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
            Editor Picks
          </h3>
        </div>

        {editorPicks.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            No articles yet.
          </p>
        ) : (
          <div className="space-y-3">
            {editorPicks.map((article, idx) => (
              <a
                key={article.id || article.url || idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 rounded-xl p-2 transition hover:bg-[var(--surface-secondary)]"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title || "Article thumbnail"}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {article.source?.name}
                  </p>
                  <h4
                    className="line-clamp-2 text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {article.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Movies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Film size={18} style={{ color: "var(--movie)" }} />
          <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
            Trending Movies
          </h3>
        </div>

        {movies.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            No recommendations yet.
          </p>
        ) : (
          <div className="space-y-3">
            {movies.map((movie, idx) => (
              <div
                key={movie.id || idx}
                className="flex gap-3 rounded-xl p-2"
                style={{ background: "var(--surface-secondary)" }}
              >
                {movie.imageUrl && (
                  <img
                    src={movie.imageUrl}
                    alt={movie.title || "Movie poster"}
                    className="h-20 w-14 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {movie.title}
                  </h4>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    ⭐ {movie.rating}
                  </p>
                  <p
                    className="mt-1 text-xs font-medium"
                    style={{ color: "var(--movie)" }}
                  >
                    {movie.actionLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}