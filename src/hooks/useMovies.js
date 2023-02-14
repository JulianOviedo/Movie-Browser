import { useMemo, useState } from 'react'
import searchMovies from '../services/searchMovies'

export function useMovies ({search, sort}) {
    const [movies, setMovies] = useState([])
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getMovies = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    // with useMemo... the code avoid to re-calculate the sort when the search changed.. only when the dependencies change
    const sortedMovies = useMemo(() => {
        return sort
          ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
          : movies
      }, [sort, movies])
    
      return { movies: sortedMovies, getMovies, loading }
    }