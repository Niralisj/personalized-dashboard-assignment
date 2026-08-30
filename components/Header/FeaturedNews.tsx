"use client";

import { Article } from "@/types";
import { ArrowRight } from "lucide-react";

interface FeaturedNewsProps {
  article: Article;
}

export default function FeaturedNews({ article }: FeaturedNewsProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl h-[320px] mb-8 group">
      {/* Background image */}
      <img
        src={article.urlToImage || "https://placehold.co/1200x600"}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white max-w-xl">
        <span className="mb-4 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          ✨ Featured Story
        </span>

        <h2 className="text-3xl font-bold leading-tight line-clamp-3">
          {article.title}
        </h2>

        <p className="mt-3 text-sm text-white/80 line-clamp-2">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100"
        >
          Read Article
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}