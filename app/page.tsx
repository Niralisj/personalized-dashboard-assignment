"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SettingsPanel from "@/components/SettingsPanel";
import ContentFeed from "@/components/ContentFeed";
import SearchBar from "@/components/SearchBar";
import DarkModeToggle from "@/components/DarkModeToggle";

type View = "feed" | "trending" | "favorites";

export default function Home() {
  const [activeView, setActiveView] = useState<View>("feed");

  return (
    <div className="min-h-screen flex bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <SearchBar />
          <DarkModeToggle />
        </header>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <ContentFeed view={activeView} />
          </div>
          <aside className="w-72 border-l border-gray-200 dark:border-gray-700 p-4 hidden lg:block">
            <SettingsPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}