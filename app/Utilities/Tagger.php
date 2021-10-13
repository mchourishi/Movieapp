<?php

namespace App\Utilities;

use App\Models\Tag;
use Illuminate\Support\Facades\Auth;

class Tagger{

    public static function tagMovie($movie, $tags){
        foreach ($tags as $tag){
            $name = self::generateTagName( $tag ); // Generate clean tag name.
            $newMovieTag = Tag::firstOrNew(['tag' => $name]); // Create a new tag or find it.
            $newMovieTag->tag = $name;
            $newMovieTag->save();
            // Apply the tags to the movie.
            $movie->tags()->syncWithoutDetaching( [ $newMovieTag->id => ['user_id' => Auth::user()->id ] ] );
        }
    }

    private static function generateTagName( $tagName ){
        /*
          Trim whitespace from beginning and end of tag
        */
        $name = trim( $tagName );

        /*
          Convert tag name to lower.
        */
        $name = strtolower( $name );

        /*
          Convert anything not a letter or number to a dash.
        */
        $name = preg_replace( '/[^a-zA-Z0-9]/', '-', $name );

        /*
          Remove multiple instance of '-' and group to one.
        */
        $name = preg_replace( '/-{2,}/', '-', $name );
        /*
          Get rid of leading and trailing '-'
        */
        $name = trim( $name, '-' );

        /*
          Returns the cleaned tag name
        */
        return $name;
    }
}
