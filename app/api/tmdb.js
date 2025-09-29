// Client-side helpers that call our Next.js route handlers instead of using a leaked API key.
// Keep axios here if needed elsewhere, but default to fetch to reduce deps.
export async function fetchMovies({ with_genres = "", query = "", page = 1 } = {}) {
    const params = new URLSearchParams();
    if (with_genres) params.set("with_genres", with_genres);
    if (query) params.set("query", query);
    if (page) params.set("page", String(page));

    const res = await fetch(`/api/movies?${params.toString()}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`);
    return res.json();
}

export async function fetchMovie(id) {
    const res = await fetch(`/api/movies/${id}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);
    return res.json();
}