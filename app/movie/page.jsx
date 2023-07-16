"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import MovieDetail from "@/app/components/moviedetail/MovieDetail";
import tmdb from "@/app/api/tmdb";
import './main.styles.scss'


export default function Movie() {
  // const selectedMovieId = localStorage.getItem("selectedMovieId");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovie = async () => {
      let endpoint = `movie/${localStorage.getItem("selectedMovieId")}`;
      try {
        const { data } = await tmdb.get(endpoint);
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.log("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchMovie();
  }, [localStorage.getItem("selectedMovieId")]);

  return (
    <div className="movie-container">
      <SearchBar />
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
        <MovieDetail movie={movie} />
      )}
    </div>
  );
}

// (<MovieDetail movie={movie}/>)
