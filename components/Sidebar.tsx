"use client";

type View = "feed" | "trending" | "favorites";

interface SidebarProps {
  activeView: View;
  onChangeView: (view: View) => void;
}

const NAV_ITEMS: { key: View; label: string }[] = [
  { key: "feed", label: "Feed" },
  { key: "trending", label: "Trending" },
  { key: "favorites", label: "Favorites" },
];

export default function Sidebar({
  activeView,
  onChangeView,
}: SidebarProps) {
  return (
    <nav
      aria-label="Dashboard sections"
      className="w-48 border-r border-gray-200 dark:border-gray-700 p-4 hidden md:block"
    >
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => onChangeView(item.key)}
              aria-current={activeView === item.key ? "page" : undefined}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeView === item.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}