"use client";

import SearchBar from "../SearchBar";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left */}
        <div>
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--news)" }}
          >
            {today}
          </p>

          <h1 className="font-serif text-5xl font-semibold leading-none tracking-tight">
            Welcome back, Nirali
          </h1>

          <p
            className="mt-3 text-lg max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            Your personalized space for breaking news, trending movies, and
            social conversations.
          </p>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[340px]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}