import './App.css'
import Movies from './components/Movies/Movies'
import { useMovies } from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import Loader from './components/Loader/Loader.jsx'
import { useState } from 'react'

function App() {
  const [sort, setSort] = useState(false)
  //hooks
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })


  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <header>
        <h1>Movie Browser</h1>
        <form className="form">
          <input onChange={handleChange}
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            value={search}
            type='text'
            placeholder="Avengers, The Matrix, Lord of the Rings .....">
          </input>
          <button onClick={handleSubmit} type="submit">Search</button>
          <label>
            {'Sort by title'}
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </label>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <Loader /> : <Movies movies={movies} search={search} />
        }
      </main>
    </>
  )
}

export default App
