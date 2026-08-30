"use client";

import SearchBar from "../SearchBar";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
      <div>
        <p className="text-sm text-zinc-500">{today}</p>

        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
          Welcome back, Nirali 👋
        </h1>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover personalized news, trending movies, and social conversations.
        </p>
      </div>

      <div className="w-full md:w-[320px]">
        <SearchBar />
      </div>
    </header>
  );
}