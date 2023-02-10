import './App.css'
import Movies from './components/Movies/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const handleSubmit = () => {
    e.preventDefault()
  }

  const { movies: mappedMovies } = useMovies()

  return (
    <>
      <header>
        <h1>Movie Browser</h1>
        <form className="form">
          <input type='text' placeholder="Avengers, The Matrix, Lord of the Rings ....."></input>
          <button onClick={handleSubmit} type="submit">Search</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </>
  )
}

export default App
