import { useState } from 'react'

export function SearchInput({ onSearch }) {
  const [searchMode, setSearchMode] = useState('')

  const handleInputChange = (event) => {
    setSearchMode(event.target.value)
  };

  const handleSearch = (event) => {
    event.preventDefault()
    onSearch(searchMode)
  };

  return (
    <form onSubmit={handleSearch} className='flex items-center w-5/6 mt-3 '>
      <input
        type='text'
        className='w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-rose-700  bg-slate-600 focus:border-transparent'
        placeholder='Search: item1, item2'
        value={searchMode}
        onChange={handleInputChange}
      />
      <button
        type='submit'
        className='px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Search
      </button>
    </form>
  );
}
