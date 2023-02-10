function ListOfMovies({ movies }) {
    return (
        <ul>
            {
                movies.map(movies => (
                    <li key={movies.imdbID}>
                        <h3>{movies.Title}</h3>
                        <p>{movies.Year}</p>
                        <img src={movies.Poster} alt={movies.Title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return (
        <p>
            There is no results for that search
        </p>
    )
}

export default function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies ? ListOfMovies({ movies }) : NoMoviesResults()
    )
}