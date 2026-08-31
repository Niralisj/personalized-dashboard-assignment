#  Personalized Content Dashboard

A dashboard that pulls together live news, live movie recommendations, and mock social posts into one searchable, personalized feed. Built for the SDE Intern frontend assignment.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Redux Toolkit + redux-persist
- Tailwind CSS v4
- Jest + React Testing Library

## Data sources

- **News:** NewsAPI (real, live data)
- **Movies:** TMDB (real, live data)
- **Social posts:** mock data (see `services/mockData.ts`) — no public social API was used, per the assignment's own note that this can be mocked

## Setup

Clone the repo:
```bash
git clone [https://github.com/Niralisj/personalized-dashboard-assignment](https://github.com/Niralisj/personalized-dashboard-assignment)
cd personalized-dashboard-assignment
```

Install dependencies:
```bash
npm install
```

Create a `.env.local` file in the project root with:
```env
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_bearer_token
```

Get a NewsAPI key at newsapi.org, and a TMDB API read access token at themoviedb.org/settings/api.

Run the dev server:
```bash
npm run dev
```

Open http://localhost:3000.

Run tests:
```bash
npm test
```

## Features

- Personalized feed combining news, movie recommendations, and social posts
- Category filter (technology, sports, business, entertainment, health, science)
- Two feed views: Daily Feed (randomized mix) and Trending (sorted by a popularity score per source — likes for social, TMDB rank for movies, recency for news)
- Favorites — save any item, view them in a separate section
- Search across all three sources at once, debounced (500ms)
- Infinite scroll via IntersectionObserver
- Dark mode, implemented with CSS custom properties (not Tailwind's dark: prefix) so the whole theme lives in one place in globals.css
- Preferences (category, dark mode) and favorites persist across reloads via redux-persist

## What's real vs mocked

News and movie data are live API calls. Social posts are a static mock array with a simple filter function for search — there's no live social API integration.

## Known limitation: NewsAPI rate limits

NewsAPI's free tier caps requests at 1,000/day and is not licensed for production/deployed use per their terms — it's meant for local development. This app is built to degrade gracefully if that quota is hit: if news fails to load, movies and social posts still populate the feed instead of the whole page erroring out. If you're testing this and see no news cards, this is very likely why — everything else should still work.

To reduce how often this comes up, when no category filter is selected the app only fetches 3 of the 6 categories per load (randomly chosen) instead of all 6.

## What was deprioritized

Given the 48-hour window, the following were left out to protect time for the core feed, search, state management, and testing:

- Drag-and-drop reordering of feed items
- E2E testing (Cypress/Playwright) — unit and integration tests via Jest/RTL are included instead
- Authentication
- Real-time updates (WebSockets/SSE)
- Multi-language support (i18n)

These were all listed as optional/bonus items in the assignment brief, aside from drag-and-drop and E2E testing, which were scoped out deliberately in favor of making the required sections solid rather than everything partially done.

## Testing

28 tests across 5 suites, covering:

- Reducer logic for preferences, favorites, and content slices
- Async thunk states (pending/fulfilled/rejected) for the unified feed, trending feed, and search thunks, including pagination behavior and the rate-limit resilience fallback
- Component rendering for the settings panel and content feed, including empty states and error/retry states

Run with:
```bash
npm test
```

## Project structure

```text
app/            Next.js pages, layout, providers
components/     UI components
store/          Redux store, slices, SSR-safe persist storage
services/       API calls (NewsAPI, TMDB, mock social data)
types/          Shared TypeScript types
```

## Live demo

[link once deployed]

## Demo video

[link once recorded]





## Getting Started with Nextjs
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
