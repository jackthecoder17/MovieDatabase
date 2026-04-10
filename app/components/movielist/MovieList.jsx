"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import "./MovieList.styles.scss";
import Loader from "../loader";
import { useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useMovies } from "@/app/api/query/useMovie";
import "react-toastify/dist/ReactToastify.css";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const searchParams = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");
  const quickGenres = [
    { id: "", name: "All" },
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "27", name: "Horror" },
    { id: "878", name: "Sci-Fi" },
  ];
  const searchQuery = searchParams.get("searchQuery") || "";

  const data = {
    with_genres: selectedGenre,
    query: searchQuery,
    page: page,
  };

  const { data: movies, isLoading } = useMovies(data);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedGenre]);

  useEffect(() => {
    const saved = localStorage.getItem("movie_watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movie_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) return prev.filter((item) => item.id !== movie.id);
      return [{ id: movie.id, title: movie.title }, ...prev];
    });
  };

  const watchlistSet = useMemo(
    () => new Set(watchlist.map((item) => item.id)),
    [watchlist]
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="movielist rounded-2xl border border-slate-800 bg-slate-900/40">
      <ToastContainer />

      <div className="filter-section p-5 pb-2">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-300">
            Filter by Genre
          </h2>
          <p className="text-xs text-slate-400">
            Watchlist: <span className="text-cyan-300">{watchlist.length}</span>
          </p>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {quickGenres.map((genre) => (
            <button
              key={genre.id || "all"}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                selectedGenre === genre.id
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
              }`}
              onClick={() => handleGenreSelect(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <select
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          value={selectedGenre}
          onChange={(e) => handleGenreSelect(e.target.value)}
        >
          <option value="">
            All Genres
          </option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option> 
          
        </select>
      </div>
      {movies?.results.length > 0 && (
        <div className="pagination flex align-middle w-full justify-center gap-3">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {movies.total_pages}
          </span>
          <button
            className="pagination-button"
            disabled={page === movies.total_pages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {movies?.results?.length ? (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-5 row justify-center items-stretch">
              {movies.results.map((movie) => (
                <div key={movie.id} className="mb-5 flex h-full flex-col main-col">
                  <MovieCard
                    movie={movie}
                    inWatchlist={watchlistSet.has(movie.id)}
                    onToggleWatchlist={toggleWatchlist}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl font-semibold text-center py-20 text-slate-300">
              No movies found
            </h1>
          )}
        </>
      )}
      {movies?.results?.length > 0 && (
        <div className="pagination flex align-middle w-full justify-center gap-3">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {movies.total_pages}
          </span>
          <button
            className="pagination-button"
            disabled={page === movies.total_pages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}

      {/* {
        movies === [] && <h1 className='text-3xl font-bold text-center'>No movies found</h1>
      } */}
    </div>
  );
}
