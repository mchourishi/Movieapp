<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'imdbID', 'Title', 'Poster'
    ];


    public function users()
    {
        return $this->belongsToMany(User::class, 'favourites','movie_id','user_id');
    }

    /**
     * Get if the movie is favourite movie.
     * @return bool
     */
    public static function favourited($movieId)
    {
        $movie = Movie::where("imdbId",$movieId)->first();
        if(!empty($movie)){
            return (bool)Favourite::where('user_id', Auth::id())
                ->where('movie_id', $movie->id)
                ->first();
        }else{
            return false;
        }
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'movies_users_tags', 'movie_id', 'tag_id');
    }
}
