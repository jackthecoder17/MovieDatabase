"use client";
import React from "react";
import SearchBar from "../components/searchbar/SearchBar";
import MovieDetail from "@/app/components/moviedetail/MovieDetail";
import { useSearchParams } from "next/navigation";
import Loader from "../components/loader";
import { useMovie } from "../api/query/useMovie";
import './main.styles.scss'


export default function Movie() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const { data: movie, isLoading: loading } = useMovie(movieId);
  return (
    <div className="movie-container">
      <SearchBar />
      {loading ? (
        <Loader />
      ) : (
        <MovieDetail movie={movie} />
      )}
    </div>
  );
}

// (<MovieDetail movie={movie}/>)
