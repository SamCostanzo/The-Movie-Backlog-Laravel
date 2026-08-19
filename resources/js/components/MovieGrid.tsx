import type { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
