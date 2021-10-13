<?php

namespace Tests\Feature\Movies;

use App\Http\Controllers\MovieController;
use App\Models\Movie;
use Illuminate\Support\Facades\Cache;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use App\Models\User;

class MoviesTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->count(2)->create();
        $this->actingAs($this->user[0]);
    }

    public function test_movies_home_page_is_shown()
    {
        $response = $this->get(route('home'));
        $response->assertStatus(200)
            ->assertSee('My Movies');
    }

    public function test_movies_can_be_searched()
    {
        $response = $this->post(route('movies.search'), ['search' => 'Frozen']);
        $response->assertStatus(200)
            ->assertSee('Frozen');
        $this->assertTrue(Cache::has('Frozen'));
    }

    public function test_no_movies_returned_on_invalid_search()
    {
        $response = $this->post(route('movies.search'), ['search' => 'xyztty']);
        $response->assertStatus(200)
            ->assertSee('No Movies');
    }

    public function test_no_movies_returned_on_empty_search()
    {
        $response = $this->post(route('movies.search'), ['search' => '']);
        $response->assertStatus(200)
            ->assertSee('No Movies');
    }

    public function test_movie_can_be_favourited_and_unfavourited()
    {
        // Test a Movie can be Favourited
        $this->post(route('movie.toggleFavourite'),
            ['type' => '', 'imdbID' => 't009990', 'Title' => 'Test Movie', 'Poster' => 'http://testmovie.com']
        );
        // Assert a movie is created in database.
        $this->assertDatabasehas('movies', ['imdbID' => 't009990', 'Title' => 'Test Movie']);
        // Assert record is created in favourites.
        $movie = Movie::first();
        $this->assertDatabasehas('favourites', ['user_id' => $this->user[0]->id, 'movie_id' => $movie->id]);

        // Test a Movie can be unfavourited.
        $this->post(route('movie.toggleFavourite'),
            ['type' => 1, 'imdbID' => 't009990', 'Title' => 'Test Movie', 'Poster' => 'http://testmovie.com']
        );
        $this->assertDatabaseMissing('favourites', ['user_id' => $this->user[0]->id, 'movie_id' => $movie->id]);
    }

    public function test_searched_movie_can_be_shown_in_detail(){
        // Arrange Preconditions.
        $movie_controller = new MovieController();
        $apiUrl = $movie_controller->getBaseUrl()."&s=cars";
        $results = Http::get($apiUrl)->json('Search');

        // Show Movie
        $response = $this->get(route('movie.show', ['id' => $results[0]['imdbID'] ]));
        $response->assertStatus(200)
            ->assertSee($results[0]['Title']);
    }

    public function movies_can_be_filtered_based_on_tags(){
        $this->post(route('movie.toggleFavourite'),
            ['type' => '', 'imdbID' => 't009990', 'Title' => 'Test Movie', 'Poster' => 'http://testmovie.com']
        );
        // Assert a movie is created in database.
        $this->assertDatabasehas('movies', ['imdbID' => 't009990', 'Title' => 'Test Movie']);
        // Assert record is created in favourites.
        $movie = Movie::first();
        $this->assertDatabasehas('favourites', ['user_id' => $this->user[0]->id, 'movie_id' => $movie->id]);

        // Post to Create Tags Route
        $this->post(route('movie.tags', ['id' => $movie['imdbID'], 'tags' => "cars"]));

        $response = $this->get(route('home',["tags" => "cars"]));
        $response->assertStatus(200)
            ->assertSee('cars');
    }
}
