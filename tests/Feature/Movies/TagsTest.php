<?php

namespace Tests\Feature\Movies;

use App\Http\Controllers\MovieController;
use App\Models\Movie;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tag;

class TagsTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->count(2)->create();
        $this->actingAs($this->user[0]);
    }

    public function test_favourite_movies_can_be_categorised(){
        $this->post(route('movie.toggleFavourite'),
            ['type' => '', 'imdbID' => 't009990', 'Title' => 'Test Movie', 'Poster' => 'http://testmovie.com']
        );
        // Assert a movie is created in database.
        $this->assertDatabasehas('movies', ['imdbID' => 't009990', 'Title' => 'Test Movie']);
        // Assert record is created in favourites.
        $movie = Movie::first();
        $this->assertDatabasehas('favourites', ['user_id' => $this->user[0]->id, 'movie_id' => $movie->id]);

        // Post to Create Tags Route
        $this->post(route('movie.tags', ['id' => $movie['imdbID'], 'tags' => "cars,kids"]));
        // Assert Tags are created in tags table
        $this->assertDatabasehas('tags', ['tag'=>'cars']);
        $this->assertDatabasehas('tags', ['tag'=>'kids']);
        $tags = Tag::get();
        // Assert Tags are associated to movie and user.
        $this->assertDatabasehas('movies_users_tags', ['movie_id'=> $movie->id ,
            'user_id' => $this->user[0]->id, 'tag_id' => $tags[0]->id]);
        $this->assertDatabasehas('movies_users_tags', ['movie_id'=> $movie->id ,
            'user_id' => $this->user[0]->id, 'tag_id' => $tags[1]->id]);
    }

}
