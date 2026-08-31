import contentReducer, {
  loadUnifiedFeed,
  loadTrendingFeed,
  loadSearchResults,
  resetContent,
  setSearchQuery,
} from "./contentSlice";
import { fetchArticlesByCategory, searchArticles } from "@/services/newsApi";
import { fetchTrendingMovies, searchMovies } from "@/services/tmdbApi";
import { fetchMockSocialPosts, searchMockSocialPosts } from "@/services/mockData";
import { configureStore } from "@reduxjs/toolkit";
import { Article, Recommendation, SocialPost } from "@/types";

jest.mock("@/services/newsApi", () => ({
  fetchArticlesByCategory: jest.fn(),
  searchArticles: jest.fn(),
}));
jest.mock("@/services/tmdbApi", () => ({
  fetchTrendingMovies: jest.fn(),
  searchMovies: jest.fn(),
}));
jest.mock("@/services/mockData", () => ({
  fetchMockSocialPosts: jest.fn(),
  searchMockSocialPosts: jest.fn(),
}));

const mockArticle: Article = {
  id: "news-1",
  title: "Test Article",
  description: "desc",
  url: "https://example.com",
  urlToImage: null,
  publishedAt: "2026-01-01T00:00:00Z",
  source: { name: "Test Source" },
  category: "technology",
};

const mockMovie: Recommendation = {
  id: "tmdb-1",
  title: "Test Movie",
  description: "desc",
  imageUrl: null,
  actionLabel: "Watch Now",
};

const mockPost: SocialPost = {
  id: "social-1",
  author: "Test Author",
  handle: "@test",
  content: "test content",
  imageUrl: null,
  likes: 10,
  hashtag: "#Test",
};

function makeStore() {
  return configureStore({ reducer: { content: contentReducer } });
}

const initialState = {
  articles: [],
  feed: [],
  page: 1,
  status: "idle" as const,
  error: null,
  hasMore: true,
  searchQuery: "",
};

describe("contentSlice reducers", () => {
  it("resetContent clears feed, articles, and pagination", () => {
    const dirtyState = {
      ...initialState,
      feed: [{ ...mockArticle, contentType: "news" as const }],
      articles: [mockArticle],
      page: 3,
      hasMore: false,
      error: "some error",
    };
    const newState = contentReducer(dirtyState, resetContent());
    expect(newState.feed).toEqual([]);
    expect(newState.articles).toEqual([]);
    expect(newState.page).toBe(1);
    expect(newState.hasMore).toBe(true);
    expect(newState.error).toBeNull();
  });

  it("setSearchQuery updates searchQuery", () => {
    const newState = contentReducer(initialState, setSearchQuery("batman"));
    expect(newState.searchQuery).toBe("batman");
  });
});

describe("loadUnifiedFeed thunk", () => {
  beforeEach(() => jest.clearAllMocks());

  it("sets status to loading while pending", () => {
    const action = { type: loadUnifiedFeed.pending.type };
    const newState = contentReducer(initialState, action);
    expect(newState.status).toBe("loading");
  });

  it("merges news, movies, and social into feed on success (page 1)", async () => {
    (fetchArticlesByCategory as jest.Mock).mockResolvedValue([mockArticle]);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue([mockMovie]);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue([mockPost]);

    const store = makeStore();
    await store.dispatch(loadUnifiedFeed({ category: "technology", page: 1 }));
    const state = store.getState().content;

    expect(state.status).toBe("succeeded");
    expect(state.feed).toHaveLength(3);
    expect(state.feed.some((i) => i.contentType === "news")).toBe(true);
    expect(state.feed.some((i) => i.contentType === "recommendation")).toBe(true);
    expect(state.feed.some((i) => i.contentType === "social")).toBe(true);
    expect(state.page).toBe(2);
  });

  it("skips movies and social on page > 1, appends news only", async () => {
    (fetchArticlesByCategory as jest.Mock).mockResolvedValue([mockArticle]);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue([]);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue([]);

    const store = makeStore();
    await store.dispatch(loadUnifiedFeed({ category: "technology", page: 2 }));
    const state = store.getState().content;

    expect(fetchTrendingMovies).not.toHaveBeenCalled();
    expect(fetchMockSocialPosts).not.toHaveBeenCalled();
    expect(state.feed).toHaveLength(1);
  });

  it("sets status to failed and stores error message on rejection", async () => {
    (fetchArticlesByCategory as jest.Mock).mockRejectedValue(new Error("API down"));

    const store = makeStore();
    await store.dispatch(loadUnifiedFeed({ category: "technology", page: 1 }));
    const state = store.getState().content;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("API down");
  });

  it("sets hasMore to false when no news items come back", async () => {
    (fetchArticlesByCategory as jest.Mock).mockResolvedValue([]);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue([mockMovie]);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue([mockPost]);

    const store = makeStore();
    await store.dispatch(loadUnifiedFeed({ category: "technology", page: 1 }));
    expect(store.getState().content.hasMore).toBe(false);
  });
});

