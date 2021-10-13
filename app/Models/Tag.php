<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function movies(){
        return $this->belongsToMany(Movie::class, 'movies_users_tags', 'tag_id','user_id');
    }

    public function users(){
        return $this->belongsToMany(User::class, 'movies_users_tags', 'tag_id', 'movie_id');
    }
}
