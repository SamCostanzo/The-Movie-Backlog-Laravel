import type { Movie } from '@/types/movie';
import MovieGrid from '@/components/MovieGrid';

export default function Home({ movies }: { movies: Movie[] }) {
    return <MovieGrid movies={movies} />;
}
