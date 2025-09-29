"use client";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  if (!movies?.length) return null;
  return (
    <section className="px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {movies.map((m) => (
          <div key={m.id} className="min-w-[160px] w-40">
            <MovieCard movie={m} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
