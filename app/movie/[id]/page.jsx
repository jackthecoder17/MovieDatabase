import MovieDetail from "@/app/components/moviedetail/MovieDetail";

export const dynamic = "force-dynamic"; // since we proxy to external API

async function getMovie(id) {
  const apiKey = process.env.TMDB_API_KEY;
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  if (apiKey) {
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("append_to_response", "videos,credits,recommendations,similar");
    url.searchParams.set("language", "en-US");
  }
  const res = await fetch(apiKey ? url.toString() : `/api/movies/${id}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load movie");
  return res.json();
}

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id);
  return (
    <div className="movie-container">
      <MovieDetail movie={movie} />
    </div>
  );
}

export async function generateMetadata({ params }) {
  try {
    const movie = await getMovie(params.id);
    return {
      title: `${movie.title} (${movie.release_date?.slice(0, 4) || ""}) | MovieDB`.
        replace(" ()", ""),
      description: movie.overview?.slice(0, 160) || "Movie details",
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500/${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: "Movie | MovieDB" };
  }
}
