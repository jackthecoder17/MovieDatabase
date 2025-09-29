import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params || {};
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: TMDB_API_KEY is not set" },
      { status: 500 }
    );
  }

  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  url.searchParams.set("api_key", apiKey);
  const { searchParams } = new URL(request.url);
  const append = searchParams.get("append_to_response");
  if (append) url.searchParams.set("append_to_response", append);
  const language = searchParams.get("language");
  if (language) url.searchParams.set("language", language);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
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
      { error: "Failed to fetch movie", details: String(err) },
      { status: 500 }
    );
  }
}
