import { SocialPost } from "@/types";

const MOCK_SOCIAL_POSTS: SocialPost[] = [
  { id: "social-1", author: "Maya Chen", handle: "@mayacodes", content: "Just shipped a feature using RTK Query for the first time. Genuinely so much less boilerplate than manual thunks.", imageUrl: null, likes: 342, hashtag: "#WebDev" },
  { id: "social-2", author: "TechDaily", handle: "@techdaily", content: "Breaking: New Tailwind v4 update simplifies dark mode config even further.", imageUrl: "https://picsum.photos/seed/tech/400/250", likes: 891, hashtag: "#Tailwind" },
  { id: "social-3", author: "Sam Rivera", handle: "@samr_dev", content: "Hot take: infinite scroll is almost always better UX than pagination for content feeds.", imageUrl: null, likes: 156, hashtag: "#UX" },
  { id: "social-4", author: "Priya Nair", handle: "@priyabuilds", content: "TypeScript discriminated unions are so underrated for modeling mixed-content feeds.", imageUrl: null, likes: 213, hashtag: "#TypeScript" },
];

export function fetchMockSocialPosts(): Promise<SocialPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_SOCIAL_POSTS), 300);
  });
}