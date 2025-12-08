import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {

  return (

    <div className="movie_card">
      <Link to={`/movie/${movie.id}`}>
        <h3>{movie.title}</h3>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
        <p style={{ color: "yellow", textAlign: "center" }}><strong>Rating:{movie.vote_average}</strong></p>
        <p className="release_date">{movie.release_date}</p>
      </Link>
    </div >


  )
}

export default MovieCard;