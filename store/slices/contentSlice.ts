import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Article, Category } from "@/types";
import { fetchArticlesByCategory, searchArticles } from "@/services/newsApi";

interface ContentState {
  articles: Article[];
  page: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ContentState = {
  articles: [],
  page: 1,
  status: "idle",
  error: null,
  hasMore: true,
  searchQuery: "",
};

export const loadArticles = createAsyncThunk(
  "content/loadArticles",
  async ({ categories, page }: { categories: Category[]; page: number }) => {
    const results = await Promise.all(categories.map((cat) => fetchArticlesByCategory(cat, page)));
    return results.flat();
  }
);

export const loadSearchResults = createAsyncThunk(
  "content/loadSearchResults",
  async ({ query, page }: { query: string; page: number }) => {
    return searchArticles(query, page);
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    resetContent: (state) => {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
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
        state.articles = state.page === 1 ? action.payload : [...state.articles, ...action.payload];
        state.hasMore = action.payload.length > 0;
        state.page += 1;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load articles";
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = state.page === 1 ? action.payload : [...state.articles, ...action.payload];
        state.hasMore = action.payload.length > 0;
        state.page += 1;
      });
  },
});

export const { resetContent, setSearchQuery } = contentSlice.actions;
export default contentSlice.reducer;