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


export interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  actionLabel: "Watch Now";
}

export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  imageUrl: string | null;
  likes: number;
  hashtag: string;
}

export type FeedItem =
  | (Article & { contentType: "news" })
  | (Recommendation & { contentType: "recommendation" })
  | (SocialPost & { contentType: "social" });