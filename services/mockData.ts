import { SocialPost } from "@/types";

const MOCK_SOCIAL_POSTS: SocialPost[] = [
  { id: "social-1", author: "Maya Chen", handle: "@mayacodes", content: "Just shipped a feature using RTK Query for the first time. Genuinely so much less boilerplate than manual thunks.", imageUrl: null, likes: 342, hashtag: "#WebDev" },
  { id: "social-2", author: "TechDaily", handle: "@techdaily", content: "Breaking: New Tailwind v4 update simplifies dark mode config even further.", imageUrl: "https://picsum.photos/seed/tech/400/250", likes: 891, hashtag: "#Tailwind" },
  { id: "social-3", author: "Sam Rivera", handle: "@samr_dev", content: "Hot take: infinite scroll is almost always better UX than pagination for content feeds.", imageUrl: null, likes: 156, hashtag: "#UX" },
  { id: "social-4", author: "Priya Nair", handle: "@priyabuilds", content: "TypeScript discriminated unions are so underrated for modeling mixed-content feeds.", imageUrl: null, likes: 213, hashtag: "#TypeScript" },
  { id: "social-5", author: "Jordan Blake", handle: "@jblakefit", content: "Ran my first half marathon this morning. Legs are done but the endorphins are unmatched.", imageUrl: "https://picsum.photos/seed/health1/400/250", likes: 587, hashtag: "#Health" },
  { id: "social-6", author: "Aisha Khan", handle: "@aishatrades", content: "Markets are jittery again today. Reminder that reacting to every dip is how you lose long-term.", imageUrl: null, likes: 124, hashtag: "#Business" },
  { id: "social-7", author: "CineBuzz", handle: "@cinebuzz", content: "That new trailer just dropped and the internet is already losing it. Thoughts?", imageUrl: "https://picsum.photos/seed/movie1/400/250", likes: 1204, hashtag: "#Entertainment" },
  { id: "social-8", author: "Leo Fischer", handle: "@leofischer", content: "Underrated fact: octopuses have three hearts and blue blood. Evolution is wild.", imageUrl: null, likes: 432, hashtag: "#Science" },
  { id: "social-9", author: "SportsCenter Daily", handle: "@sportscenterdaily", content: "That last-minute goal is going to be replayed for years. Absolute chaos in the stands.", imageUrl: "https://picsum.photos/seed/sports1/400/250", likes: 967, hashtag: "#Sports" },
  { id: "social-10", author: "Devon Marsh", handle: "@devonbuilds", content: "Spent the whole weekend refactoring one function. Zero regrets, code reads like poetry now.", imageUrl: null, likes: 198, hashtag: "#Coding" },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function fetchMockSocialPosts(): Promise<SocialPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(shuffle(MOCK_SOCIAL_POSTS)), 300);
  });
}

export function searchMockSocialPosts(query: string): Promise<SocialPost[]> {
  const q = query.toLowerCase();
  const matches = MOCK_SOCIAL_POSTS.filter(
    (post) =>
      post.content.toLowerCase().includes(q) ||
      post.hashtag.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q)
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve(shuffle(matches)), 300);
  });
}