describe("loadTrendingFeed thunk", () => {
  beforeEach(() => jest.clearAllMocks());

  it("sets status to loading while pending", () => {
    const action = { type: loadTrendingFeed.pending.type };
    const newState = contentReducer(initialState, action);
    expect(newState.status).toBe("loading");
  });

  it("sorts social posts by likes descending among equal-weight items", async () => {
    const lowLikes: SocialPost = { ...mockPost, id: "social-low", likes: 10 };
    const highLikes: SocialPost = { ...mockPost, id: "social-high", likes: 5000 };

    (fetchArticlesByCategory as jest.Mock).mockResolvedValue([]);
    (fetchTrendingMovies as jest.Mock).mockResolvedValue([]);
    (fetchMockSocialPosts as jest.Mock).mockResolvedValue([lowLikes, highLikes]);

    const store = makeStore();
    await store.dispatch(loadTrendingFeed({ category: "technology", page: 1 }));
    const feed = store.getState().content.feed;

    const highIndex = feed.findIndex((i) => i.id === "social-high");
    const lowIndex = feed.findIndex((i) => i.id === "social-low");
    expect(highIndex).toBeLessThan(lowIndex);
  });

  it("sets status to failed on rejection", async () => {
    (fetchArticlesByCategory as jest.Mock).mockRejectedValue(new Error("Trending fetch failed"));

    const store = makeStore();
    await store.dispatch(loadTrendingFeed({ category: "technology", page: 1 }));
    const state = store.getState().content;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Trending fetch failed");
  });
});

describe("loadSearchResults thunk", () => {
  beforeEach(() => jest.clearAllMocks());

  it("merges news, movie, and social search results into feed", async () => {
    (searchArticles as jest.Mock).mockResolvedValue([mockArticle]);
    (searchMovies as jest.Mock).mockResolvedValue([mockMovie]);
    (searchMockSocialPosts as jest.Mock).mockResolvedValue([mockPost]);

    const store = makeStore();
    await store.dispatch(loadSearchResults({ query: "batman", page: 1 }));
    const state = store.getState().content;

    expect(state.status).toBe("succeeded");
    expect(state.feed).toHaveLength(3);
    expect(searchMovies).toHaveBeenCalledWith("batman");
    expect(searchMockSocialPosts).toHaveBeenCalledWith("batman");
  });

  it("skips movie and social search on page > 1", async () => {
    (searchArticles as jest.Mock).mockResolvedValue([mockArticle]);
    (searchMovies as jest.Mock).mockResolvedValue([]);
    (searchMockSocialPosts as jest.Mock).mockResolvedValue([]);

    const store = makeStore();
    await store.dispatch(loadSearchResults({ query: "batman", page: 2 }));

    expect(searchMovies).not.toHaveBeenCalled();
    expect(searchMockSocialPosts).not.toHaveBeenCalled();
  });

  it("returns an empty feed with hasMore false when nothing matches", async () => {
    (searchArticles as jest.Mock).mockResolvedValue([]);
    (searchMovies as jest.Mock).mockResolvedValue([]);
    (searchMockSocialPosts as jest.Mock).mockResolvedValue([]);

    const store = makeStore();
    await store.dispatch(loadSearchResults({ query: "zzzznonexistent", page: 1 }));
    const state = store.getState().content;

    expect(state.feed).toEqual([]);
    expect(state.hasMore).toBe(false);
  });

  it("sets status to failed on rejection", async () => {
    (searchArticles as jest.Mock).mockRejectedValue(new Error("Search failed"));

    const store = makeStore();
    await store.dispatch(loadSearchResults({ query: "batman", page: 1 }));
    const state = store.getState().content;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Search failed");
  });
});