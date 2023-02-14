import { useState } from 'react'
import searchMovies from '../services/searchMovies'

export function useMovies ({search}) {
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


    return {movies, getMovies, loading}
}
