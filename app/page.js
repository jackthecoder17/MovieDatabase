'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
// import GetMovies from './api/api'
import SearchBar from './components/searchbar/SearchBar'
import MovieList from './components/movielist/MovieList'
//Building a movie database with Next.js and TMDB API
export default function Home() {
  // const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <SearchBar/>
      <MovieList/>
    </div>
  )
}
