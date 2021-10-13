# Movie App with Laravel v8
A Movie App built on Laravel 8 where a user can search movies, marks them as favourites and can apply labels to favourite movies.
## Description
- User Registration and Login.
- User can search for movies by movie title.
- A user can marks the movie as favourite by clicking the heart icon and can unfavourite them.
- Favourite movies are displayed on the home page.
- User can put labels on favourite movies from the movies detail page.
- Favourite movies can be searched based on labels.

## Installation
- Run ``composer install``  and ``npm install`` to install dependencies. 
- Copy .env.example to .env and update database credentials and database name.
- Get API Key from http://www.omdbapi.com/apikey.aspx and update `OMDB_KEY` with your key in .env.
- Run ``php artisan key:generate``
- Run ``php artisan migrate`` to migrate.

### Usage
- Access movie app (Eg: localhost/Movieapp/public/) and register.
- Login with your User.
- Click the search bar on the top to search for movies by title `(Eg: cars)` and click, this will display all the movies that matches the search text.
- Click on the heart icon on the movie displayed to mark it as favourite or to un-favourite it.
- All the favourite movies are displayed on the home page.
- Click on the movie poster to see the details about the movie.
- Only a favourite movie can have labels, labels are added to a movie from the detail page of the movie.
- Labels are added as comma separated text `Eg: cars,kids`
- Home page will display field with all tags of a movie of a logged in user.
- Favourite Movies can be searched by labels using the search field on the home page movie section.

### Note
- Searched movies will be cached for 5 minutes and will return the results from cache to improve retrieval performance.
- If cache expired or is empty the movies we will fetched movies from API.  

### Tests
Run `vendor/bin/phpunit tests/` from Movieapp directory.

### Improvements
Following are the things where the app can be improved.
- Integrating VueJs to improve user experience and optimal performance.
- Labels are currently added as comma separated value, but would be better to use a tool like bootstrap-tagsinput.
- Option to categorise favourite movies from home page instead of just the movies detail page.
- Option to like a movie from the movie detail page.

