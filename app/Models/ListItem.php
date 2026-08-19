<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

// One movie sitting inside one list. Holds both foreign keys
class ListItem extends Model
{
    // The list this item belongs to
    public function list()
    {
        return $this->belongsTo(MovieList::class);
    }

    // The movie this item points to
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}
