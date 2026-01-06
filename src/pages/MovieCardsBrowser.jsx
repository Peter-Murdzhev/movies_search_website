import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const MovieCardsBrowser = () => {
    const [movies, setMovies] = useState([]);
    const { input } = useParams();

    //production stage fetch
    useEffect(() => {
        const fixedInput = input.replace(/[.,/;:-]+/g, " ")

        const fetchMovies = async () => {
            const response = await fetch(`/api/tmdb-movies-search?query=${fixedInput}`);
            const data = await response.json();
            setMovies(data);
        }

        fetchMovies();
    }, [input])

    //this is dev stage fetch

    // useEffect(() => {
    //     const fixedInput = input.replace(/[.,/;:-]+/g, " ")

    //     const fetchMovies = async () => {
    //         const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${fixedInput}`, {
    //             headers: {
    //                 accept: "application/json",
    //                 Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    //             }
    //         });

    //         const data = await response.json();
    //         setMovies(data.results);
    //     }

    //     fetchMovies();
    // }, [input])

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