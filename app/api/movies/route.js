import { NextResponse } from "next/server";

// GET /api/movies?query=&with_genres=&page=
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const with_genres = searchParams.get("with_genres") || "";
  const page = searchParams.get("page") || "1";

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: TMDB_API_KEY is not set" },
      { status: 500 }
    );
  }

  let endpoint = "movie/popular";
  if (query) endpoint = "search/movie";
  else if (with_genres) endpoint = "discover/movie";

  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  if (query) url.searchParams.set("query", query);
  if (with_genres) url.searchParams.set("with_genres", with_genres);
  if (page) url.searchParams.set("page", page);
  url.searchParams.set("api_key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      // Cache responses per unique URL for 60s to reduce TMDB load
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "TMDB request failed", details: text },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch movies", details: String(err) },
      { status: 500 }
    );
  }
}
