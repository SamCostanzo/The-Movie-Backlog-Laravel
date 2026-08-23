import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';
import MovieGrid from '@/components/MovieGrid';

export default function Home({ movies: initialMovies }: { movies: Movie[] }) {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(initialMovies);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!query) {
                setMovies(initialMovies);
            } else {
                fetch(`/movies/search?query=${query}`)
                    .then((res) => res.json())
                    .then((data) => setMovies(data.movies));
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, initialMovies]);

    return (
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
            <header className="flex flex-col gap-4 border-b-2 border-foreground pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-2xl font-semibold tracking-wide uppercase">The Movie Backlog</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search titles"
                    className="w-full border-b border-border bg-transparent py-1 font-mono text-xs tracking-wide uppercase placeholder:text-muted-foreground focus:border-foreground focus:outline-none sm:w-56"
                />
            </header>

            <p className="mt-8 mb-5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {query ? `Results for "${query}"` : 'Now showing — popular'}
            </p>

            <MovieGrid movies={movies} />
        </div>
    );
}