import type { Movie } from '@/types/movie';
import { Link } from '@inertiajs/react';
import { buildMovieSlug } from '@/lib/slug';

export default function MovieCard({
    movie,
    plateNumber,
    featured = false,
}: {
    movie: Movie;
    plateNumber: number;
    featured?: boolean;
}) {
    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
    const rating = movie.vote_average.toFixed(1);
    const paddedNumber = String(plateNumber).padStart(3, '0');

    return (
        <Link href={`/movies/${buildMovieSlug(movie.id, movie.title, movie.release_date)}`}>
            <p className="mb-2 font-mono text-[11px] tracking-wide text-muted-foreground">
                No. {paddedNumber}
            </p>

            <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-foreground">
                {posterPath && (
                    <img
                        src={posterPath}
                        alt={movie.title}
                        className="h-full w-full object-cover"
                    />
                )}

                {featured && (
                    <div className="absolute -right-2 -bottom-3 flex h-16 w-16 -rotate-[9deg] flex-col items-center justify-center rounded-full border border-destructive bg-background text-center text-destructive">
                        <span className="font-mono text-[6px] tracking-wide uppercase">
                            Critic's pick
                        </span>
                        <span className="font-mono text-base font-medium">{rating}</span>
                    </div>
                )}
            </div>

            <div className="mt-3">
                <p className="font-voice text-lg italic">{movie.title}</p>
                <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {year} · {rating}
                </p>
            </div>
        </Link>
    );
}