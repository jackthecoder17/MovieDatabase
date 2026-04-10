'use client'
import React,{useState} from 'react' 
import './SearchBar.styles.scss'
import {useSearchParams, useRouter} from 'next/navigation'
// import tmdb from '@/app/api/tmdb'
export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter()

  const [query, setquery] = useState(searchParams.get('searchQuery') || '')

  const handleInputChange = (e) => {
    setquery(e.target.value)
  }
  const handleSearch = async () => {
    const cleaned = query.trim();
    if (!cleaned) {
      router.push('/');
      return;
    }
    router.push('/?searchQuery='+encodeURIComponent(cleaned))
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <nav className='w-full nav sticky top-3 z-20'>
      <div className='nav-container flex flex-row justify-between w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-4 gap-3 backdrop-blur'>
        <div className='nav-logo'>
          <a href='/' className='text-slate-100'>MovieDB</a>
        </div>
        <div className='nav-search w-[65%] flex gap-3'>
          <input aria-label='Search movies' onKeyDown={handleKeyDown} type='text' placeholder='Search by movie title' value={query} onChange={handleInputChange} className='p-3 rounded-[10px] searchbtn w-full focus:border-slate-400'/>
          <button onClick={handleSearch} className='px-4 py-2 rounded-lg bg-cyan-600 text-slate-950 font-medium hover:bg-cyan-400 transition-colors whitespace-nowrap'>
            Search
          </button>
        </div>
      
      </div>
    </nav>
  )
}
