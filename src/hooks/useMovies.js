import { useCallback, useMemo, useRef, useState } from 'react'
import searchMovies from '../services/searchMovies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return

        try {
            setIsLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // with useMemo... the code avoid to re-calculate the sort when the search changed.. only when the dependencies change
    const sortedMovies = useMemo(() => {
        const hasMovies = movies?.length > 0
        return sort
            ? hasMovies?[...movies].sort((a, b) => a.title.localeCompare(b.title)) : null
            : movies
    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading }
}