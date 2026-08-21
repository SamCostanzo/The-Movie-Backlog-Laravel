export function buildMovieSlug(id: number, title: string, releaseDate: string): string {
    const sluggedTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    const year = releaseDate.slice(0, 4);

    return `${sluggedTitle}-${year}-${id}`;
}