import { Link, useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie_card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <h3>{movie.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p style={{ color: "yellow", textAlign: "center" }}><strong>Rating:{movie.vote_average}</strong></p>
      <p className="release_date">{movie.release_date}</p>
    </div>
  )
}

export default MovieCard;