"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import photo from "../../assets/hero.png";
import "./MovieList.styles.scss";
import Link from "next/link";
import tmdb from "@/app/api/tmdb";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");
  // const searchQueryFromLocalStorage = localStorage.getItem("searchQuery");
  useEffect(() => {
    const fetchMovies = async () => {
      let endpoint = "movie/top_rated";
      if (searchParams.get("searchQuery")) {
        endpoint = "search/movie";
      }
      try {
        const { data } = await tmdb.get(endpoint, {
          params: {
            query: searchParams.get("searchQuery"),
            page: page,
            with_genres: selectedGenre,
          },
        });
        console.log(data.results);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log("Error fetching movies:", error);
        toast.error("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchMovies();
  }, [searchParams.get("searchQuery"), page , selectedGenre]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleMovieClick = (id) => {
    localStorage.setItem("selectedMovieId", id);
    console.log(id);
  };
  const handleGenreSelect = (genreId) => {  
    console.log(genreId);
    setSelectedGenre(genreId);
  };

  return (
    <div className="movielist">
      <ToastContainer />

      <div className="filter-section p-5">
      <h2>Filter by Genre:</h2>
      <select value={selectedGenre} onChange={(e) => handleGenreSelect(e.target.value)}>
        <option value="" selected>All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
        {/* Add more genre options */}
      </select>
    </div>
      {movies.length > 0 && (
        <div className="pagination flex align-middle w-full justify-center gap-3">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-button"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">
            <svg
              class="ip"
              viewBox="0 0 256 128"
              width="256px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#5ebd3e" />
                  <stop offset="33%" stop-color="#ffb900" />
                  <stop offset="67%" stop-color="#f78200" />
                  <stop offset="100%" stop-color="#e23838" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stop-color="#e23838" />
                  <stop offset="33%" stop-color="#973999" />
                  <stop offset="67%" stop-color="#009cdf" />
                  <stop offset="100%" stop-color="#5ebd3e" />
                </linearGradient>
              </defs>
              <g fill="none" stroke-linecap="round" stroke-width="16">
                <g class="ip__track" stroke="#ddd">
                  <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                  <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                </g>
                <g stroke-dasharray="180 656">
                  <path
                    className="ip__worm1"
                    stroke="url(#grad1)"
                    stroke-dashoffset="0"
                    d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                  />
                  <path
                    className="ip__worm2"
                    stroke="url(#grad2)"
                    stroke-dashoffset="358"
                    d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                  />
                </g>
              </g>
            </svg>
          </h1>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-5 row justify-center items-center">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="mb-5 flex flex-col justify-between main-col"
            >
              <Link href={`/movie?${movie.title}`}>
                <div className="image mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                    height={500}
                    width={300}
                    className="rounded-3xl mb-2"
                    onClick={() => handleMovieClick(movie.id)}
                  />
                </div>

                <h1 className="font-bold text-center">
                  {movie.title}{" "}
                  <span>{movie.release_date.substring(0, 4)}</span>
                </h1>
                {/* <button className='p-3 hover:bg-transparent rounded-3xl searchbtn w-full focus:border-slate-400' onClick={()=> Addwatchlist(movie.id)}>
                  Add to Watchlist
                </button> */}
              </Link>
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && (
        <h1 className="text-3xl font-bold text-center">No movies found</h1>
      )}
      {movies.length > 0 && (
        <div className="pagination flex align-middle w-full justify-center gap-3">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-button"
            disabled={page === totalPages}
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
