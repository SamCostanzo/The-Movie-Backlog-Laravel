<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieSearchController;
use App\Http\Controllers\MovieController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/movies/search', [MovieSearchController::class, 'search'])->name('movies.search');
Route::get('/movies/{slug}', [MovieController::class, 'show'])->name('movies.show');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
