<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

// Cached (stored in DB) TMDB data for one movie. Can appear on many lists
class Movie extends Model
{
    // All the list_items rows this movie appears in (across every list)
    public function listItems()
    {
        return $this->hasMany(ListItems::class);
    }
}
