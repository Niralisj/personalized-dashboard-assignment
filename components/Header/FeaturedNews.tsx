"use client";

import { Article } from "@/types";
import { ArrowRight } from "lucide-react";

interface FeaturedNewsProps {
  article: Article;
}

export default function FeaturedNews({ article }: FeaturedNewsProps) {
  return (
    <section
      className="relative overflow-hidden rounded-[28px] min-h-[340px] mb-10 group"
      style={{ background: "var(--news)" }}
    >
      {/* Background */}
      <img
        src={article.urlToImage || "https://placehold.co/1200x600"}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40"
      />

      <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(90deg, rgba(5,31,32,.88) 0%, rgba(5,31,32,.55) 45%, rgba(5,31,32,.15) 100%)",
  }}
/>

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white max-w-2xl">
        <span className="mb-5 w-fit rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
          FEATURED NEWS
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight line-clamp-2">
          {article.title}
        </h2>

        <p className="mt-4 text-[15px] text-white/85 leading-7 line-clamp-2 max-w-xl">
          {article.description}
        </p>

        <div className="mt-7 flex items-center gap-4">
          <a
             href={article.url}
            target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105"
             style={{ background: "var(--surface)", color: "var(--news)" }}
           
          >
            Read Story
            <ArrowRight size={16} />
          </a>
          <span className="text-sm text-white/70">{article.source.name}</span>
        </div>
      </div>
    </section>
  );
}