<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\TagController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::any('/home', [App\Http\Controllers\MovieController::class, 'index'])->name('home');

    Route::prefix('/movies')->group(function () {
        Route::any('/search', [MovieController::class, 'search'])->name('movies.search');
        Route::post('/toggleFavorite', [MovieController::class, 'toggleFavourite'])->name('movie.toggleFavourite');
        Route::get('/show/{id}', [MovieController::class, 'show'])->name('movie.show');
        Route::post('/{id}/tags', [TagController::class,'addTags'])->name('movie.tags');
    });

});
