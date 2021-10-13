@extends('layouts.master')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <!-- Default box -->
            <div class="card card-solid">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-sm-3">
                            <div class="col-12">
                                <img src="{{ $movie['Poster'] }}" alt="Movie Poster">
                            </div>
                        </div>
                        <div class="col-12 col-sm-9">
                            <h3 class="my-3">{{ $movie['Title'] }}</h3>
                            <p>{{ $movie['Plot'] }}</p>
                            <hr>
                            <p>Release: {{ $movie['Year'] }}</p>
                            <p>Actors : {{ $movie['Actors'] }}</p>
                            <p>Imdb Rating : {{ $movie['imdbRating'] }}</p>
                            @if(\App\Models\Movie::favourited($movie['imdbID']))
                            <form method="post" id="frmTag" name="frmTag" action="{{ route('movie.tags', ['id' => $movie['imdbID']]) }}">
                                {{ csrf_field() }}
                                <div class="input-group input-group-lg">
                                    <input type="text" class="form-control {{ $errors->has('tags') ? 'is-invalid' : '' }}"
                                           id="tags" name="tags" value="{{ !empty($tags) ? implode(",", $tags) : ""}}" placeholder="Eg: alpha,beta,gamma">
                                    <input type="hidden"  id="imdbID" name="imdbID" value="{{ $movie['imdbID'] }}">
                                        <span class="input-group-append">
                                            <button type="submit" class="btn btn-info btn-flat">
                                                <i class="fas fa-tags"></i>
                                            </button>
                                        </span>
                                </div>
                            </form>
                            @endif
                        </div>
                    </div>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->

        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@endsection

