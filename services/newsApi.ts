import { Article, Category, NewsApiResponse } from "@/types";

const BASE_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function fetchArticlesByCategory(
  category: Category,
  page: number = 1,
  pageSize: number = 10
): Promise<Article[]> {
  const url = `${BASE_URL}?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NewsAPI error: ${res.status}`);
  }

  const data: NewsApiResponse = await res.json();

  return data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a, index) => ({
      ...a,
      id: `${category}-${page}-${index}-${a.publishedAt}`,
      category,
    }));
}

export async function searchArticles(query: string, page: number = 1): Promise<Article[]> {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&language=en&page=${page}&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

  const data: NewsApiResponse = await res.json();
  return data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a, index) => ({
      ...a,
      id: `search-${page}-${index}-${a.publishedAt}`,
      category: "technology" as Category,
    }));
}