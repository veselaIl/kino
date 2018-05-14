myApp.controller('MovieController', function($scope, $routeParams, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movies = [];
    $scope.movie = {};
    MovieService.getMovies()
        .then(function(movies){
            // console.log('then', movies);
            $scope.movies = movies;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
        console.log($scope);
    MovieService.getMovie(+$routeParams.movieID);   
    console.log($scope);
})