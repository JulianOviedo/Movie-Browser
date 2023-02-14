import './App.css'
import Movies from './components/Movies/Movies'
import { useMovies } from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import Loader from './components/Loader/Loader.jsx'

function App() {

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })
  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
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
