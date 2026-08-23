import type { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }: { movies: Movie[] }) {
    const topRatedId = movies.length
        ? movies.reduce((best, movie) => (movie.vote_average > best.vote_average ? movie : best)).id
        : null;

    return (
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie, index) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    plateNumber={index + 1}
                    featured={movie.id === topRatedId}
                />
            ))}
        </div>
    );
}