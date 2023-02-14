import './App.css'
import Movies from './components/Movies/Movies'
import { useMovies } from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import Loader from './components/Loader/Loader.jsx'
import { useCallback, useState } from 'react'
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false)
  //hooks
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  console.log(movies)

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )


  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSort(false)
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
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
              borderColor: error ? 'red' : 'transparent',
              minWidth: '350px',
              maxWidth: '450px',
              alignSelf: 'center'
            }}
            value={search}
            type='text'
            placeholder="Avengers, The Matrix, Lord of the Rings .....">
          </input>
          <button style={{ width: '200px', alignSelf: 'center' }} onClick={handleSubmit} type="submit">Search</button>
          <p>
            {'Sort by title'}
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </p>
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
