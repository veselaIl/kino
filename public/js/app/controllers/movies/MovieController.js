app.controller('MovieController', function ($scope, $routeParams, MovieService) {
    $scope.title = "Филми";
    $scope.movies = [];
    $scope.movie = {};
    //$scope.movie.genre = [];
    $scope.actor = {};
    var errors = [];

    //Get all movies 
    MovieService.getMovies()
        .then(function (movies){
            $scope.movies = movies;
            console.log('Movie Controller: movies', movies);
            $scope.$apply();
        })
        .catch(function (err){
            errors.push(err);
        })

    console.log('$routeParams.id', $routeParams.id);
    MovieService.getMovie($routeParams.id)
       .then(function (movie){
            $scope.movie = movie;
            // console.log("Genre: ", movie.genre);
            // $scope.movie.genre = movie.genre;
            console.log('Actors:', movie.actors);
            $scope.actor = movie.actors.forEach(a => {
                console.log("Actor: ", a.name);
                return a.name;
            });
            $scope.$apply();
       })
       .catch(function (err){
            errors.push(err);
       })

})