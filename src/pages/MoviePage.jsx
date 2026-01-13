import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Review from "../components/Review";
import MediaDisplay from "../components/MediaDisplay";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  //production stage fetch
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/api/tmdb-movie?id=${id}`);
      const data = await response.json();

      setMovie(data);
      setActors(data.credits.cast?.slice(0, 10));
      setReviews(data.reviews.results?.slice(0, 10));
      const video = data.videos.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");

      if (video) {
        setTrailerURL(`https://www.youtube.com/embed/${video.key}`);
      }
    }

    fetchMovie();
  }, [id])

  //this is dev stage fetch

  // useEffect(() => {
  //   const fetchMovie = async () => {
  //     const response = await
  //       fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,reviews,videos`, {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  //         }
  //       });
  //     const data = await response.json();

  //     setMovie(data);
  //     setActors(data.credits.cast?.slice(0, 10));
  //     setReviews(data.reviews.results?.slice(0, 10));
  //     const video = data.videos.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");

  //     if (video) {
  //       setTrailerURL(`https://www.youtube.com/embed/${video.key}`);
  //     }
  //   }

  //   fetchMovie();
  // }, [id])

  useEffect(() => {
    if (movie) {
      window.scroll(0, 0);
    }
  }, [movie])

  if (!movie) {
    return <Spinner />
  }

  return (
    <>
      <div className="movie_page">
        <div className="movie_intro">
          <h2>{movie.title}</h2>
          <MediaDisplay imageSrc={movie.poster_path} trailerSrc={trailerURL} />
          <p ><strong>Rating:{movie.vote_average}</strong></p>
        </div>

        <p className="description">{movie.overview}</p>
      </div>

      <div className="info_block" style={{ alignSelf: "center" }}>
        <p>Actors:</p>
        <ul>
          {actors.map((actor, index) => (
            <li key={index}>{" " + actor.name}</li>
          ))}
        </ul>
      </div>

      <div className="movie_information">
        <div className="info_block">
          <p>Genres:</p>
          <ul>
            {movie.genres.map((genre, index) => (
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

      <div className="info_block" style={{ alignSelf: "center", fontSize: "14px" }}>
        <p style={{ fontSize: "14px" }}>Languages:</p>
        <ul>
          {movie.spoken_languages.map((language, index) => (
            <li key={index}>{language.english_name}</li>
          ))}
        </ul>
      </div>

      <p style={{
        fontSize: "14px", margin: "0 auto",
        marginBottom: "40px", marginTop: "20px"
      }}>Release date: {movie.release_date}</p>

      {
        reviews.length > 0 &&
        <div className="reviews_section">
          <h2>Reviews:</h2>
          <br /><br />
          {reviews.map((review, index) => (<Review key={index} review={review} />))}
        </div>
      }

    </>

  )
}

export default MoviePage;