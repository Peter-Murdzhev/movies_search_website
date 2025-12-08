import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const MovieCardsBrowser = () => {
    const [movies, setMovies] = useState([]);
    const { input } = useParams();


    useEffect(() => {
        const fixedInput = input.replace(/[.,/;:-]+/g, " ")

        const fetchMovies = async () => {
            await fetch(`https://api.themoviedb.org/3/search/movie?query=${fixedInput}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                }
            }).then(response => response.json())
                .then(data => setMovies(data.results))
                .catch(error => console.log(error));
        }

        fetchMovies();
    }, [input])

    return (
        <div className="movies">
            {
                movies?.length > 0 ? movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                )) : <p className="no_movies_message">
                    Movies not found</p>
            }
        </div>
    )
}

export default MovieCardsBrowser;