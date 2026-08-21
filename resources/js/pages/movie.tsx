import type { Movie } from '@/types/movie';

type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

type Company = {
    id: number;
    name: string;
};

type Genre = {
    id: number;
    name: string;
};

type Director = {
    id: number;
    name: string;
} | null;

type Trailer = {
    key: string;
    name: string;
} | null;

type MovieDetail = Movie & {
    backdrop_path: string | null;
    tagline: string | null;
    runtime: number | null;
    genres: Genre[];
    production_companies: Company[];
    credits: {
        cast: CastMember[];
    };
};

export default function MovieShow({
    movie,
    director,
    trailer,
}: {
    movie: MovieDetail;
    director: Director;
    trailer: Trailer;
}) {
    return (
        <div>
            {movie.backdrop_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt=""
                    className="w-full"
                />
            )}

            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="flex gap-6">
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-48 flex-shrink-0"
                        />
                    )}

                    <div>
                        <h1 className="text-3xl font-bold">{movie.title}</h1>

                        {movie.tagline && (
                            <p className="italic text-muted-foreground">{movie.tagline}</p>
                        )}

                        <p className="mt-2 text-sm text-muted-foreground">
                            {movie.release_date?.slice(0, 4)}
                            {movie.runtime ? ` · ${movie.runtime} min` : ''}
                            {' · '}
                            {movie.vote_average.toFixed(1)} / 10
                        </p>

                        {movie.genres.length > 0 && (
                            <p className="mt-2 text-sm">
                                {movie.genres.map((genre) => genre.name).join(', ')}
                            </p>
                        )}

                        {director && (
                            <p className="mt-2 text-sm">
                                Directed by {director.name}
                            </p>
                        )}

                        {movie.production_companies.length > 0 && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {movie.production_companies
                                    .map((company) => company.name)
                                    .join(', ')}
                            </p>
                        )}

                        <p className="mt-4">{movie.overview}</p>

                        <button className="mt-4 rounded-md border px-4 py-2">
                            Add to list
                        </button>
                    </div>
                </div>

                {trailer && (
                    <div className="mt-8 aspect-video w-full max-w-3xl">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allowFullScreen
                        />
                    </div>
                )}

                {movie.credits.cast.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-3 text-xl font-semibold">Cast</h2>
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                            {movie.credits.cast.slice(0, 12).map((member) => (
                                <div key={member.id}>
                                    {member.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                            alt={member.name}
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <div className="aspect-[2/3] rounded-md bg-muted" />
                                    )}
                                    <p className="mt-1 text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {member.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}