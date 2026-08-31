import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Article, Category, FeedItem } from "@/types";
import { fetchArticlesByCategory, searchArticles } from "@/services/newsApi";
import { ALL_CATEGORIES } from "@/store/slices/preferencesSlice";
import { fetchTrendingMovies, searchMovies } from "@/services/tmdbApi";
import { fetchMockSocialPosts, searchMockSocialPosts } from "@/services/mockData";


function pickRandomCategories(categories: Category[], count: number): Category[] {
  const shuffled = [...categories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
interface ContentState {
  articles: Article[];
  feed: FeedItem[];
  page: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ContentState = {
  articles: [],
  feed: [],
  page: 1,
  status: "idle",
  error: null,
  hasMore: true,
  searchQuery: "",
};

export const loadArticles = createAsyncThunk(
  "content/loadArticles",
  async ({ categories, page }: { categories: Category[]; page: number }) => {
    const results = await Promise.all(
      categories.map((cat) => fetchArticlesByCategory(cat, page))
    );
    return results.flat();
  }
);

export const loadUnifiedFeed = createAsyncThunk(
  "content/loadUnifiedFeed",
  async ({ category, page }: { category: Category | null; page: number }) => {
const categoriesToFetch = category ? [category] : pickRandomCategories(ALL_CATEGORIES, 3);    const newsPromise = Promise.all(
      categoriesToFetch.map((cat) =>
        fetchArticlesByCategory(cat, page).catch(() => [] as Article[])
      )    ).then((results) => results.flat());

    const moviesPromise =
      page === 1 ? fetchTrendingMovies() : Promise.resolve([]);

    const socialPromise =
      page === 1 ? fetchMockSocialPosts() : Promise.resolve([]);

    const [newsResults, movies, socialPosts] = await Promise.all([
      newsPromise,
      moviesPromise,
      socialPromise,
    ]);

    const feedItems: FeedItem[] = [
      ...newsResults.map((article) => ({
        ...article,
        contentType: "news" as const,
      })),
      ...movies.map((movie) => ({
        ...movie,
        contentType: "recommendation" as const,
      })),
      ...socialPosts.map((post) => ({
        ...post,
        contentType: "social" as const,
      })),
    ];

    return feedItems.sort(() => Math.random() - 0.5);
  }
);

export const loadTrendingFeed = createAsyncThunk(
  "content/loadTrendingFeed",
  async ({ category, page }: { category: Category | null; page: number }) => {
const categoriesToFetch = category ? [category] : pickRandomCategories(ALL_CATEGORIES, 3);
   const newsPromise = Promise.all(
  categoriesToFetch.map((cat) =>
    fetchArticlesByCategory(cat, page).catch(() => [] as Article[])
  )
).then((results) => results.flat());

    const moviesPromise =
      page === 1 ? fetchTrendingMovies() : Promise.resolve([]);

    const socialPromise =
      page === 1 ? fetchMockSocialPosts() : Promise.resolve([]);

    const [newsResults, movies, socialPosts] = await Promise.all([
      newsPromise,
      moviesPromise,
      socialPromise,
    ]);

    const sortedNews = [...newsResults].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    type ScoredItem = {
      item: FeedItem;
      score: number;
    };

    const scored: ScoredItem[] = [
      ...socialPosts.map((post) => ({
        item: { ...post, contentType: "social" as const },
        score: post.likes / 1000,
      })),

      ...movies.map((movie, index) => ({
        item: { ...movie, contentType: "recommendation" as const },
        score: (movies.length - index) / movies.length,
      })),

      ...sortedNews.map((article, index) => ({
        item: { ...article, contentType: "news" as const },
        score: (sortedNews.length - index) / (sortedNews.length || 1),
      })),
    ];

    return scored
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }
);

export const loadSearchResults = createAsyncThunk(
  "content/loadSearchResults",
  async ({ query, page }: { query: string; page: number }) => {
    const newsPromise = searchArticles(query, page);
    const moviesPromise = page === 1 ? searchMovies(query) : Promise.resolve([]);
    const socialPromise = page === 1 ? searchMockSocialPosts(query) : Promise.resolve([]);

    const [news, movies, social] = await Promise.all([
      newsPromise,
      moviesPromise,
      socialPromise,
    ]);

    return { news, movies, social };
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    resetContent: (state) => {
      state.articles = [];
      state.feed = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        const requestedPage = action.meta.arg.page;
        state.articles =
          requestedPage === 1
            ? action.payload
            : [...state.articles, ...action.payload];
        state.hasMore = action.payload.length > 0;
        state.page = requestedPage + 1;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load articles";
      })

      .addCase(loadUnifiedFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUnifiedFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        const requestedPage = action.meta.arg.page;
        state.feed =
          requestedPage === 1
            ? action.payload
            : [...state.feed, ...action.payload];
        state.hasMore = action.payload.some(
          (item) => item.contentType === "news"
        );
        state.page = requestedPage + 1;
      })
      .addCase(loadUnifiedFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load feed";
      })

      .addCase(loadTrendingFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTrendingFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        const requestedPage = action.meta.arg.page;
        state.feed =
          requestedPage === 1
            ? action.payload
            : [...state.feed, ...action.payload];
        state.hasMore = action.payload.some(
          (item) => item.contentType === "news"
        );
        state.page = requestedPage + 1;
      })
      .addCase(loadTrendingFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load trending feed";
      })

       .addCase(loadSearchResults.fulfilled, (state, action) => {
  state.status = "succeeded";
  const requestedPage = action.meta.arg.page;
  const { news, movies, social } = action.payload;

  const searchFeedItems: FeedItem[] = [
    ...news.map((article) => ({ ...article, contentType: "news" as const })),
    ...movies.map((movie) => ({ ...movie, contentType: "recommendation" as const })),
    ...social.map((post) => ({ ...post, contentType: "social" as const })),
  ];

  state.articles =
    requestedPage === 1 ? news : [...state.articles, ...news];
  state.feed =
    requestedPage === 1
      ? searchFeedItems
      : [...state.feed, ...searchFeedItems];
  state.hasMore = news.length > 0; // pagination still keyed off news, matches your infinite scroll pattern
  state.page = requestedPage + 1;
})
      .addCase(loadSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Search failed";
      });
  },
});

export const { resetContent, setSearchQuery } = contentSlice.actions;
export default contentSlice.reducer;