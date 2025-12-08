import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      }
    }).then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.log(error));
  }, [id])

  if (!movie) {
    return <Spinner />
  }

  return (
    <>
      <div className="movie_page">
        <div className="movie_intro">
          <h3>{movie.title}</h3>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
          <p style={{ color: "yellow", marginLeft: "90px" }}><strong>Rating:{movie.vote_average}</strong></p>
        </div>

        <p className="description">{movie.overview}</p>
      </div>

      <div className="movie_information">
        <div className="info_block">
          <p>Genres:</p>
          <ul>
            {movie.genres.map((genre,index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul>
        </div>

        <div className="info_block">
          <p>Countries:</p>
          <ul>
            {movie.production_countries.map((country, index) => (
              <li key={index}>{country.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{fontSize:"14px", margin:"0 auto",
         marginBottom:"80px", marginTop:"20px" }}>Release date: {movie.release_date}</p>
    </>

  )
}

export default MoviePage;