"use client";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "/vercel.svg"; // simple fallback

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block rounded-2xl overflow-hidden bg-slate-800/40 hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-slate-400 mt-1">{year}</p>
      </div>
    </Link>
  );
}
