'use client'

import React from "react";
import Image from "next/image";
import leftarrow from "../../assets/left.svg";
import placeholder from "../../assets/details_anime.png";
import Trailer from "./Trailer";
import MovieRow from "../movielist/MovieRow";
export default function MovieDetail({ movie }) {
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "—";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";
  const runtime = movie.runtime ? `${movie.runtime} mins` : "—";
  const topCast = movie.credits?.cast?.slice(0, 6) || [];
  const detailBackdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : "";

  const handleReturnToSearch = (e) => {
    e.preventDefault()
    window.history.back();
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-slate-800 p-4 sm:p-6"
      style={
        detailBackdrop
          ? {
              backgroundImage: `url(${detailBackdrop})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : { backgroundColor: "rgba(15, 23, 42, 0.4)" }
      }
    >
      <div className="absolute inset-0 bg-slate-950/80" aria-hidden="true" />
      <div className="relative z-10 space-y-6">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700"
          onClick={handleReturnToSearch}
          aria-label="Return to search results"
        >
          <Image src={leftarrow} width={20} height={20} alt="Back" />
          Back to results
        </button>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                height={510}
                width={340}
                className="h-auto w-full object-cover"
                alt={movie.title}
              />
            ) : (
              <Image
                src={placeholder}
                height={510}
                width={340}
                className="h-auto w-full object-cover"
                alt={`${movie.title} poster placeholder`}
              />
            )}
          </div>
          <Trailer videos={movie.videos} />
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {year}
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                {rating} rating
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {runtime}
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {movie.status || "—"}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <h2 className="text-xs uppercase tracking-widest text-slate-400">Genres</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(movie.genres || []).map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
                  >
                    {genre.name}
                  </span>
                ))}
                {!movie.genres?.length && (
                  <span className="text-sm text-slate-400">No genres available</span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <h2 className="text-xs uppercase tracking-widest text-slate-400">Top Cast</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {topCast.map((castMember) => (
                  <span
                    key={castMember.cast_id || castMember.id}
                    className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200"
                  >
                    {castMember.name}
                  </span>
                ))}
                {!topCast.length && (
                  <span className="text-sm text-slate-400">Cast data unavailable</span>
                )}
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Overview</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            {movie.overview || "No overview available for this movie yet."}
          </p>
        </section>

        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/70 p-2 sm:p-4">
          <MovieRow
            title="Recommended"
            movies={movie.recommendations?.results || []}
          />
          <MovieRow title="Similar" movies={movie.similar?.results || []} />
        </div>
      </div>
    </div>
  );
}
