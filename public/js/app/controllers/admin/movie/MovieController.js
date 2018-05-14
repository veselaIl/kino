myApp.controller('MovieController', function($scope, $routeParams, MovieService){
    $scope.movies = [];
    $scope.movie = {};

    MovieService.getMovies()
        .then(function(movies){
            // console.log('then', movies);
            $scope.movies = movies;
            $scope.movie = movies.find(movie => movie.movieID === +$routeParams.id);
            $scope.$apply();
            
        })
        .catch(function(err){
            console.log(err);
        })
   
})