'use client'
import React,{useState} from 'react' 
import './SearchBar.styles.scss'
import {useSearchParams, useRouter} from 'next/navigation'
// import tmdb from '@/app/api/tmdb'
export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter()

  const [query, setquery] = useState('')

  const handleInputChange = (e) => {
    setquery(e.target.value)
  }
  const handleSearch = async () => {
    console.log(query)
    router.push('/?searchQuery='+query)
    // searchParams.set('searchQuery', query)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <nav className='w-full nav'>
      <div className='nav-container flex flex-row justify-between w-full p-5 gap-3'>
        <div className='nav-logo'>
          <a href='/'>MovieDB</a>
        </div>
        <div className='nav-search w-[65%] flex gap-3'>
          <input aria-label='Search movies' onKeyDown={handleKeyDown} type='text' placeholder='Search for a movie' value={query} onChange={handleInputChange} className='p-3 bg-transparent rounded-[6px] searchbtn w-full focus:border-slate-400'/>
          <button onClick={handleSearch} className='px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition-colors'>
            Search
          </button>
        </div>
      
      </div>
    </nav>
  )
}
