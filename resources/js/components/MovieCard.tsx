import type { Movie } from '@/types/movie';
import { Link } from '@inertiajs/react';
import { buildMovieSlug } from '@/lib/slug';

export default function MovieCard({ movie }: { movie: Movie }) {
    const posterPath = movie.poster_path ? movie.poster_path : 'fallback.jpg';
    const fullPosterPath = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
        <Link
            href={`/movies/${buildMovieSlug(movie.id, movie.title, movie.release_date)}`}
        >
            <div className="movie-card">
                <img src={fullPosterPath} alt={movie.title} />
            </div>
        </Link>
    );
}
