"use client";

import {
  Newspaper,
  Flame,
  Heart,
  Settings,
  Sparkles,
} from "lucide-react";

type View = "feed" | "trending" | "favorites";

interface SidebarProps {
  activeView: View;
  onChangeView: (view: View) => void;
}

const MENU_ITEMS = [
  { key: "feed", label: "Feed", icon: Newspaper },
  { key: "trending", label: "Trending", icon: Flame },
  { key: "favorites", label: "Favorites", icon: Heart },
] as const;

export default function Sidebar({
  activeView,
  onChangeView,
}: SidebarProps) {
  return (
    <aside
      className="
        hidden md:flex
        w-60
        min-h-screen
        bg-[#f8f8fc]
        dark:bg-zinc-900
        border-r border-[#e8e8f0]
        dark:border-zinc-800
        flex-col
        font-[Inter,sans-serif]
      "
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-8 border-b border-[#e8e8f0] dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6674ca] flex items-center justify-center">
            <Sparkles
              size={16}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          <div>
            <p className="text-[13px] font-bold tracking-wide text-[#5968bd] dark:text-blue-300">
              logo
            </p>
            <p className="text-[10px] text-zinc-500">
              text
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-8 flex-1">
        {/* MENU */}
        <p className="px-5 mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8f92a3]">
          MENU
        </p>

        <nav className="space-y-1.5">
          {MENU_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = activeView === key;

            return (
              <button
                key={key}
                onClick={() => onChangeView(key)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  w-full flex items-center gap-3 px-5 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${
                    isActive
                      ? "bg-[#e7e9f7] text-[#6574ce] dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-[#8d90a1] hover:bg-[#f0f0f6] dark:hover:bg-zinc-800"
                  }
                `}
              >
                <Icon
                  size={17}
                  strokeWidth={2}
                  className={
                    isActive
                      ? "text-[#6574ce] dark:text-blue-300"
                      : "text-[#b9bbcf]"
                  }
                />

                <span className="text-[14px] font-medium">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* OTHERS */}
        <p className="px-5 mt-9 mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8f92a3]">
          OTHERS
        </p>

        <button
          className="
            w-full flex items-center gap-3 px-5 py-3 rounded-lg
            text-[#8d90a1] hover:bg-[#f0f0f6]
            dark:hover:bg-zinc-800 transition-all text-left
          "
        >
          <Settings
            size={17}
            strokeWidth={2}
            className="text-[#b9bbcf]"
          />
          <span className="text-[14px] font-medium">Settings</span>
        </button>
      </div>

    
          

    </aside>
  );
}