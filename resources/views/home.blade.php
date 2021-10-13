@extends('layouts.master')

@section('inline-css')
    <link href="{{ asset('css/select2.min.css') }}" rel="stylesheet" type="text/css"/>
@endsection

@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-9">
                    <h1 class="m-0 text-dark">@if(Route::getCurrentRequest()->is('home'))<span>My Movies</span>@else<span>Search Results</span>@endif</h1>
                </div><!-- /.col -->
                @if(Route::getCurrentRequest()->is('home'))
                    <div class="col-sm-3">
                    <div class="form-group">
                        <div class="form-group">
                            <form method="post" action="{{route('home')}}">
                                {{ csrf_field() }}
                                <select class="form-control select2" style="width: 100%;" data-placeholder="Select Tags.." id="tags" name="tags" onchange="this.form.submit()">
                                    <option value="">Tags</option>
                                    @foreach($tags as $tag)
                                        <option value="{{$tag->id}}">
                                            {{$tag->tag}}
                                        </option>
                                    @endforeach
                                </select>
                            </form>
                        </div>
                    </div>
                </div><!-- /.col -->
                @endif
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <section class="content">
        <div class="container-fluid">
            @forelse($movies as $movieChunk)
                <div class="row">
                    @foreach($movieChunk as $movie)
                        <div class="col-md-2">
                            <!-- Box Comment -->
                            <div class="card card-widget">
                                <div class="embed-responsive embed-responsive-1by1">
                                    <a href="{{ route('movie.show', ['id' => $movie['imdbID'] ]) }}">
                                    <img class="card-img-top embed-responsive-item" src="{{ $movie['Poster'] }}"
                                         alt="{{ $movie['Title'] }}">
                                    </a>
                                </div>
                                <!-- /.card-body -->
                                <!-- /.card-footer -->
                                <div class="card-footer ">
                                    <div class="row">
                                        <a class="col-sm-9 small font-weight-bold">
                                            {{ $movie['Title'] }}
                                        </a>
                                        <a class="col-sm-3">
                                            <form name="frmFavourite_{{ $movie['imdbID'] }}" id="frmFavourite_{{ $movie['imdbID'] }}" onsubmit="toggleFavourite('{{$movie['imdbID']}}', '{{ \App\Models\Movie::favourited($movie['imdbID']) }}');return false; ">
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-default btn-sm"><i id="heart_{{$movie['imdbID']}}" class="fa fa-heart {{ (\App\Models\Movie::favourited($movie['imdbID'])) ? 'text-red' : ''  }}"></i>
                                                </button>
                                                <input type="hidden" name="imdbID" id="imdbID_{{$movie['imdbID']}}" value="{{ $movie['imdbID'] }}">
                                                <input type="hidden" name="Title" id="Title_{{$movie['imdbID']}}" value="{{ $movie['Title'] }}">
                                                <input type="hidden" name="Poster" id="Poster_{{$movie['imdbID']}}" value="{{ $movie['Poster'] }}">
                                            </form>                                        </a>
                                    </div>

                                </div>
                                <!-- /.card-footer -->
                            </div>
                            <!-- /.card -->
                        </div>
                    @endforeach
                </div>
            @empty
                <div>No Movies...</div>
            @endforelse
        </div><!--/. container-fluid -->
    </section>
@endsection

@section('inline-js')
    @parent
    <script src="{{asset('js/select2.full.min.js')}}"></script>
    <script>
            function toggleFavourite(movie_id, type) {
                let movie_title = $('#Title_' + movie_id).val();
                let movie_poster = $('#Poster_' + movie_id).val();

                $.post("{{ route('movie.toggleFavourite') }}",
                    {
                        "_token": "{{ csrf_token() }}",
                        "type": type,
                        imdbID: movie_id,
                        Title: movie_title,
                        Poster: movie_poster
                    })
                    .done(function (data) {
                        if (type == 1) {
                            $("#heart_" + movie_id).removeClass("text-red");
                            if (window.location.href.includes("home")) {
                                window.location.reload();
                            }
                        } else {
                            $("#heart_" + movie_id).addClass("text-red")
                        }
                    })
                    .fail(function (xhr, status, error) {
                        console.log(error);
                    });
            }

           $(function () {
               $('.select2').select2();
           });

    </script>
@endsection
