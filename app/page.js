'use client'
import { useEffect, useState } from 'react'
import SearchBar from './components/searchbar/SearchBar'
import MovieList from './components/movielist/MovieList'

export default function Home() {
  const [heroBackdrop, setHeroBackdrop] = useState('')
  const [heroMovieTitle, setHeroMovieTitle] = useState('')

  useEffect(() => {
    const loadRandomHotMovie = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 5) + 1
        const res = await fetch(`/api/movies?page=${randomPage}`, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
        if (!res.ok) return

        const data = await res.json()
        const withBackdrop = (data?.results || []).filter((movie) => movie?.backdrop_path)
        if (!withBackdrop.length) return

        const picked = withBackdrop[Math.floor(Math.random() * withBackdrop.length)]
        setHeroBackdrop(`https://image.tmdb.org/t/p/original/${picked.backdrop_path}`)
        setHeroMovieTitle(picked.title || picked.name || '')
      } catch {
        // Keep fallback static hero if fetch fails.
      }
    }

    loadRandomHotMovie()
  }, [])

  return (
    <div className='space-y-6 py-5'>
      <section
        className='relative overflow-hidden rounded-2xl border border-slate-700/80 p-5 md:p-8'
        style={
          heroBackdrop
            ? {
                backgroundImage: `url(${heroBackdrop})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }
            : { backgroundColor: 'rgba(15, 23, 42, 0.5)' }
        }
      >
        <div className='absolute inset-0 bg-slate-950/70' aria-hidden='true' />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/45' aria-hidden='true' />
        <div className='relative z-10'>
        <p className='text-xs uppercase tracking-[0.2em] text-cyan-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]'>Movie Discovery</p>
        <h1 className='mt-2 text-2xl font-semibold text-white md:text-3xl [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]'>
          Find what to watch, faster
        </h1>
        <p className='mt-2 max-w-2xl text-sm text-slate-200 md:text-base [text-shadow:0_1px_4px_rgba(0,0,0,0.75)]'>
          Search by title, filter by genre, and save movies to your watchlist while you browse.
        </p>
        {heroMovieTitle ? (
          <p className='mt-3 text-xs text-slate-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.75)]'>
            Featuring: <span className='text-slate-100'>{heroMovieTitle}</span>
          </p>
        ) : null}
        </div>
      </section>
      <SearchBar/>
      <MovieList/>
    </div>
  )
}
