import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/store/slices/preferencesSlice";
import contentReducer from "@/store/slices/contentSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import ContentFeed from "./ContentFeed";
import { Article, Recommendation, SocialPost } from "@/types";

jest.mock("@/services/newsApi", () => ({
  fetchArticlesByCategory: jest.fn(),
  searchArticles: jest.fn(),
}));
jest.mock("@/services/tmdbApi", () => ({
  fetchTrendingMovies: jest.fn(),
}));
jest.mock("@/services/mockData", () => ({
  fetchMockSocialPosts: jest.fn(),
}));

import { fetchArticlesByCategory } from "@/services/newsApi";
import { fetchTrendingMovies } from "@/services/tmdbApi";
import { fetchMockSocialPosts } from "@/services/mockData";

const mockArticles: Article[] = [
  {
    id: "test-1",
    title: "Mock Article One",
    description: "First mock description",
    url: "https://example.com/1",
    urlToImage: null,
    publishedAt: "2026-01-01T00:00:00Z",
    source: { name: "Mock Source" },
    category: "technology",
  },
];

const mockMovies: Recommendation[] = [
  {
    id: "tmdb-1",
    title: "Mock Movie",
    description: "A mock movie description",
    imageUrl: null,
    actionLabel: "Watch Now",
  },
];

const mockSocial: SocialPost[] = [
  {
    id: "social-1",
    author: "Mock Author",
    handle: "@mockhandle",
    content: "Mock post content",
    imageUrl: null,
    likes: 10,
    hashtag: "#Mock",
  },
];

function renderWithStore() {
  const store = configureStore({
    reducer: { preferences: preferencesReducer, content: contentReducer, favorites: favoritesReducer },
    preloadedState: {
      preferences: { selectedCategory: "technology", darkMode: false },
    },
  });
  render(
    <Provider store={store}>
      <ContentFeed view="feed" />
    </Provider>
  );
}

describe("ContentFeed integration (unified feed)", () => {
  beforeEach(() => {
    (fetchArticlesByCategory as jest.Mock).mockResolvedValue(mockArticles);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue(mockMovies);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue(mockSocial);
  });

  it("shows a loading spinner, then renders a mixed feed of news, movies, and social posts", async () => {
    renderWithStore();
    await waitFor(() => {
      expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
    });
    expect(screen.getByText("Mock Article One")).toBeInTheDocument();
    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
    expect(screen.getByText("Mock Author")).toBeInTheDocument();
  });

  it("shows an empty-state message when no content is returned", async () => {
    (fetchArticlesByCategory as jest.Mock).mockResolvedValue([]);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue([]);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue([]);
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText(/No content found/i)).toBeInTheDocument();
    });
  });

  it("shows a retry button when the feed fails to load", async () => {
    (fetchArticlesByCategory as jest.Mock).mockRejectedValue(new Error("Network error"));
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });
  });
});