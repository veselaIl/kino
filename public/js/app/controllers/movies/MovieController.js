app.controller('MovieController', function ($scope, MovieService) {
    $scope.title = "Филми";
    $scope.movies = [];
    var errors = [];

    MovieService.getMovies()
        .then(function (movies){
            $scope.movies = movies;
            console.log(movies);
            $scope.$apply();
        })
        .catch(function (err){
            errors.push(err);
        })
})