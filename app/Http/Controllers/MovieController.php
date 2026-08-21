<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MovieController extends Controller
{
   public function show(string $slug)
    {
        $parts = explode('-', $slug);
        $tmdbId = end($parts);

        $response = Http::withToken(config('services.tmdb.key'))
            ->get("https://api.themoviedb.org/3/movie/{$tmdbId}", [
                'append_to_response' => 'credits,videos',
            ]);

        $data = $response->json();

        $directors = array_filter($data['credits']['crew'], function ($person) {
            return $person['job'] === 'Director';
        });

        $trailers = array_filter($data['videos']['results'], function ($video) {
            return $video['type'] === 'Trailer' && $video['site'] === 'YouTube';
        });

        $director = array_values($directors)[0] ?? null;
        $trailer = array_values($trailers)[0] ?? null;

        return Inertia::render('movie', [
            'movie' => $data,
            'director' => $director,
            'trailer' => $trailer,
        ]);
    }
}
