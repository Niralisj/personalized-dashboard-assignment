"use client";

import {
  Star,
  Newspaper,
  Flame,
  Heart,
  
} from "lucide-react";

type View = "feed" | "trending" | "favorites";

interface SidebarProps {
  activeView: View;
  onChangeView: (view: View) => void;
}

const MENU_ITEMS = [
  { key: "feed", label: "Daily Feed", icon: Newspaper },
  { key: "trending", label: "Trending", icon: Flame },
  { key: "favorites", label: "Favorites", icon: Heart },
] as const;

export default function Sidebar({
  activeView,
  onChangeView,
}: SidebarProps) {
  return (
    <aside
      className="hidden md:flex w-[250px] min-h-screen flex-col border-r"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="px-7 py-7 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--news)" }}
          >
            <Star size={20} className="text-white fill-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight"> logo</h1>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
             Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 pt-8 flex-1">
        <p
          className="text-[11px] uppercase tracking-[0.18em] mb-4 font-semibold"
          style={{ color: "var(--muted)" }}
        >
          Explore
        </p>

        <nav className="space-y-2">
          {MENU_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = activeView === key;

            return (
              <button
                key={key}
                onClick={() => onChangeView(key)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left"
                style={
                  active
                    ? {
                        background: "var(--news)",
                        color: "#fff",
                      }
                    : {
                        color: "var(--text)",
                      }
                }
              >
                <Icon
                  size={18}
                  className={active ? "text-white" : ""}
                />

                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: "var(--border)" }}
        />


       
      </div>

      {/* Bottom */}
      <div
        className="p-5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--surface-secondary)" }}
        >
          <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
               Today&apos;s Pick
            </p>
          <h3 className="font-semibold leading-snug">
            AI & Technology
          </h3>
        </div>
      </div>
    </aside>
  );
}