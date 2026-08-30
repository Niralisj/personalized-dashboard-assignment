import favoritesReducer, { toggleFavorite } from "./favoritesSlice";
import { Article } from "@/types";

const mockArticle: Article = {
  id: "test-1",
  title: "Test Article",
  description: "A test description",
  url: "https://example.com",
  urlToImage: null,
  publishedAt: "2026-01-01T00:00:00Z",
  source: { name: "Test Source" },
  category: "technology",
};

describe("favoritesSlice", () => {
  it("adds an article to favorites when not already present", () => {
    const state = favoritesReducer({ items: [] }, toggleFavorite(mockArticle));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("test-1");
  });

  it("removes an article from favorites when already present", () => {
    const state = favoritesReducer({ items: [mockArticle] }, toggleFavorite(mockArticle));
    expect(state.items).toHaveLength(0);
  });
});