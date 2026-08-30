export type Category = "technology" | "sports" | "business" | "entertainment" | "health" | "science";

export interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
  category: Category;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Omit<Article, "id" | "category">[];
}