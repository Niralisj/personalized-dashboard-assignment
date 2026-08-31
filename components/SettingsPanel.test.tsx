import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "@/store/slices/contentSlice";
import SettingsPanel from "./SettingsPanel";
import { FeedItem } from "@/types";

const mockFeed: FeedItem[] = [
  {
    id: "news-1",
    title: "Mock Headline",
    description: "desc",
    url: "https://example.com",
    urlToImage: null,
    publishedAt: "2026-01-01T00:00:00Z",
    source: { name: "Mock Source" },
    category: "technology",
    contentType: "news",
  },
  {
    id: "movie-1",
    title: "Mock Movie",
    description: "desc",
    imageUrl: null,
    actionLabel: "Watch Now",
    contentType: "recommendation",
  },
];

function renderWithStore(feed: FeedItem[] = []) {
  const store = configureStore({
    reducer: { content: contentReducer },
    preloadedState: {
      content: {
        articles: [],
        feed,
        page: 1,
        status: "idle",
        error: null,
        hasMore: true,
        searchQuery: "",
      },
    },
  });
  render(
    <Provider store={store}>
      <SettingsPanel />
    </Provider>
  );
  return store;
}

describe("SettingsPanel", () => {
  it("shows an empty state when there is no feed data yet", () => {
    renderWithStore([]);
    expect(screen.getByText(/No articles yet/i)).toBeInTheDocument();
    expect(screen.getByText(/No recommendations yet/i)).toBeInTheDocument();
  });

  it("renders a news item under Editor Picks", () => {
    renderWithStore(mockFeed);
    expect(screen.getByText("Mock Headline")).toBeInTheDocument();
  });

  it("renders a movie item under Trending Movies", () => {
    renderWithStore(mockFeed);
    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
  });
});