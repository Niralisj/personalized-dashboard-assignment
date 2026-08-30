"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header/Header";
import SettingsPanel from "@/components/SettingsPanel";
import ContentFeed from "@/components/ContentFeed";
import DarkModeToggle from "@/components/DarkModeToggle";
import FeaturedNews from "@/components/Header/FeaturedNews";

type View = "feed" | "trending" | "favorites";

export default function Home() {
  const [activeView, setActiveView] = useState<View>("feed");

const featuredArticle = {
  id: "featured",
  title: "AI is reshaping software engineering in 2026",
  description:
    "Discover the biggest stories across technology, finance and entertainment in one personalized dashboard.",
  url: "#",
  urlToImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
  publishedAt: new Date().toISOString(),
  source: { name: "Content Hub" },
  category: "technology",
};
  return (
    <div className="min-h-screen flex bg-[#f5f6fb] dark:bg-zinc-950">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Top section */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <Header />
            <DarkModeToggle />
          </div>
          {/* Featured News goes here */}
          <FeaturedNews article={featuredArticle} />

          <ContentFeed view={activeView} />
        </div>
      </main>

      <aside className="w-72 border-l border-zinc-200 dark:border-zinc-800 p-6 hidden xl:block bg-white dark:bg-zinc-900">
        <SettingsPanel />
      </aside>
    </div>
  );
}