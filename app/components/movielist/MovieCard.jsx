"use client";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieCard({ movie, inWatchlist = false, onToggleWatchlist }) {
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "";
  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : null;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "/vercel.svg"; // simple fallback

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex h-full flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`${movie.title} ${year ? `(${year})` : ""}`}
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={poster}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          priority={false}
        />
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
        {rating ? (
          <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-amber-300">
            {rating}
          </span>
        ) : null}
        {onToggleWatchlist ? (
          <button
            type="button"
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            className={`absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors ${
              inWatchlist
                ? "border-rose-300 bg-rose-500/90 text-white"
                : "border-slate-500 bg-black/60 text-slate-200 hover:border-rose-300 hover:text-rose-300"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWatchlist(movie);
            }}
          >
            {inWatchlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-semibold leading-5">{movie.title}</h3>
        <p className="text-xs text-slate-400 mt-1">{year || "Unknown year"}</p>
      </div>
    </Link>
  );
}
