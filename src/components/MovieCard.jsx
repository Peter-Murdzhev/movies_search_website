import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {

  return (
    <Link to={`/movie/${movie.id}`} className="movie_card">
      <h3>{movie.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p style={{ color: "yellow", textAlign: "center" }}><strong>Rating:{movie.vote_average}</strong></p>
      <p className="release_date">{movie.release_date}</p>
    </Link>
  )
}

export default MovieCard;