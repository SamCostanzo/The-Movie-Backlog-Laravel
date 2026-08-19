<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $response = Http::withToken(config('services.tmdb.key'))->get('https://api.themoviedb.org/3/movie/popular');
        $data = $response->json();

        return Inertia::render('home', [
            'movies' => $data['results'],
        ]);
    }
}
