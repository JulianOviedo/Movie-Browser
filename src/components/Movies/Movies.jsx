function ListOfMovies({ movies }) {
    return (
        <ul>
            {
                movies.map(movies => (
                    <li key={movies.id}>
                        <h3>{movies.title}</h3>
                        <p>{movies.year}</p>
                        <img src={movies.poster} alt={movies.title} />
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