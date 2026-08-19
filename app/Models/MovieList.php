<?php

namespace App\Models;
use App\Models\User;
use App\Models\ListItem;
use Illuminate\Database\Eloquent\Model;

// One of a user's saved movie lists (maps to the "lists" table)
class MovieList extends Model 
{
    // Stating that this maps to the 'Lists' table, since PHP reserves the List model already
    protected $table = 'lists';

    // The user who owns this list
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // All the movies in this list (via the list_items pivot)
    public function items()
    {
        return $this->hasMany(ListItem::class);
    }
}
