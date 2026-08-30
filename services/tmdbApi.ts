import { Recommendation } from "@/types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

interface TmdbResponse {
  results: TmdbMovie[];
}

export async function fetchTrendingMovies(): Promise<Recommendation[]> {
  const res = await fetch(`${TMDB_BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  const data: TmdbResponse = await res.json();

  return data.results.slice(0, 6).map((movie) => ({
    id: `tmdb-${movie.id}`,
    title: movie.title,
    description: movie.overview || "No description available.",
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    actionLabel: "Watch Now" as const,
  }));
}