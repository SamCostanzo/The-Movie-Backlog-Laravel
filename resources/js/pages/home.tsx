import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';
import MovieGrid from '@/components/MovieGrid';

export default function Home({ movies: initialMovies }: { movies: Movie[] }) {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(initialMovies);

    // Debounce 
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Fetch
            if(!query){
                setMovies(initialMovies);
            } else {
                fetch(`/movies/search?query=${query}`)
                    .then((res) => res.json())
                    .then((data) => setMovies(data.movies))
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div>
            <input id="movie-search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <MovieGrid movies={movies} />
        </div>
    );

}
