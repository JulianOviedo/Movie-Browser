import { useEffect, useRef, useState } from "react"

export default function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }

      if (search === '') {
        setError('Cannot search an empty movie')
        return
      }

      if (search.match(/^\d+$/)) {
        setError('Cannot search a movie with a number')
        return
      }

      if (search.length < 3) {
        setError('The search must have at least 3 characters')
        return
      }

      setError(null)
    }, [search])

    return { search, updateSearch, error }
  }
