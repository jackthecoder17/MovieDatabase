"use client";
import React from "react";
import { useState } from "react";
import "./MovieList.styles.scss";
import Loader from "../loader";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useMovies } from "@/app/api/query/useMovie";
import "react-toastify/dist/ReactToastify.css";
import MovieCard from "./MovieCard";

export default function MovieList() {
  // const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");

  let data = {
    with_genres: selectedGenre,
    query: searchParams.get("searchQuery") || "",
    page: page,
  };

  const { data: movies, isLoading } = useMovies(data);
  console.log(movies);
  // const searchQueryFromLocalStorage = localStorage.getItem("searchQuery");
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     let endpoint = "movie/top_rated";
  //     if (searchParams.get("searchQuery")) {
  //       endpoint = "search/movie";
  //     }
  //     try {
  //       const { data } = await tmdb.get(endpoint, {
  //         params: {
  //           query: searchParams.get("searchQuery"),
  //           page: page,
  //           with_genres: selectedGenre,
  //         },
  //       });
  //       console.log(data.results);
  //       setMovies(data.results);
  //       setTotalPages(data.total_pages);
  //     } catch (error) {
  //       console.log("Error fetching movies:", error);
  //       toast.error("Error fetching movies");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   setLoading(true);
  //   fetchMovies();
  // }, [searchParams.get("searchQuery"), page , selectedGenre]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
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
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreSelect(e.target.value)}
        >
          <option value="" selected>
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
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-5 row justify-center items-center">
              {movies.results.map((movie) => (
                <div key={movie.id} className="mb-5 flex flex-col justify-between main-col">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-center py-20">No movies found</h1>
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
