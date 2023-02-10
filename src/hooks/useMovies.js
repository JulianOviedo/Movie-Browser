import responseMovies from '../mockData/mock.json'

export function useMovies () {

    const movies = responseMovies.Search

    const mappedMovies = movies?.map(movies => (
        {
            id: movies.imdbID,
            title: movies.Title,
            year: movies.Year,
            poster: movies.Poster
        }
    ))

    return {movies : mappedMovies}
}