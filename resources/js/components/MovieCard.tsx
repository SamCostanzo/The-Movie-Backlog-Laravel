import type { Movie } from '@/types/movie';

export default function MovieCard({ movie }: { movie: Movie }) {
    const posterPath = movie.poster_path ? movie.poster_path : 'fallback.jpg';
    const fullPosterPath = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
        <div className="movie-card">
            <img src={fullPosterPath} alt={movie.title} />
        </div>
    );
}
