import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const MovieCardsBrowser = () => {
    const [movies, setMovies] = useState([]);
    const { input } = useParams();


    useEffect(() => {
        const fixedInput = input.replace(/[.,/;:-]+/g, " ")

        const fetchMovies = async () => {
            const response = await fetch(`/api/tmdb-movies-search?query=${fixedInput}`);
            const data = await response.json();
            
            console.log(data)
            setMovies(data);
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