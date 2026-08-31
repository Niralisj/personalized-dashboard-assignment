"use client";

import { useState } from "react";

import { useAppSelector } from "@/store/hooks";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header/Header";
import FeaturedNews from "@/components/Header/FeaturedNews";
import CategoryChips from "@/components/Header/CategoryChips";
import ContentFeed from "@/components/ContentFeed";
import SettingsPanel from "@/components/SettingsPanel";
import DarkModeToggle from "@/components/DarkModeToggle";

type View = "feed" | "trending" | "favorites";

export default function Home() {
  const [activeView, setActiveView] = useState<View>("feed");

  const feed = useAppSelector((state) => state.content.feed);

  const featuredArticle = feed.find(
    (item): item is Extract<typeof feed[number], { contentType: "news" }> =>
      item.contentType === "news"
  );

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />

      <main className="flex-1 flex flex-col">

      
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <Header />
            <DarkModeToggle />
          </div>

          {/* Only show on Feed */}
          {activeView === "feed" && (
          <>
          {featuredArticle && <FeaturedNews article={featuredArticle} />}
           <CategoryChips />
            </>
           )}

          {/* Feed / Trending / Favorites */}
          <ContentFeed view={activeView} />
        </div>
      </main>

        <aside className="hidden xl:block w-72 border-l p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <SettingsPanel />
      </aside>
    </div>
  );
}