app.controller('MovieController', function ($scope, $routeParams, MovieService) {
    $scope.title = "Филми";
    $scope.movies = [];
    $scope.movie = {};
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


    MovieService.getMovie($routeParams.movieID)
       .then(function (movie){
            $scope.movie = movie;
            $scope.$apply();
       })
       .catch(function (err){
            errors.push(err);
       })
})