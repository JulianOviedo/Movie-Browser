const API_KEY = '4287ad07'

export default async function searchMovies({ search }) {
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search
        return movies?.map(movies => (
            {
                id: movies.imdbID,
                title: movies.Title,
                year: movies.Year,
                poster: movies.Poster
            }
        ))

    } catch (error) {
        console.log(error)
        throw new Error('Error searching movies.')
    }
}