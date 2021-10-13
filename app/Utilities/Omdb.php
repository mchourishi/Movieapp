<?php

namespace App\Utilities;

class Omdb{

    /**
     * Return Base URL of OMD API
     * @return string
     */
    public static function baseUrl(){
        return 'http://www.omdbapi.com/?apikey='.config('services.omdb.key')
            .'&type=movie';
    }
}
