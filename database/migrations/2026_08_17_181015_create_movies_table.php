<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('tmdb_id')->unique();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('poster_path')->nullable();
            $table->string('release_date')->nullable();
            $table->decimal('vote_average', 3, 1);
            $table->timestamps();    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
