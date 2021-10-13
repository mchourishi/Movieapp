<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Utilities\Omdb;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display Favourite Movies.
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index(Request $request){
        $movies =(empty($request->tags)) ?
            Auth::user()->favourites->toArray()
            : TagController::getMoviesAssociatedwithaTag($request->tags)->toArray();

        $tags = [];
        if(!empty($movies)) {
            $movies = array_chunk($movies, 6);
            $tags = Auth::user()->tags()->get();
        }
        return view('home', compact('movies','tags'));
    }
    /**
     * Search Movies via name
     * @param Request $request
     * @return mixed
     */
    public function search(Request $request){
        $searchVal = $request->search;
        $movies = (!empty($searchVal)) ? $this->getMovies($searchVal) : [];
        return view('home', compact('movies', 'searchVal'));
    }

    /**
     * Get Movies from cache if exists else from API.
     * @param $searchVal
     * @return mixed
     */
    public function getMovies($searchVal){
        if(Cache::has($searchVal)){
            $movies = Cache::get($searchVal);
        }else {
            $response = Http::get(Omdb::baseUrl() . "&s=" . $searchVal)
                ->json('Search');
            if (!empty($response)) {
                $movies = Cache::remember($searchVal, now()->addMinutes(5), function () use ($response) {
                    return array_chunk($response, 6);
                });
            }
        }
        return $movies ?? [];
    }
    /**
     * Mark the movie as favourite or unfavourite them.
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggleFavourite(Request $request){
        $movie = Movie::firstOrCreate($request->except('_token', 'type'));
        if(empty($request->type)) {
            Auth::user()->favourites()->syncWithoutDetaching($movie->id);
        }else{
            Auth::user()->favourites()->detach($movie->id);
        }
        return response()->json(['msg' => 'Favourite Updated'], 200);
    }

    /**
     * Display Movie Details.
     * @param $movie_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function show($movie_id){
        $movie = [];
        $tags = '';
        if(!empty($movie_id)){
            $movie = Http::get(Omdb::baseUrl()."&i=".$movie_id)->json();
            $dbMovie = Movie::where("imdbId",$movie_id)->first();
            if(Movie::favourited($movie_id)) {
                $tags = TagController::getMovieTagsofUser($dbMovie->id);
            }
        }
        return view('movies.show', compact('movie', 'tags'));
    }
}

