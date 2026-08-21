<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MovieSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->query('query');

        $response = Http::withToken(config('services.tmdb.key'))->get('https://api.themoviedb.org/3/search/movie', [
            'query' => $query
        ]);

        $data = $response->json();

        return response()->json(['movies' => $data['results']]);
    }
}
