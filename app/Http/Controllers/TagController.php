<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Tag;
use App\Utilities\Tagger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    private $validationRules;

    /**
     * TagController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->validationRules = ['tags' => 'required'];
    }

    /**
     * Create tags for a movie
     * @param $movie_id
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addTags($movie_id, Request $request)
    {
        // Validate tag is required.
        $request->validate($this->validationRules);
        $tags = array_map('trim', explode(',', $request->tags));
        //Get the movie
        $movie = Movie::where('imdbId', $movie_id)->first();
        // Tags the Movie
        Tagger::tagMovie($movie, $tags);
        return redirect()->back();
    }

    /**
     * Get Tags Associated to User with a Movie.
     * @param $movie_id
     * @return mixed
     */
    public static function getMovieTagsofUser($movie_id)
    {
        $tagIds = DB::table('movies_users_tags')
            ->where('movie_id', $movie_id)
            ->where('user_id', Auth::user()->id)
            ->pluck('tag_id')
            ->toArray();
        $tags = Tag::whereIn('id', $tagIds)->pluck('tag')->toArray();
        return $tags;
    }

    /**
     * Get Movies associated with tag for a user.
     * @param $tag_id
     * @return mixed
     */
    public static function getMoviesAssociatedwithaTag($tag_id)
    {
        $movieIds = DB::table('movies_users_tags')
            ->where('tag_id', $tag_id)
            ->where('user_id', Auth::user()->id)
            ->pluck('movie_id')
            ->toArray();
        $movies = Movie::whereIn('id', $movieIds)->get();
        return $movies;
    }
}
